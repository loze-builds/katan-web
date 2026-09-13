# ربط katanbuild مع Google Sheets

## 1. إنشاء الجدول

1. أنشئ Google Sheet جديداً باسم `katanbuild accounting`.
2. انسخ رقم الجدول من الرابط، وهو الجزء بين `/d/` و`/edit`.
3. افتح `Extensions -> Apps Script`.
4. احذف محتوى `Code.gs` والصق محتوى الملف `Code.gs` الموجود هنا.
5. بدّل `PASTE_SPREADSHEET_ID_HERE` برقم الجدول.
6. ولّد رمزاً عشوائياً طويلاً، وضعه مكان `CHANGE_THIS_TO_A_LONG_RANDOM_TOKEN`.
7. شغّل الدالة `setupKatanbuild` مرة واحدة ووافق على صلاحيات Google.

سيتم إنشاء الأوراق التالية تلقائياً:

- Orders
- Order Items
- Customers
- Inventory
- Invoices
- Payments
- Settings

## 2. نشر API

من Apps Script:

1. اختر `Deploy -> New deployment`.
2. النوع: `Web app`.
3. التنفيذ باسمك.
4. الوصول: `Anyone`.
5. انسخ رابط Web app الذي ينتهي بـ `/exec`.

## 3. وضع الرابط في الموقع

افتح `js/google-sheets-config.js` وضع:

```js
window.KB_GOOGLE_SHEETS_CONFIG = {
  endpoint: 'https://script.google.com/macros/s/DEPLOYMENT_ID/exec',
  token: 'نفس الرمز العشوائي الموجود في Code.gs'
};
```

لا تضع كلمة مرور Google أو مفتاحاً سرياً لحساب Google في الموقع. الرمز هنا مخصص فقط لمنع الطلبات العشوائية، ويمكن تغييره من Apps Script ثم إعادة النشر.

## 4. الاختبار

افتح رابط Web app في المتصفح مع:

```text
?action=snapshot&token=YOUR_TOKEN
```

إذا ظهر JSON يحوي `ok: true`، أرسل طلباً تجريبياً من الموقع وتحقق من ورقتي `Orders` و`Order Items`.
