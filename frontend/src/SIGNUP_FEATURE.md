# ✨ نظام التسجيل الجديد - SignUp System

## 🎯 الميزة المضافة:

تم إضافة نظام **تسجيل حسابات جديد** متكامل يتيح للشركات والسائقين إنشاء حسابات خاصة بهم.

---

## 📋 المكونات المضافة:

### 1. **SignUp.jsx** (Component جديد)
```javascript
✅ صفحة تسجيل متعددة المراحل:
   - المرحلة 1: اختيار نوع الحساب (شركة / سائق)
   - المرحلة 2: ملء البيانات الشخصية

✅ للشركات:
   - اسم الشركة (مخصص)
   - الاسم الشخصي
   - رقم الجوال
   - البريد الإلكتروني
   - كلمة المرور

✅ للسائقين:
   - الاسم الكامل
   - رقم الجوال
   - البريد الإلكتروني
   - كلمة المرور

✅ Validation شامل:
   - التحقق من صيغة الجوال
   - التحقق من البريد الإلكتروني
   - التحقق من قوة كلمة المرور
   - التحقق من تطابق كلمات المرور
```

### 2. **API Endpoint جديد**
```javascript
POST /api/auth/signup
├─ Body: {
│  ├─ name: "الاسم الشخصي"
│  ├─ phone: "500000001"
│  ├─ email: "company@logiconnect.com"
│  ├─ password: "123456"
│  ├─ userType: "company" أو "driver"
│  └─ companyName: "اسم الشركة" (للشركات فقط)
│
└─ Response: { token, user, message }
```

### 3. **تحديثات في الملفات الموجودة**
```javascript
✅ AuthPage.jsx → AuthLoginPage.jsx
   - إضافة زر "إنشاء حساب جديد"
   - ربط مع SignUp component

✅ api.js
   - إضافة authApi.signUp() method

✅ App.js
   - إضافة حالة authMode (login/signup)
   - إدارة navigation بين Login و SignUp
```

---

## 🎨 الميزات التصميمية:

```javascript
✅ واجهة سهلة الاستخدام:
   - خطوات واضحة (Step 1 → Step 2)
   - رسائل خطأ بالعربية
   - Loading states
   - Validation في الوقت الفعلي

✅ تصميم متسق:
   - نفس الألوان الخشبية
   - نفس التنسيقات
   - Responsive design
   - Support for RTL (العربية)
```

---

## 📖 كيفية الاستخدام:

### 1. من صفحة الدخول:
```
1. انقر على "✨ إنشاء حساب جديد"
2. اختر نوع الحساب (شركة / سائق)
3. أدخل البيانات المطلوبة
4. انقر "إنشاء الحساب"
5. سيتم حفظ البيانات والدخول تلقائياً
```

### 2. بيانات اختبار:
```
👤 اسم: محمد علي
📱 جوال: 500000001
✉️ بريد: test@logiconnect.com
🔐 كلمة المرور: Test@123456
🏢 اسم الشركة: شركة الرائدة (للشركات فقط)
```

---

## 🔐 معالجة البيانات:

### Validation Server-Side:
```javascript
✅ التحقق من البيانات المطلوبة
✅ التحقق من صيغة البيانات
✅ TODO: التحقق من عدم وجود حساب بنفس الجوال
✅ TODO: تشفير كلمة المرور (bcrypt)
✅ TODO: حفظ في قاعدة البيانات
```

### Validation Client-Side:
```javascript
✅ التحقق من الاسم غير فارغ
✅ التحقق من صيغة الجوال (9+ أرقام)
✅ التحقق من صيغة البريد
✅ التحقق من قوة كلمة المرور (6+ أحرف)
✅ التحقق من تطابق كلمات المرور
✅ التحقق من اسم الشركة (للشركات)
```

---

## 🛠️ الملفات المعدلة:

```
✅ frontend/src/SignUp.jsx (جديد)
   - 310+ سطر كود
   - Component متعدد المراحل

✅ frontend/src/AuthPage.jsx
   - تغيير الاسم إلى AuthLoginPage
   - إضافة زر "إنشاء حساب"

✅ frontend/src/api.js
   - إضافة authApi.signUp()

✅ frontend/src/App.js
   - إدارة حالة authMode
   - Navigation بين Login و SignUp

✅ backend/server.js
   - POST /api/auth/signup endpoint
   - Validation شامل
   - Mock response
```

---

## 📊 مخطط المرحلتين:

```
┌─────────────────────────────────────────┐
│          صفحة التسجيل (SignUp)          │
├─────────────────────────────────────────┤
│                                         │
│  المرحلة 1: اختيار نوع الحساب           │
│  ┌─────────────────────────────────┐   │
│  │ [🏢 شركة] [🚗 سائق]            │   │
│  └─────────────────────────────────┘   │
│                ↓                       │
│  المرحلة 2: ملء البيانات               │
│  ┌─────────────────────────────────┐   │
│  │ اسم الشركة (للشركات فقط)      │   │
│  │ الاسم الشخصي                   │   │
│  │ رقم الجوال                     │   │
│  │ البريد الإلكتروني               │   │
│  │ كلمة المرور                    │   │
│  │ تأكيد كلمة المرور               │   │
│  │ [إنشاء الحساب]                 │   │
│  └─────────────────────────────────┘   │
│                ↓                       │
│  تسجيل الدخول والدخول للـ Dashboard   │
│                                         │
└─────────────────────────────────────────┘
```

---

## 🚀 الخطوات التالية:

### المرحلة 1: قاعدة البيانات
```sql
-- جدول المستخدمين
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  user_type VARCHAR(20) NOT NULL, -- 'company' or 'driver'
  company_name VARCHAR(255), -- للشركات فقط
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### المرحلة 2: تحسينات الأمان
```javascript
// استخدام bcrypt لتشفير كلمات المرور
const bcrypt = require('bcrypt');
const hashedPassword = await bcrypt.hash(password, 10);

// JWT الحقيقي
const jwt = require('jsonwebtoken');
const token = jwt.sign({ userId, userType }, SECRET_KEY);
```

### المرحلة 3: التحقق من البيانات الفريدة
```javascript
// التحقق من عدم وجود حساب بنفس الجوال
const existingUser = await query(
  'SELECT * FROM users WHERE phone = $1',
  [phone]
);

if (existingUser.rowCount > 0) {
  return res.status(400).json({ message: 'هذا الجوال مسجل بالفعل' });
}
```

---

## 🎓 شرح الكود:

### Component MultiStep:
```javascript
const [step, setStep] = useState(1);
// المرحلة 1: اختيار النوع
// المرحلة 2: ملء البيانات
```

### Validation Functions:
```javascript
validatePhoneFormat() // التحقق من صيغة الجوال
validatePasswordFormat() // التحقق من قوة كلمة المرور
validateEmail() // التحقق من صيغة البريد
validateStep2() // التحقق من جميع الحقول
```

### API Integration:
```javascript
const response = await authApi.signUp(signUpData);
// ترسل POST request لـ /api/auth/signup
// تحفظ النتيجة في AuthContext
// تدخل تلقائياً بعد النجاح
```

---

## ✅ تم الإنجاز:

✅ SignUp component كامل
✅ API endpoint /api/auth/signup
✅ Validation شامل (Client + Server)
✅ Integration مع AuthContext
✅ Responsive design
✅ عربي 100%
✅ جاهز للإنتاج (بعد ربط DB)

---

## 📝 ملاحظات مهمة:

```
⚠️ البيانات الآن وهمية - تحتاج:
   1. قاعدة بيانات حقيقية
   2. تشفير كلمات المرور
   3. JWT الحقيقي
   4. التحقق من البيانات الفريدة

✅ ما تم:
   1. Validation شامل
   2. UX سهل الاستخدام
   3. Error handling جيد
   4. Loading states
   5. Responsive design
```

---

**تم الإضافة بنجاح! 🎉**
