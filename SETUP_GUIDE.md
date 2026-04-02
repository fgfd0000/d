# 📚 دليل الإعداد الشامل لمشروع LogiConnect

## 🎯 نظرة عامة:

LogiConnect هي منصة لوجستية متكاملة تربط الشركات والسائقين لإدارة عمليات الشحن.

### المميزات:
- ✅ لوحة تحكم للشركات
- ✅ لوحة تحكم للسائقين
- ✅ نظام تتبع حي
- ✅ محفظة مالية
- ✅ نظام مصادقة آمن
- ✅ واجهة عربية 100%

---

## 🚀 التثبيت السريع:

### 1. تثبيت Backend:

```bash
cd backend
npm install
```

**الملفات المطلوبة:**
- `server.js` - الخادم الرئيسي ✅
- `db.js` - اتصال قاعدة البيانات
- `package.json` ✅

**متطلبات النظام:**
- Node.js (v14+)
- PostgreSQL (للـ database)
- Port 5000 متاح

**بدء التشغيل:**
```bash
npm start
# الخادم سيشتغل على http://localhost:5000
```

---

### 2. تثبيت Frontend:

```bash
cd frontend
npm install
```

**الملفات المطلوبة:**
- React app مع:
  - `App.js` ✅
  - `AuthPage.jsx` ✅
  - `CompanyDashboard.jsx` ✅
  - `DriverDashboard.jsx` ✅

**ملفات جديدة تم إضافتها:**
- `api.js` - API client
- `AuthContext.js` - إدارة المصادقة
- `utils.js` - مساعدات عامة
- `config.js` - إعدادات التطبيق
- `.env.example` - متغيرات البيئة

**بدء التشغيل:**
```bash
npm start
# التطبيق سيفتح على http://localhost:3000
```

---

## 🔐 Flow المصادقة:

```
1. المستخدم يدخل الجوال وكلمة المرور في AuthPage
   ↓
2. يتم استدعاء authApi.login()
   ↓
3. البيانات تُرسل لـ POST /api/auth/login
   ↓
4. الخادم يتحقق من البيانات ويرجع token
   ↓
5. Token يُحفظ في AuthContext و localStorage
   ↓
6. التطبيق يوجه للـ CompanyDashboard أو DriverDashboard
```

---

## 📂 هيكل المشروع:

```
LogiConnect/
├── frontend/
│   ├── src/
│   │   ├── App.js ✅ (محدث)
│   │   ├── index.js ✅ (محدث)
│   │   ├── AuthPage.jsx ✅ (محدث)
│   │   ├── CompanyDashboard.jsx (جاهز للـ API)
│   │   ├── DriverDashboard.jsx (جاهز للـ API)
│   │   ├── api.js ✅ (جديد)
│   │   ├── AuthContext.js ✅ (جديد)
│   │   ├── utils.js ✅ (جديد)
│   │   ├── config.js ✅ (جديد)
│   │   └── IMPROVEMENTS.md ✅ (توثيق)
│   ├── .env.example ✅ (جديد)
│   └── package.json
│
├── backend/
│   ├── server.js ✅ (محدث مع جميع endpoints)
│   ├── db.js (يحتاج اتصال حقيقي)
│   ├── API_DOCS.md ✅ (توثيق)
│   └── package.json
│
└── SETUP_GUIDE.md (هذا الملف)
```

---

## 🔗 API Endpoints:

### Auth
```
POST /api/auth/login
POST /api/auth/logout
```

### Company
```
GET /api/company/dashboard
GET /api/company/warehouses
POST /api/company/warehouses
DELETE /api/company/warehouses/:id
GET /api/company/trucks
GET /api/company/orders
POST /api/company/orders
```

### Driver
```
GET /api/driver/dashboard
GET /api/driver/loads
POST /api/driver/loads/:id/accept
POST /api/driver/trips/complete
POST /api/driver/pod/upload
GET /api/driver/trips/history
GET /api/driver/wallet
```

---

## 🧪 بيانات اختبار:

**الهاتف:** `500000000`
**كلمة المرور:** `123456`

الـ API يقبل أي بيانات الآن (محاكاة). يجب ربطها بقاعدة البيانات الحقيقية.

---

## ⚙️ متغيرات البيئة:

**ملف `.env` في الـ Frontend:**
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

---

## 🐛 استكشاف الأخطاء:

### الخادم لا يشتغل:
```bash
# تأكد من الـ port 5000 متاح
lsof -i :5000
# أو استخدم port مختلف
PORT=5001 npm start
```

### التطبيق لا يتصل بالخادم:
- تأكد من تشغيل الخادم
- تأكد من الـ URL صحيح في config.js
- افتح DevTools وشوف الـ network tab

### PostgreSQL connection error:
- تأكد من PostgreSQL مشتغل
- عدّل البيانات في db.js

---

## ✅ الخطوات التالية:

### مرحلة 1: ربط قاعدة البيانات ✅ Prepared
```javascript
// في backend/server.js
// استبدل البيانات الوهمية بـ queries حقيقية
// مثال:
const result = await query('SELECT * FROM warehouses WHERE company_id = $1', [userId]);
```

### مرحلة 2: تحسين المصادقة
```javascript
// استخدام JWT الحقيقي
const jwt = require('jsonwebtoken');
const token = jwt.sign({ userId, userType }, SECRET_KEY);
```

### مرحلة 3: ربط واجهات الشركات والسائقين
- استخدام `useAuth()` hook في CompanyDashboard
- استخدام API calls مع error handling

### مرحلة 4: إضافة WebSocket للتحديثات الفورية
```javascript
// socket.io للتتبع الحي
const io = require('socket.io');
```

---

## 📞 الدعم:

للمزيد من المعلومات، راجع:
- `frontend/src/IMPROVEMENTS.md` - تحسينات Frontend
- `backend/API_DOCS.md` - توثيق API الكامل

---

## 📝 الملاحظات:

1. **الأمان:** في الإنتاج، استخدم HttpOnly Cookies بدل localStorage للـ token
2. **CORS:** الخادم مفعّل عليه CORS - يمكن تحديده لاحقاً
3. **Validation:** أضفنا validation أساسي - يجب تحسينه
4. **Database:** جاهز للاتصال بـ PostgreSQL

---

**تاريخ الإنشاء:** مارس 2026
**الإصدار:** 1.0.0
