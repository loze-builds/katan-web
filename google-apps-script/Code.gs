const API_TOKEN = '654258158548752248952845857585285482525';

const SHEETS = {
  orders: ['Orders', ['id', 'created_at', 'customer_name', 'phone', 'address', 'customer_code', 'items_json', 'total', 'paid', 'status', 'source', 'location_json', 'ip']],
  items: ['Order Items', ['order_id', 'created_at', 'name', 'qty', 'price', 'line_total']],
  customers: ['Customers', ['phone', 'name', 'address', 'first_order_at', 'last_order_at', 'orders_count', 'total_spent']],
  inventory: ['Inventory', ['product_name', 'quantity', 'updated_at']],
  invoices: ['Invoices', ['id', 'order_id', 'created_at', 'total', 'paid', 'status']],
  payments: ['Payments', ['id', 'invoice_id', 'created_at', 'amount', 'currency', 'notes']],
  settings: ['Settings', ['key', 'value', 'updated_at']]
};

function setupKatanbuild() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  DriveApp.getRootFolder().getName();
  Object.keys(SHEETS).forEach(key => {
    const [name, headers] = SHEETS[key];
    const sheet = spreadsheet.getSheetByName(name) || spreadsheet.insertSheet(name);
    if (sheet.getLastRow() === 0) sheet.appendRow(headers);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.autoResizeColumns(1, headers.length);
  });
}

function doGet(e) {
  try {
    authorize_(e.parameter.token);
    if (e.parameter.action === 'getSetting' && e.parameter.key) {
      const settingsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEETS.settings[0]);
      const rows = settingsSheet ? settingsSheet.getDataRange().getValues() : [];
      const setting = rows.find((row, index) => index > 0 && String(row[0]) === String(e.parameter.key));
      let value = null;
      if (setting && setting[1] !== '') {
        try { value = JSON.parse(setting[1]); } catch (error) { value = setting[1]; }
      }
      return json_({ ok: true, value: value });
    }
    if (e.parameter.action !== 'snapshot') return json_({ ok: true, service: 'katanbuild-google-sheets' });
    return json_({ ok: true, snapshot: buildSnapshot_() });
  } catch (error) {
    return json_({ ok: false, error: error.message });
  }
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    authorize_(body.token);
    if (body.action === 'createOrder' && body.order) {
      return json_({ ok: true, order: createOrder_(body.order) });
    }
    if (body.action === 'uploadImage' && body.data) {
      const match = String(body.data).match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
      if (!match) throw new Error('صيغة الصورة غير مدعومة');
      const bytes = Utilities.base64Decode(match[2]);
      const safeName = String(body.name || `katanbuild-${Date.now()}.jpg`).replace(/[^\w.-]+/g, '-');
      const file = DriveApp.createFile(Utilities.newBlob(bytes, match[1], safeName));
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      return json_({ ok: true, image: `https://drive.google.com/uc?export=view&id=${file.getId()}` });
    }
    if (body.action === 'saveSettings' && body.key && body.value !== undefined) {
      const settingsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEETS.settings[0]);
      if (!settingsSheet) throw new Error('Settings sheet is missing; run setupKatanbuild first');
      const rows = settingsSheet.getDataRange().getValues();
      const rowIndex = rows.findIndex((row, index) => index > 0 && String(row[0]) === String(body.key));
      const serialized = typeof body.value === 'string' ? body.value : JSON.stringify(body.value);
      if (rowIndex < 1) {
        settingsSheet.appendRow([body.key, serialized, new Date().toISOString()]);
      } else {
        settingsSheet.getRange(rowIndex + 1, 2, 1, 2).setValues([[serialized, new Date().toISOString()]]);
      }
      return json_({ ok: true });
    }
    throw new Error('Invalid action');
  } catch (error) {
    return json_({ ok: false, error: error.message });
  }
}

function authorize_(token) {
  if (!API_TOKEN || API_TOKEN === 'CHANGE_THIS_TO_A_LONG_RANDOM_TOKEN' || token !== API_TOKEN) {
    throw new Error('Unauthorized');
  }

}

function createOrder_(input) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const now = new Date();
  const id = String(input.id || `${now.getTime()}`);
  const items = Array.isArray(input.items) ? input.items : [];
  const total = Number(input.total || items.reduce((sum, item) => sum + Number(item.qty || 0) * Number(item.price || 0), 0));
  const order = { ...input, id, total, created_at: now.toISOString(), status: input.status || 'pending' };
  const orderSheet = ss.getSheetByName(SHEETS.orders[0]);
  orderSheet.appendRow([id, order.created_at, order.name || '', order.phone || '', order.address || '', order.code || '', JSON.stringify(items), total, Number(order.paid || 0), order.status, order.source || 'online', JSON.stringify(order.location || null), order.ip || '']);
  const itemSheet = ss.getSheetByName(SHEETS.items[0]);
  items.forEach(item => itemSheet.appendRow([id, order.created_at, item.name || '', Number(item.qty || 0), Number(item.price || 0), Number(item.qty || 0) * Number(item.price || 0)]));
  upsertCustomer_(ss, order);
  return order;
}

function upsertCustomer_(ss, order) {
  const sheet = ss.getSheetByName(SHEETS.customers[0]);
  const values = sheet.getDataRange().getValues();
  const phone = String(order.phone || '');
  const rowIndex = values.findIndex((row, index) => index > 0 && String(row[0]) === phone);
  if (rowIndex < 1) {
    sheet.appendRow([phone, order.name || '', order.address || '', order.created_at, order.created_at, 1, Number(order.total || 0)]);
    return;
  }
  const row = rowIndex + 1;
  sheet.getRange(row, 2, 1, 6).setValues([[
    order.name || values[rowIndex][1],
    order.address || values[rowIndex][2],
    values[rowIndex][3] || order.created_at,
    order.created_at,
    Number(values[rowIndex][5] || 0) + 1,
    Number(values[rowIndex][6] || 0) + Number(order.total || 0)
  ]]);
}

function buildSnapshot_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return {
    orders: readRows_(ss.getSheetByName(SHEETS.orders[0])),
    customers: readRows_(ss.getSheetByName(SHEETS.customers[0])),
    inventory: readRows_(ss.getSheetByName(SHEETS.inventory[0])),
    invoices: readRows_(ss.getSheetByName(SHEETS.invoices[0])),
    payments: readRows_(ss.getSheetByName(SHEETS.payments[0]))
  };
}

function readRows_(sheet) {
  if (!sheet || sheet.getLastRow() < 2) return [];
  const rows = sheet.getDataRange().getValues();
  const headers = rows.shift();
  return rows.map(row => headers.reduce((record, header, index) => {
    record[header] = row[index];
    return record;
  }, {}));
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
