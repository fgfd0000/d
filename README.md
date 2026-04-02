# 🚛 LogiConnect - منصة لوجستية متكاملة

> منصة ذكية لإدارة الشحن واللوجستيات تربط الشركات بالسائقين

## ✨ الميزات الرئيسية

- 🏢 **لوحة تحكم للشركات** - إدارة المستودعات والشحنات
- 🚗 **لوحة تحكم للسائقين** - إدارة الطلبات والأرباح
- 📍 **تتبع حي** - معرفة موقع الشحنات في الوقت الفعلي
- 💰 **محفظة مالية** - إدارة الأرباح والدفع
- 🌙 **وضع ليلي** - واجهة مريحة للعين
- 🌍 **عربي 100%** - واجهة كاملة بالعربية

## 🛠️ التقنيات المستخدمة

```
Frontend:  React 18+
Backend:   Node.js + Express
Database:  PostgreSQL
Real-time: Socket.io (مستعد)
Auth:      JWT Tokens
```

## 🚀 البدء السريع

### المتطلبات:
- Node.js v14+
- npm v6+
- PostgreSQL 12+ (اختياري حالياً)

### التثبيت:

```bash
# 1. Backend
cd backend
npm install
npm start

# 2. Frontend (في terminal منفصل)
cd frontend
npm install
npm start
```

التطبيق سيفتح على `http://localhost:3000`

### بيانات الاختبار:
```
📱 الجوال: 500000000
🔐 كلمة المرور: 123456
```

## 📁 هيكل المشروع

```
LogiConnect/
├── frontend/                    # React App
│   ├── src/
│   │   ├── App.js              # Root component
│   │   ├── AuthPage.jsx        # صفحة الدخول
│   │   ├── CompanyDashboard/   # لوحة الشركة
│   │   ├── DriverDashboard/    # لوحة السائق
│   │   ├── api.js              # API Client
│   │   ├── AuthContext.js      # State Management
│   │   ├── utils.js            # Helper Functions
│   │   └── config.js           # Configuration
│   └── package.json
│
├── backend/                     # Node.js Server
│   ├── server.js               # API Endpoints
│   ├── db.js                   # Database Connection
│   └── package.json
│
├── SETUP_GUIDE.md              # دليل الإعداد
├── ENVIRONMENT_SETUP.md        # إعدادات البيئة
├── FINAL_SUMMARY.md            # الملخص النهائي
└── README.md                   # هذا الملف
```

## 🔐 المصادقة

يستخدم المشروع نظام JWT tokens للمصادقة:

```javascript
// تسجيل الدخول
POST /api/auth/login
Body: { phone, password, userType }
Response: { token, user }

// التحقق من الدخول
GET /api/company/dashboard
Headers: Authorization: Bearer <token>
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - تسجيل الدخول
- `POST /api/auth/logout` - تسجيل الخروج

### Company
- `GET /api/company/dashboard` - بيانات لوحة التحكم
- `GET /api/company/warehouses` - قائمة المستودعات
- `POST /api/company/warehouses` - إضافة مستودع
- `GET /api/company/orders` - قائمة الطلبات

### Driver
- `GET /api/driver/dashboard` - بيانات السائق
- `GET /api/driver/loads` - الطلبات المتاحة
- `POST /api/driver/loads/:id/accept` - قبول طلب
- `GET /api/driver/wallet` - المحفظة المالية

[عرض جميع الـ Endpoints](./backend/API_DOCS.md)

## 📚 التوثيق

- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - دليل الإعداد الشامل
- [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md) - إعدادات البيئة وـ DB
- [FINAL_SUMMARY.md](./FINAL_SUMMARY.md) - ملخص الإنجازات
- [frontend/IMPROVEMENTS.md](./frontend/src/IMPROVEMENTS.md) - تحسينات Frontend
- [backend/API_DOCS.md](./backend/API_DOCS.md) - توثيق API الكاملة

## 🧪 الاختبار

```bash
# اختبار البيانات الوهمية
curl http://localhost:5000/

# اختبار تسجيل الدخول
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"phone":"500000000","password":"123456","userType":"company"}'
```

## 🎯 الخطوات التالية

- [ ] ربط قاعدة البيانات الحقيقية
- [ ] تحسين نظام المصادقة (JWT محسّن)
- [ ] إضافة WebSocket للتحديثات الفورية
- [ ] تحسين الأمان للإنتاج
- [ ] اختبار شامل

## 📝 الترخيص

هذا المشروع مفتوح المصدر ومتاح للاستخدام الحر.

## 💬 الدعم

للمساعدة والاستفسارات، راجع التوثيق الكاملة في المشروع.

---

**آخر تحديث:** مارس 2026
**الإصدار:** 2.0.0
**الحالة:** 🟢 Ready for Development
