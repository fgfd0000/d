import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation & General
      welcome: 'Welcome',
      logout: 'Logout',
      back: 'Back',
      cancel: 'Cancel',
      confirm: 'Confirm',
      submit: 'Submit',
      close: 'Close',
      save: 'Save',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',

      // App Name
      appName: 'LogiConnect',
      appSlogan: 'Modern and Reliable Logistics Platform',

      // Login Page
      login: 'Sign In',
      loginTitle: 'Sign In to Your Account',
      loginSubtitle: 'Enter your credentials to continue',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot Password?',
      noAccount: "Don't have an account?",
      createNewAccount: 'Create New Account',
      loginButton: 'Sign In',
      loginButtonLoading: 'Signing in...',
      successLogin: 'Successfully signed in!',

      // Sign Up Page
      signup: 'Create Account',
      signupTitle: 'Create New Account',
      signupSubtitle: 'Join LogiConnect today',
      selectAccountType: 'Account Type',
      accountType: 'Account Type',
      companyAccount: 'Company Account',
      companyAccountDesc: 'Manage shipments, warehouses and drivers',
      driverAccount: 'Driver Account',
      driverAccountDesc: 'Accept trips, manage earnings and ratings',
      companyInfo: 'Company Information',
      driverInfo: 'Driver Information',
      backToLogin: '← Back to Sign In',
      agreeTerms: 'I agree to the',
      termsOfService: 'Terms of Service',
      privacyPolicy: 'Privacy Policy',
      successSignup: 'Account created successfully!',

      // Form Fields
      phone: 'Phone Number',
      phoneExample: 'e.g. 966501234567',
      phoneRequired: 'Phone number is required',
      phoneInvalid: 'Phone number is invalid',
      email: 'Email Address',
      emailExample: 'your@email.com',
      emailRequired: 'Email address is required',
      emailInvalid: 'Email address is invalid',
      password: 'Password',
      passwordPlaceholder: 'Enter password (minimum 6 characters)',
      passwordRequired: 'Password is required',
      passwordTooShort: 'Password must be at least 6 characters',
      confirmPassword: 'Confirm Password',
      confirmPasswordPlaceholder: 'Re-enter your password',
      passwordsNotMatch: 'Passwords do not match',
      name: 'Full Name',
      nameExample: 'Enter your full name',
      nameRequired: 'Full name is required',
      companyName: 'Company Name',
      companyNameExample: 'e.g. Fast Shipping Inc.',
      companyNameRequired: 'Company name is required',

      // Dashboard - Company
      companyDashboard: 'Company Dashboard',
      welcome_company: 'Welcome, {{name}}',
      dashboard: 'Dashboard',
      warehouses: 'Warehouses',
      orders: 'Orders',
      analytics: 'Analytics',
      totalOrders: 'Total Orders',
      activeOrders: 'Active Orders',
      totalRevenue: 'Total Revenue',
      completionRate: 'Completion Rate',
      warehouseUtilization: 'Warehouse Utilization',
      recentActivity: 'Recent Activity',
      allActiveOrders: 'All Active Orders',
      addWarehouse: '+ Add Warehouse',
      warehouseName: 'Warehouse Name',
      city: 'City',
      manager: 'Manager',
      capacity: 'Capacity',
      utilization: 'Utilization',
      addWarehouseModal: 'Add New Warehouse',
      warehouses_empty: 'Warehouses coming soon',

      // Dashboard - Driver
      driverDashboard: 'Driver Dashboard',
      welcome_driver: 'Welcome, {{name}}',
      active: 'Active',
      history: 'History',
      earnings: 'Earnings',
      totalTrips: 'Total Trips',
      dailyEarnings: 'Daily Earnings',
      rating: 'Rating',
      workingHours: 'Working Hours',
      activeTrips: 'Active Trips',
      tripHistory: 'Trip History',
      weeklyEarnings: 'Weekly Earnings',
      noActiveTrips: 'No active trips currently',
      viewDetails: 'View Details',
      completeTrip: 'Complete Trip',
      from: 'From',
      to: 'To',
      distance: 'Distance (km)',
      tripEarnings: 'Earnings',
      status: 'Status',
      active_trip: 'Active',
      completed_trip: 'Completed',
      pending_trip: 'Pending',
      cancelled_trip: 'Cancelled',

      // Status & Progress
      active_warehouse: 'Active',
      pending: 'Pending',
      inTransit: 'In Transit',
      completed: 'Completed',
      progress: 'Progress',

      // Error Messages
      errorFetchFailed: 'Failed to fetch data',
      errorUnknown: 'An unknown error occurred',
      errorTimeout: 'Request timeout. Please try again.',
      errorNetwork: 'Network error. Please check your connection.',
      errorSomethingWrong: 'Something went wrong. Please try again.',

      // Success Messages
      successOperationCompleted: 'Operation completed successfully',
      successSaved: 'Changes saved successfully',
      successDeleted: 'Item deleted successfully',

      // Language Switcher
      language: 'Language',
      english: 'English',
      arabic: 'العربية',
    }
  },
  ar: {
    translation: {
      // Navigation & General
      welcome: 'أهلا بك',
      logout: 'تسجيل الخروج',
      back: 'رجوع',
      cancel: 'إلغاء',
      confirm: 'تأكيد',
      submit: 'إرسال',
      close: 'إغلاق',
      save: 'حفظ',
      loading: 'جاري التحميل...',
      error: 'خطأ',
      success: 'نجح',

      // App Name
      appName: 'لوجي كونكت',
      appSlogan: 'منصة لوجستيات حديثة وموثوقة',

      // Login Page
      login: 'تسجيل الدخول',
      loginTitle: 'تسجيل الدخول إلى حسابك',
      loginSubtitle: 'أدخل بيانات اعتمادك للمتابعة',
      rememberMe: 'تذكرني',
      forgotPassword: 'هل نسيت كلمة المرور؟',
      noAccount: 'ليس لديك حساب؟',
      createNewAccount: 'إنشاء حساب جديد',
      loginButton: 'دخول',
      loginButtonLoading: 'جاري الدخول...',
      successLogin: 'تم تسجيل الدخول بنجاح!',

      // Sign Up Page
      signup: 'إنشاء حساب',
      signupTitle: 'إنشاء حساب جديد',
      signupSubtitle: 'انضم إلى لوجي كونكت اليوم',
      selectAccountType: 'نوع الحساب',
      accountType: 'نوع الحساب',
      companyAccount: 'حساب شركة',
      companyAccountDesc: 'إدارة الشحنات والمستودعات والسائقين',
      driverAccount: 'حساب سائق',
      driverAccountDesc: 'قبول الرحلات وإدارة الأرباح والتقييمات',
      companyInfo: 'معلومات الشركة',
      driverInfo: 'معلومات السائق',
      backToLogin: '← العودة لتسجيل الدخول',
      agreeTerms: 'أوافق على',
      termsOfService: 'شروط الخدمة',
      privacyPolicy: 'سياسة الخصوصية',
      successSignup: 'تم إنشاء الحساب بنجاح!',

      // Form Fields
      phone: 'رقم الهاتف',
      phoneExample: 'مثلاً: 966501234567',
      phoneRequired: 'رقم الهاتف مطلوب',
      phoneInvalid: 'رقم الهاتف غير صحيح',
      email: 'البريد الإلكتروني',
      emailExample: 'your@email.com',
      emailRequired: 'البريد الإلكتروني مطلوب',
      emailInvalid: 'البريد الإلكتروني غير صحيح',
      password: 'كلمة المرور',
      passwordPlaceholder: 'أدخل كلمة المرور (6 أحرف على الأقل)',
      passwordRequired: 'كلمة المرور مطلوبة',
      passwordTooShort: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
      confirmPassword: 'تأكيد كلمة المرور',
      confirmPasswordPlaceholder: 'أعد إدخال كلمة المرور',
      passwordsNotMatch: 'كلمات المرور غير متطابقة',
      name: 'الاسم الكامل',
      nameExample: 'أدخل اسمك الكامل',
      nameRequired: 'الاسم مطلوب',
      companyName: 'اسم الشركة',
      companyNameExample: 'مثلاً: شركة النقل السريع',
      companyNameRequired: 'اسم الشركة مطلوب',

      // Dashboard - Company
      companyDashboard: 'لوحة تحكم الشركة',
      welcome_company: 'مرحباً، {{name}}',
      dashboard: 'لوحة التحكم',
      warehouses: 'المستودعات',
      orders: 'الطلبات',
      analytics: 'التحليلات',
      totalOrders: 'إجمالي الطلبات',
      activeOrders: 'الطلبات النشطة',
      totalRevenue: 'إجمالي الإيرادات',
      completionRate: 'معدل الإكمال',
      warehouseUtilization: 'استخدام المستودعات',
      recentActivity: 'النشاط الأخير',
      allActiveOrders: 'جميع الطلبات النشطة',
      addWarehouse: '+ إضافة مستودع',
      warehouseName: 'اسم المستودع',
      city: 'المدينة',
      manager: 'المدير',
      capacity: 'السعة',
      utilization: 'الاستخدام',
      addWarehouseModal: 'إضافة مستودع جديد',
      warehouses_empty: 'المستودعات قريباً',

      // Dashboard - Driver
      driverDashboard: 'لوحة تحكم السائق',
      welcome_driver: 'مرحباً، {{name}}',
      active: 'نشطة',
      history: 'السجل',
      earnings: 'الأرباح',
      totalTrips: 'إجمالي الرحلات',
      dailyEarnings: 'الأرباح اليومية',
      rating: 'التقييم',
      workingHours: 'ساعات العمل',
      activeTrips: 'الرحلات النشطة',
      tripHistory: 'سجل الرحلات',
      weeklyEarnings: 'الأرباح الأسبوعية',
      noActiveTrips: 'لا توجد رحلات نشطة حالياً',
      viewDetails: 'عرض التفاصيل',
      completeTrip: 'إنهاء الرحلة',
      from: 'من',
      to: 'إلى',
      distance: 'المسافة (كم)',
      tripEarnings: 'الأرباح',
      status: 'الحالة',
      active_trip: 'نشطة',
      completed_trip: 'مكتملة',
      pending_trip: 'قيد الانتظار',
      cancelled_trip: 'ملغاة',

      // Status & Progress
      active_warehouse: 'نشط',
      pending: 'قيد الانتظار',
      inTransit: 'قيد النقل',
      completed: 'مكتملة',
      progress: 'التقدم',

      // Error Messages
      errorFetchFailed: 'فشل في جلب البيانات',
      errorUnknown: 'حدث خطأ غير معروف',
      errorTimeout: 'انتهت مهلة الانتظار. يرجى المحاولة لاحقاً',
      errorNetwork: 'خطأ في الشبكة. يرجى التحقق من اتصالك',
      errorSomethingWrong: 'حدث خطأ ما. يرجى المحاولة لاحقاً',

      // Success Messages
      successOperationCompleted: 'تمت العملية بنجاح',
      successSaved: 'تم حفظ التغييرات بنجاح',
      successDeleted: 'تم حذف العنصر بنجاح',

      // Language Switcher
      language: 'اللغة',
      english: 'English',
      arabic: 'العربية',
    }
  }
};

// i18n configuration
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

// Set document direction based on language
i18n.on('languageChanged', (lng) => {
  document.dir = lng === 'ar' ? 'rtl' : 'ltr';
  localStorage.setItem('language', lng);
});

// Set initial direction
document.dir = (localStorage.getItem('language') || 'en') === 'ar' ? 'rtl' : 'ltr';

export default i18n;
