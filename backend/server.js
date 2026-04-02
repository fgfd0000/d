// server.js
const express = require('express');
const cors = require('cors');
const { query } = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

// ============== Middleware ==============
// Simple JWT validation (يمكن استبداله بـ jsonwebtoken لاحقاً)
const validateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'توكن غير موجود' });
  }
  // TODO: تحقق من صحة التوكن
  req.token = token;
  next();
};

app.post('/api/auth/login', async (req, res) => {
  try {
    const { phone, password, userType } = req.body;

    if (!phone || !password || !userType) {
      return res.status(400).json({ message: 'بيانات ناقصة' });
    }

    // TODO: البحث عن المستخدم والتحقق من كلمة المرور
    const mockToken = 'token_' + Date.now();
    const mockUser = {
      id: 1,
      phone,
      userType,
      name: userType === 'company' ? 'شركة الرائدة' : 'محمد السائق',
    };

    res.status(200).json({
      success: true,
      message: 'تم الدخول بنجاح',
      token: mockToken,
      user: mockUser,
    });
  } catch (error) {
    res.status(500).json({ message: 'خطأ في الخادم', error: error.message });
  }
});

app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, phone, email, password, userType, companyName } = req.body;

    // التحقق من البيانات المطلوبة
    if (!name || !phone || !email || !password || !userType) {
      return res.status(400).json({ message: 'بيانات ناقصة' });
    }

    if (userType === 'company' && !companyName) {
      return res.status(400).json({ message: 'اسم الشركة مطلوب' });
    }

    // TODO: التحقق من وجود المستخدم
    // TODO: تشفير كلمة المرور
    // TODO: حفظ المستخدم في قاعدة البيانات

    // للتطوير: محاكاة تسجيل ناجح
    const mockToken = 'token_' + Date.now();
    const mockUser = {
      id: Date.now(),
      name,
      phone,
      email,
      userType,
      companyName: userType === 'company' ? companyName : null,
    };

    res.status(201).json({
      success: true,
      message: 'تم إنشاء الحساب بنجاح',
      token: mockToken,
      user: mockUser,
    });
  } catch (error) {
    res.status(500).json({ message: 'خطأ في الخادم', error: error.message });
  }
});

app.post('/api/auth/logout', validateToken, (req, res) => {
  res.status(200).json({ success: true, message: 'تم تسجيل الخروج' });
});

// ============== Company Routes ==============
app.get('/api/company/dashboard', validateToken, (req, res) => {
  try {
    const mockData = {
      totalDistance: 12400,
      activeWarehouses: 2,
      fleetSpeed: 90,
      operatingCosts: 45000,
    };
    res.status(200).json(mockData);
  } catch (error) {
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

app.get('/api/company/warehouses', validateToken, (req, res) => {
  try {
    const mockWarehouses = [
      {
        id: 1,
        name: 'مستودع الخمرة المركزي',
        city: 'جدة',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3715.467433!2d39.21!3d21.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDIxJzAwLjAiTiAzOcKwMTInMzYuMCJF!5e0!3m2!1sar!2ssa!4v1625000000000',
      },
      {
        id: 2,
        name: 'مخازن الكويت - الشويخ',
        city: 'الكويت',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111224.23!2d47.9!3d29.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDE4JzAwLjAiTiA0N8KwNTQnMDAuMCJF!5e0!3m2!1sar!2skw!4v1625000000000',
      },
    ];
    res.status(200).json(mockWarehouses);
  } catch (error) {
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

app.post('/api/company/warehouses', validateToken, (req, res) => {
  try {
    const { name, city } = req.body;
    const newWarehouse = {
      id: Date.now(),
      name,
      city,
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.0!2d46.7!3d24.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzAwLjAiTiA0Niw0MicwMC4wIkU!5e0!3m2!1sar!2ssa!4v1625000000000',
    };
    res.status(201).json(newWarehouse);
  } catch (error) {
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

app.delete('/api/company/warehouses/:id', validateToken, (req, res) => {
  try {
    res.status(200).json({ success: true, message: 'تم حذف المستودع' });
  } catch (error) {
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

app.get('/api/company/trucks', validateToken, (req, res) => {
  try {
    const mockTrucks = [
      {
        id: 101,
        type: 'شركة شحن',
        companyName: 'شركة الرائدة للنقل',
        driverName: 'محمود عبدالسلام',
        nationality: 'مصري',
        truckType: 'تريلا (سطحة)',
        plate: 'س ص ع 1234',
        capacity: '25 طن',
        distance: 1250,
      },
    ];
    res.status(200).json(mockTrucks);
  } catch (error) {
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

app.get('/api/company/orders', validateToken, (req, res) => {
  try {
    const mockOrders = [
      {
        id: 'LOGI-2026-01',
        driver: 'سالم الدوسري',
        totalDist: 1250,
        coveredDist: 800,
        from: 'مرسى جدة',
        to: 'مخازن الكويت',
        status: 'في الطريق',
        plate: 'أ ب ت 9876',
      },
    ];
    res.status(200).json(mockOrders);
  } catch (error) {
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

app.post('/api/company/orders', validateToken, (req, res) => {
  try {
    const { from, to, cargo } = req.body;
    const newOrder = {
      id: 'LOGI-' + Date.now(),
      from,
      to,
      cargo,
      status: 'جديد',
      createdAt: new Date(),
    };
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

// ============== Driver Routes ==============
app.get('/api/driver/dashboard', validateToken, (req, res) => {
  try {
    const mockData = {
      walletBalance: 12500,
      totalTrips: 24,
      averageRating: 4.8,
    };
    res.status(200).json(mockData);
  } catch (error) {
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

app.get('/api/driver/loads', validateToken, (req, res) => {
  try {
    const mockLoads = [
      {
        id: 'L-101',
        from: 'ميناء جدة الإسلامي',
        to: 'مستودع الرياض المركزي',
        cargo: 'مواد بناء',
        weight: '25 طن',
        distance: 950,
        price: 2500,
      },
    ];
    res.status(200).json(mockLoads);
  } catch (error) {
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

app.post('/api/driver/loads/:id/accept', validateToken, (req, res) => {
  try {
    res.status(200).json({ success: true, message: 'تم قبول الشحنة' });
  } catch (error) {
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

app.post('/api/driver/trips/complete', validateToken, (req, res) => {
  try {
    res.status(200).json({ success: true, message: 'تم إكمال الرحلة' });
  } catch (error) {
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

app.post('/api/driver/pod/upload', validateToken, (req, res) => {
  try {
    // معالجة رفع الملف
    res.status(200).json({ success: true, message: 'تم رفع الملف بنجاح' });
  } catch (error) {
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

app.get('/api/driver/trips/history', validateToken, (req, res) => {
  try {
    const mockHistory = [];
    res.status(200).json(mockHistory);
  } catch (error) {
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

app.get('/api/driver/wallet', validateToken, (req, res) => {
  try {
    res.status(200).json({ balance: 12500 });
  } catch (error) {
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

// ============== Health Check ==============
app.get('/', (req, res) => {
  res.send('نظام لوجي كونكت يعمل بنجاح ✅');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});