create extension if not exists pgcrypto;

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  address text,
  customer_code text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (phone)
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  name text not null unique,
  description text,
  image_url text,
  price numeric(12,2) not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number bigint generated always as identity unique,
  customer_id uuid references public.customers(id),
  customer_name text not null,
  phone text not null,
  address text,
  customer_code text,
  items jsonb not null default '[]'::jsonb,
  total numeric(12,2) not null default 0,
  paid numeric(12,2) not null default 0,
  status text not null default 'pending' check (status in ('pending','confirmed','preparing','shipped','completed','cancelled')),
  source text not null default 'online',
  location jsonb,
  ip inet,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  invoice_number text not null unique,
  order_id uuid not null unique references public.orders(id) on delete restrict,
  customer_id uuid references public.customers(id),
  subtotal numeric(12,2) not null default 0,
  paid numeric(12,2) not null default 0,
  status text not null default 'issued' check (status in ('draft','issued','paid','void')),
  issued_at timestamptz not null default now(),
  due_at timestamptz
);

create table if not exists public.inventory (
  product_id uuid primary key references public.products(id) on delete cascade,
  quantity numeric(12,2) not null default 0,
  reorder_level numeric(12,2) not null default 5,
  updated_at timestamptz not null default now()
);

create table if not exists public.stock_movements (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id),
  movement_type text not null check (movement_type in ('incoming','outgoing','adjustment')),
  quantity numeric(12,2) not null check (quantity > 0),
  reference text,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.representatives (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  territory text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.orders add column if not exists representative_id uuid references public.representatives(id);
alter table public.invoices add column if not exists representative_id uuid references public.representatives(id);

create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_status_idx on public.orders (status);
create index if not exists stock_movements_product_idx on public.stock_movements (product_id, created_at desc);

create or replace function public.apply_stock_movement()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into inventory(product_id, quantity)
  values (new.product_id, case when new.movement_type = 'incoming' then new.quantity else -new.quantity end)
  on conflict (product_id) do update set quantity = greatest(0, inventory.quantity +
    case when new.movement_type = 'incoming' then excluded.quantity else -new.quantity end), updated_at = now();
  return new;
end $$;

drop trigger if exists stock_movement_inventory_trigger on public.stock_movements;
create trigger stock_movement_inventory_trigger after insert on public.stock_movements
for each row execute function public.apply_stock_movement();

alter table public.site_settings enable row level security;
alter table public.products enable row level security;
alter table public.customers enable row level security;
alter table public.orders enable row level security;
alter table public.invoices enable row level security;
alter table public.inventory enable row level security;
alter table public.stock_movements enable row level security;
alter table public.representatives enable row level security;

create or replace function public.submit_online_order(
  p_customer_name text, p_phone text, p_address text, p_customer_code text,
  p_items jsonb, p_location jsonb default null, p_ip text default null
) returns jsonb language plpgsql security definer set search_path = public as $$
declare
  v_customer customers;
  v_order orders;
  v_total numeric := coalesce((select sum((item->>'price')::numeric * (item->>'qty')::numeric) from jsonb_array_elements(p_items) item), 0);
begin
  insert into customers(name, phone, address, customer_code)
  values (p_customer_name, p_phone, p_address, p_customer_code)
  on conflict (phone) do update set name = excluded.name, address = excluded.address,
    customer_code = coalesce(excluded.customer_code, customers.customer_code), updated_at = now()
  returning * into v_customer;
  insert into orders(customer_id, customer_name, phone, address, customer_code, items, total, location, ip)
  values (v_customer.id, p_customer_name, p_phone, p_address, p_customer_code, p_items, v_total, p_location, nullif(p_ip, '')::inet)
  returning * into v_order;
  return jsonb_build_object('id', v_order.id, 'order_number', v_order.order_number, 'status', v_order.status);
end $$;

revoke all on function public.submit_online_order(text,text,text,text,jsonb,jsonb,text) from public;
grant execute on function public.submit_online_order(text,text,text,text,jsonb,jsonb,text) to anon, authenticated;

create or replace function public.export_accounting_backup(p_password text)
returns jsonb language plpgsql security definer set search_path = public as $$
begin
  if p_password is distinct from '1992' then
    raise exception 'invalid admin password' using errcode = '28000';
  end if;
  return jsonb_build_object(
    'exported_at', now(),
    'orders', coalesce((select jsonb_agg(to_jsonb(x)) from orders x), '[]'::jsonb),
    'invoices', coalesce((select jsonb_agg(to_jsonb(x)) from invoices x), '[]'::jsonb),
    'products', coalesce((select jsonb_agg(to_jsonb(x)) from products x), '[]'::jsonb),
    'inventory', coalesce((select jsonb_agg(jsonb_build_object('product_id', x.product_id, 'product_name', p.name, 'quantity', x.quantity, 'reorder_level', x.reorder_level, 'updated_at', x.updated_at)) from inventory x join products p on p.id = x.product_id), '[]'::jsonb),
    'stock_movements', coalesce((select jsonb_agg(to_jsonb(x)) from stock_movements x), '[]'::jsonb),
    'representatives', coalesce((select jsonb_agg(to_jsonb(x)) from representatives x), '[]'::jsonb)
  );
end $$;

revoke all on function public.export_accounting_backup(text) from public;
grant execute on function public.export_accounting_backup(text) to anon, authenticated;

create or replace function public.get_accounting_snapshot(p_password text)
returns jsonb language plpgsql security definer set search_path = public as $$
begin
  if p_password is distinct from '1990' then
    raise exception 'invalid accounting password' using errcode = '28000';
  end if;
  return jsonb_build_object(
    'orders', coalesce((select jsonb_agg(to_jsonb(x) order by x.created_at desc) from orders x), '[]'::jsonb),
    'invoices', coalesce((select jsonb_agg(to_jsonb(x) order by x.issued_at desc) from invoices x), '[]'::jsonb),
    'products', coalesce((select jsonb_agg(to_jsonb(x)) from products x), '[]'::jsonb),
    'inventory', coalesce((select jsonb_agg(jsonb_build_object('product_id', x.product_id, 'product_name', p.name, 'quantity', x.quantity, 'reorder_level', x.reorder_level, 'updated_at', x.updated_at)) from inventory x join products p on p.id = x.product_id), '[]'::jsonb),
    'stock_movements', coalesce((select jsonb_agg(to_jsonb(x) order by x.created_at desc) from stock_movements x), '[]'::jsonb),
    'representatives', coalesce((select jsonb_agg(to_jsonb(x)) from representatives x), '[]'::jsonb)
  );
end $$;

revoke all on function public.get_accounting_snapshot(text) from public;
grant execute on function public.get_accounting_snapshot(text) to anon, authenticated;

create or replace function public.issue_invoice(p_password text, p_order_id uuid)
returns jsonb language plpgsql security definer set search_path = public as $$
declare
  v_order orders;
  v_invoice invoices;
begin
  if p_password is distinct from '1990' then
    raise exception 'invalid accounting password' using errcode = '28000';
  end if;
  select * into v_order from orders where id = p_order_id;
  if not found then raise exception 'order not found'; end if;
  insert into invoices(invoice_number, order_id, customer_id, subtotal, paid, status)
  values ('INV-' || to_char(now(), 'YYYY') || '-' || lpad(nextval('orders_order_number_seq')::text, 5, '0'),
    v_order.id, v_order.customer_id, v_order.total, v_order.paid, case when v_order.paid >= v_order.total then 'paid' else 'issued' end)
  on conflict (order_id) do update set order_id = invoices.order_id
  returning * into v_invoice;
  return to_jsonb(v_invoice);
end $$;

revoke all on function public.issue_invoice(text, uuid) from public;
grant execute on function public.issue_invoice(text, uuid) to anon, authenticated;
