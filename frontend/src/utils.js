// utils.js - مساعدات عامة للمشروع

// ============== Local Storage ==============
export const storageUtils = {
  // Auth Token
  getToken: () => localStorage.getItem('authToken'),
  setToken: (token) => localStorage.setItem('authToken', token),
  clearToken: () => localStorage.removeItem('authToken'),

  // User Type
  getUserType: () => localStorage.getItem('userType'),
  setUserType: (type) => localStorage.setItem('userType', type),
  clearUserType: () => localStorage.removeItem('userType'),

  // User Data
  getUserData: () => {
    const data = localStorage.getItem('userData');
    return data ? JSON.parse(data) : null;
  },
  setUserData: (data) => localStorage.setItem('userData', JSON.stringify(data)),
  clearUserData: () => localStorage.removeItem('userData'),

  // Clear All
  clearAll: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userType');
    localStorage.removeItem('userData');
  },
};

// ============== Header Utilities ==============
export const getAuthHeaders = (token) => {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

// ============== Error Handling ==============
export const formatError = (error) => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'حدث خطأ غير متوقع';
};

// ============== Date Formatting ==============
export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('ar-SA');
};

export const formatDateTime = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return `${d.toLocaleDateString('ar-SA')} ${d.toLocaleTimeString('ar-SA')}`;
};

// ============== Currency Formatting ==============
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: 'SAR',
  }).format(amount || 0);
};

// ============== Distance & Speed ==============
export const calculateETA = (distance, speed = 90) => {
  if (distance <= 0) return 0;
  const hours = (distance / speed) + 2;
  return Math.max(0, hours).toFixed(1);
};

export const formatDistance = (km) => {
  return `${km} كم`;
};

export const formatSpeed = (kmh) => {
  return `${kmh} كم/س`;
};

// ============== Input Validation ==============
export const validatePhone = (phone) => {
  return /^\d{9,}$/.test(phone);
};

export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

// ============== API Error Interceptor ==============
export const handleApiError = (error) => {
  console.error('API Error:', error);
  
  if (error.response) {
    // Server responded with error status
    const status = error.response.status;
    const data = error.response.data;

    if (status === 401) {
      // Unauthorized - clear auth and redirect to login
      storageUtils.clearAll();
      window.location.href = '/';
      return 'جلستك انتهت. يرجى تسجيل الدخول مجدداً';
    }

    if (status === 403) {
      return 'ليس لديك صلاحيات كافية';
    }

    if (status === 404) {
      return 'البيانات المطلوبة غير موجودة';
    }

    if (status === 500) {
      return 'خطأ في الخادم. حاول لاحقاً';
    }

    return data.message || `خطأ: ${status}`;
  }

  if (error.message === 'Network Error') {
    return 'خطأ في الاتصال. تحقق من الإنترنت';
  }

  return error.message || 'حدث خطأ غير متوقع';
};

export default {
  storageUtils,
  getAuthHeaders,
  formatError,
  formatDate,
  formatDateTime,
  formatCurrency,
  calculateETA,
  formatDistance,
  formatSpeed,
  validatePhone,
  validateEmail,
  validatePassword,
  handleApiError,
};
