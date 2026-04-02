# 🚀 Backend API Documentation

## ✅ Endpoints المضافة:

### Authentication
```
POST /api/auth/login
- Body: { phone, password, userType }
- Response: { token, user, message }

POST /api/auth/logout
- Headers: Authorization: Bearer <token>
- Response: { success, message }
```

### Company Dashboard
```
GET /api/company/dashboard
- Headers: Authorization: Bearer <token>
- Response: { totalDistance, activeWarehouses, fleetSpeed, operatingCosts }

GET /api/company/warehouses
- Headers: Authorization: Bearer <token>
- Response: Array of warehouses

POST /api/company/warehouses
- Headers: Authorization: Bearer <token>
- Body: { name, city }
- Response: { id, name, city, mapUrl }

DELETE /api/company/warehouses/:id
- Headers: Authorization: Bearer <token>
- Response: { success, message }

GET /api/company/trucks
- Headers: Authorization: Bearer <token>
- Response: Array of trucks

GET /api/company/orders
- Headers: Authorization: Bearer <token>
- Response: Array of orders

POST /api/company/orders
- Headers: Authorization: Bearer <token>
- Body: { from, to, cargo }
- Response: { id, from, to, cargo, status, createdAt }
```

### Driver Dashboard
```
GET /api/driver/dashboard
- Headers: Authorization: Bearer <token>
- Response: { walletBalance, totalTrips, averageRating }

GET /api/driver/loads
- Headers: Authorization: Bearer <token>
- Response: Array of available loads

POST /api/driver/loads/:id/accept
- Headers: Authorization: Bearer <token>
- Response: { success, message }

POST /api/driver/trips/complete
- Headers: Authorization: Bearer <token>
- Body: { tripData }
- Response: { success, message }

POST /api/driver/pod/upload
- Headers: Authorization: Bearer <token>
- Content-Type: multipart/form-data
- Response: { success, message }

GET /api/driver/trips/history
- Headers: Authorization: Bearer <token>
- Response: Array of past trips

GET /api/driver/wallet
- Headers: Authorization: Bearer <token>
- Response: { balance }
```

## 🛠️ الخطوات التالية:

1. **ربط قاعدة البيانات الحقيقية**
   - استبدال البيانات الوهمية بـ queries من PostgreSQL
   - إضافة جداول للمستخدمين والمستودعات والشحنات

2. **تأمين API**
   - استخدام JWT الحقيقي بدل mock token
   - التحقق من صحة التوكن
   - إضافة تشفير كلمات المرور (bcrypt)

3. **معالجة الأخطاء**
   - رسائل خطأ موحدة
   - Status codes صحيحة

4. **Validations**
   - التحقق من صحة البيانات المدخلة
   - Error messages واضحة

## 📝 بيانات اختبار مؤقتة:

الـ API يرجع بيانات وهمية الآن لـ testing. يجب استبدالها بـ queries حقيقية.

## 🚀 تشغيل:

```bash
cd backend
npm install
npm start
```

المخادم يشتغل على `http://localhost:5000`
