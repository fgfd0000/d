# 🔧 متطلبات البيئة والتثبيت

## المتطلبات الأساسية:

### System Requirements:
- **Node.js** v14 أو أحدث
- **npm** v6 أو أحدث
- **PostgreSQL** 12 أو أحدث (اختياري حالياً)
- **Git**

### التحقق من التثبيت:
```bash
node --version    # v14.0.0+
npm --version     # 6.0.0+
psql --version    # postgres 12+
```

---

## 🚀 خطوات الإعداد:

### 1. استنساخ المشروع (أو تحضير الملفات):
```bash
cd h:\LogiConnect
git init
git add .
git commit -m "Initial commit"
```

### 2. إعداد Backend:

```bash
cd backend

# تثبيت Dependencies
npm install

# إنشاء .env (اختياري)
cat > .env << EOF
PORT=5000
DATABASE_URL=postgresql://postgres:password@localhost:5432/logiconnect_db
JWT_SECRET=your_secret_key_here
NODE_ENV=development
EOF

# تشغيل الخادم
npm start
```

**سيظهر:**
```
🚀 Server is running on http://localhost:5000
```

### 3. إعداد Frontend:

```bash
cd frontend

# تثبيت Dependencies
npm install

# إنشاء .env (من .env.example)
cp .env.example .env

# تحرير .env إذا لزم الحال
# REACT_APP_API_URL=http://localhost:5000/api

# تشغيل التطبيق
npm start
```

**سيفتح تلقائياً:**
```
http://localhost:3000
```

---

## 📋 Environment Variables:

### Backend (.env):
```env
# Server
PORT=5000
NODE_ENV=development

# Database
DB_USER=postgres
DB_HOST=localhost
DB_NAME=logiconnect_db
DB_PASSWORD=your_password
DB_PORT=5432

# JWT
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=24h

# CORS
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env):
```env
# API
REACT_APP_API_URL=http://localhost:5000/api

# Environment
REACT_APP_ENV=development
```

---

## 🗄️ إعداد قاعدة البيانات (PostgreSQL):

### 1. إنشاء Database:
```sql
CREATE DATABASE logiconnect_db;
```

### 2. الاتصال به:
```bash
psql -U postgres -d logiconnect_db
```

### 3. إنشاء الجداول:
```sql
-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    phone VARCHAR(20) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    user_type VARCHAR(20) NOT NULL, -- 'company' or 'driver'
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Warehouses Table
CREATE TABLE warehouses (
    id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    map_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trucks/Loads Table
CREATE TABLE loads (
    id SERIAL PRIMARY KEY,
    driver_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    company_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    from_location VARCHAR(255) NOT NULL,
    to_location VARCHAR(255) NOT NULL,
    cargo VARCHAR(255) NOT NULL,
    weight VARCHAR(50),
    distance INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'available', -- available, accepted, in_progress, completed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trips Table
CREATE TABLE trips (
    id SERIAL PRIMARY KEY,
    driver_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    load_id INTEGER NOT NULL REFERENCES loads(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'active', -- active, completed, cancelled
    current_distance INTEGER DEFAULT 0,
    current_speed INTEGER DEFAULT 0,
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    pod_file_path VARCHAR(255),
    earnings DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Wallet Table
CREATE TABLE wallets (
    id SERIAL PRIMARY KEY,
    driver_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    balance DECIMAL(12, 2) DEFAULT 0,
    total_earnings DECIMAL(12, 2) DEFAULT 0,
    total_trips INTEGER DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_warehouses_company_id ON warehouses(company_id);
CREATE INDEX idx_loads_driver_id ON loads(driver_id);
CREATE INDEX idx_loads_company_id ON loads(company_id);
CREATE INDEX idx_trips_driver_id ON trips(driver_id);
CREATE INDEX idx_wallets_driver_id ON wallets(driver_id);
```

---

## 🧪 اختبار الاتصالات:

### Test Backend:
```bash
curl http://localhost:5000/
# يجب أن ترجع: "نظام لوجي كونكت يعمل بنجاح ✅"
```

### Test API Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"phone":"500000000","password":"123456","userType":"company"}'
```

### Test Frontend Connection:
افتح DevTools (F12) → Network → حاول تسجيل الدخول
يجب أن ترى request للـ `/api/auth/login`

---

## 🐛 استكشاف المشاكل:

### Port already in use:
```bash
# ابحث عن العملية المستخدمة للـ port
lsof -i :5000  # للـ Backend
lsof -i :3000  # للـ Frontend

# استخدم port مختلف
PORT=5001 npm start  # Backend
PORT=3001 npm start  # Frontend
```

### CORS Error:
في `backend/server.js`:
```javascript
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

### Database Connection Error:
- تأكد من PostgreSQL مشتغل: `pg_isready`
- تأكد من البيانات صحيحة في `.env`
- تأكد من إنشاء قاعدة البيانات

### API Returns 404:
- تأكد من `REACT_APP_API_URL` صحيح في `.env`
- تأكد من الـ Backend يشتغل (`npm start`)
- افتح DevTools وشوف الـ URL الكامل

---

## 📦 Dependencies المثبتة:

### Backend (server.js):
```json
{
  "cors": "^2.8.6",         // تفعيل CORS
  "express": "^5.2.1",      // Web framework
  "pg": "^8.20.0",         // PostgreSQL client
  "socket.io": "^4.8.3"     // Real-time updates
}
```

### Frontend (React):
```
React 18+
ReactDOM
بدون dependencies إضافية للآن
```

---

## ✅ Checklist الإعداد:

- [ ] تثبيت Node.js و npm
- [ ] استنساخ/تحضير المشروع
- [ ] تشغيل Backend (`npm start`)
- [ ] التحقق من الاتصال على `http://localhost:5000`
- [ ] تشغيل Frontend (`npm start`)
- [ ] التحقق من الاتصال على `http://localhost:3000`
- [ ] اختبار تسجيل الدخول
- [ ] (اختياري) إعداد قاعدة البيانات

---

## 🎯 Next Steps:

1. ✅ الـ Backend يشتغل مع بيانات وهمية
2. ✅ الـ Frontend يتصل بـ API
3. ⏳ ربط قاعدة البيانات الحقيقية
4. ⏳ تحسين JWT
5. ⏳ إضافة WebSocket

---

**آخر تحديث:** مارس 2026
