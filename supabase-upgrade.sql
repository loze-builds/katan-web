-- Run after supabase-schema.sql. Adds currencies, payments, customer tracking and live staff presence.
alter table public.orders add column if not exists currency text not null default 'USD' check (currency in ('USD', 'SYP'));
alter table public.orders add column if not exists exchange_rate numeric(14,2) not null default 13000;
alter table public.invoices add column if not exists currency text not null default 'USD' check (currency in ('USD', 'SYP'));
alter table public.invoices add column if not exists exchange_rate numeric(14,2) not null default 13000;
alter table public.invoices add column if not exists amount_syp numeric(14,2) not null default 0;

create or replace function public.issue_invoice(p_password text, p_order_id uuid)
returns jsonb language plpgsql security definer set search_path = public as $$
declare
  v_order orders;
  v_invoice invoices;
  v_rate numeric;
begin
  if p_password is distinct from '1990' then
    raise exception 'invalid accounting password' using errcode = '28000';
  end if;
  select * into v_order from orders where id = p_order_id;
  if not found then raise exception 'order not found'; end if;
  v_rate := coalesce((select usd_to_syp from exchange_rates order by effective_at desc limit 1), 13000);
  insert into invoices(invoice_number, order_id, customer_id, subtotal, paid, status, currency, exchange_rate, amount_syp)
  values ('INV-' || to_char(now(), 'YYYY') || '-' || lpad(nextval('orders_order_number_seq')::text, 5, '0'),
    v_order.id, v_order.customer_id, v_order.total, v_order.paid,
    case when v_order.paid >= v_order.total then 'paid' else 'issued' end,
    coalesce(v_order.currency, 'USD'), coalesce(v_order.exchange_rate, v_rate), v_order.total * coalesce(v_order.exchange_rate, v_rate))
  on conflict (order_id) do update set order_id = invoices.order_id
  returning * into v_invoice;
  return to_jsonb(v_invoice);
end $$;

revoke all on function public.issue_invoice(text, uuid) from public;
grant execute on function public.issue_invoice(text, uuid) to anon, authenticated;

create table if not exists public.invoice_payments (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references public.invoices(id) on delete cascade,
  amount numeric(14,2) not null check (amount > 0),
  currency text not null check (currency in ('USD', 'SYP')),
  exchange_rate numeric(14,2) not null,
  paid_at timestamptz not null default now(),
  notes text
);

create table if not exists public.customer_location_history (
  id bigint generated always as identity primary key,
  order_id uuid not null references public.orders(id) on delete cascade,
  latitude double precision not null,
  longitude double precision not null,
  accuracy double precision,
  consented boolean not null default true,
  recorded_at timestamptz not null default now()
);

create table if not exists public.accounting_presence (
  session_id uuid primary key,
  label text not null,
  last_seen_at timestamptz not null default now()
);

create table if not exists public.exchange_rates (
  id uuid primary key default gen_random_uuid(),
  usd_to_syp numeric(14,2) not null check (usd_to_syp > 0),
  effective_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table public.invoice_payments enable row level security;
alter table public.customer_location_history enable row level security;
alter table public.accounting_presence enable row level security;
alter table public.exchange_rates enable row level security;

create or replace function public.record_customer_location(
  p_order_id uuid, p_latitude double precision, p_longitude double precision,
  p_accuracy double precision default null
) returns jsonb language plpgsql security definer set search_path = public as $$
declare v_row customer_location_history;
begin
  insert into customer_location_history(order_id, latitude, longitude, accuracy)
  values (p_order_id, p_latitude, p_longitude, p_accuracy) returning * into v_row;
  return to_jsonb(v_row);
end $$;

create or replace function public.set_exchange_rate(p_password text, p_rate numeric)
returns jsonb language plpgsql security definer set search_path = public as $$
declare v_row exchange_rates;
begin
  if p_password is distinct from '1990' or p_rate <= 0 then
    raise exception 'invalid exchange rate request' using errcode = '28000';
  end if;
  insert into exchange_rates(usd_to_syp) values (p_rate) returning * into v_row;
  insert into site_settings(key, value, updated_at)
  values ('exchange_rate', jsonb_build_object('usd_to_syp', p_rate), now())
  on conflict (key) do update set value = excluded.value, updated_at = now();
  return to_jsonb(v_row);
end $$;

create or replace function public.record_invoice_payment(
  p_password text, p_invoice_id uuid, p_amount numeric, p_currency text,
  p_exchange_rate numeric, p_notes text default null
) returns jsonb language plpgsql security definer set search_path = public as $$
declare v_payment invoice_payments;
begin
  if p_password is distinct from '1990' or p_amount <= 0 or p_exchange_rate <= 0
     or p_currency not in ('USD', 'SYP') then
    raise exception 'invalid payment request' using errcode = '28000';
  end if;
  insert into invoice_payments(invoice_id, amount, currency, exchange_rate, notes)
  values (p_invoice_id, p_amount, p_currency, p_exchange_rate, p_notes)
  returning * into v_payment;
  update invoices set paid = paid + case when p_currency = 'USD' then p_amount else p_amount / p_exchange_rate end,
    status = case when paid + case when p_currency = 'USD' then p_amount else p_amount / p_exchange_rate end >= subtotal then 'paid' else 'issued' end
  where id = p_invoice_id;
  update orders set paid = (select paid from invoices where id = p_invoice_id),
    updated_at = now()
  where id = (select order_id from invoices where id = p_invoice_id);
  return to_jsonb(v_payment);
end $$;

create or replace function public.get_live_accounting_snapshot(p_password text)
returns jsonb language plpgsql security definer set search_path = public as $$
begin
  if p_password is distinct from '1990' then raise exception 'invalid accounting password' using errcode = '28000'; end if;
  return jsonb_build_object(
    'payments', coalesce((select jsonb_agg(to_jsonb(x) order by x.paid_at desc) from invoice_payments x), '[]'::jsonb),
    'locations', coalesce((select jsonb_agg(to_jsonb(x) order by x.recorded_at desc) from customer_location_history x), '[]'::jsonb),
    'presence', coalesce((select jsonb_agg(to_jsonb(x) order by x.last_seen_at desc) from accounting_presence x), '[]'::jsonb),
    'exchange_rate', coalesce((select jsonb_build_object('usd_to_syp', usd_to_syp) from exchange_rates order by effective_at desc limit 1), jsonb_build_object('usd_to_syp', 13000))
  );
end $$;

create or replace function public.upsert_accounting_presence(p_password text, p_session_id uuid, p_label text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if p_password is distinct from '1990' then raise exception 'invalid accounting password' using errcode = '28000'; end if;
  insert into accounting_presence(session_id, label) values (p_session_id, p_label)
  on conflict (session_id) do update set label = excluded.label, last_seen_at = now();
end $$;

grant execute on function public.record_customer_location(uuid,double precision,double precision,double precision) to anon, authenticated;
grant execute on function public.set_exchange_rate(text,numeric) to anon, authenticated;
grant execute on function public.record_invoice_payment(text,uuid,numeric,text,numeric,text) to anon, authenticated;
grant execute on function public.get_live_accounting_snapshot(text) to anon, authenticated;
grant execute on function public.upsert_accounting_presence(text,uuid,text) to anon, authenticated;
