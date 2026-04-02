// api.js - API utility functions

import config from './config';

// Generic fetch wrapper with error handling
export const apiCall = async (endpoint, options = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), config.API_TIMEOUT);

  try {
    const response = await fetch(`${config.API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      signal: controller.signal,
      ...options,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'خطأ غير معروف' }));
      throw new Error(errorData.message || `خطأ: ${response.status}`);
    }

    const data = await response.json();
    
    if (config.DEBUG) {
      console.log(`✅ ${options.method || 'GET'} ${endpoint}`, data);
    }

    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new Error('انتهت مهلة الانتظار. يرجى المحاولة لاحقاً');
    }

    if (config.DEBUG) {
      console.error('❌ API Error:', error);
    }

    throw error;
  }
};

// ============== AUTH APIs ==============
export const authApi = {
  login: async (phone, password, userType) => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ phone, password, userType }),
    });
  },

  signUp: async (userData) => {
    return apiCall('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  logout: async (token) => {
    return apiCall('/auth/logout', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
    });
  },
};

// ============== COMPANY APIs ==============
export const companyApi = {
  getDashboardData: async (token) => {
    return apiCall('/company/dashboard', {
      headers: { 'Authorization': `Bearer ${token}` },
    });
  },

  getWarehouses: async (token) => {
    return apiCall('/company/warehouses', {
      headers: { 'Authorization': `Bearer ${token}` },
    });
  },

  addWarehouse: async (token, warehouseData) => {
    return apiCall('/company/warehouses', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(warehouseData),
    });
  },

  deleteWarehouse: async (token, warehouseId) => {
    return apiCall(`/company/warehouses/${warehouseId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
  },

  getAvailableTrucks: async (token) => {
    return apiCall('/company/trucks', {
      headers: { 'Authorization': `Bearer ${token}` },
    });
  },

  getOrders: async (token) => {
    return apiCall('/company/orders', {
      headers: { 'Authorization': `Bearer ${token}` },
    });
  },

  createOrder: async (token, orderData) => {
    return apiCall('/company/orders', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(orderData),
    });
  },
};

// ============== DRIVER APIs ==============
export const driverApi = {
  getDashboardData: async (token) => {
    return apiCall('/driver/dashboard', {
      headers: { 'Authorization': `Bearer ${token}` },
    });
  },

  getAvailableLoads: async (token) => {
    return apiCall('/driver/loads', {
      headers: { 'Authorization': `Bearer ${token}` },
    });
  },

  acceptLoad: async (token, loadId) => {
    return apiCall(`/driver/loads/${loadId}/accept`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
    });
  },

  completeTrip: async (token, tripData) => {
    return apiCall('/driver/trips/complete', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(tripData),
    });
  },

  uploadPOD: async (token, formData) => {
    return apiCall('/driver/pod/upload', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData,
    });
  },

  getTripHistory: async (token) => {
    return apiCall('/driver/trips/history', {
      headers: { 'Authorization': `Bearer ${token}` },
    });
  },

  getWalletBalance: async (token) => {
    return apiCall('/driver/wallet', {
      headers: { 'Authorization': `Bearer ${token}` },
    });
  },
};

// ============== TRACKING APIs ==============
export const trackingApi = {
  trackShipment: async (token, shipmentId) => {
    return apiCall(`/tracking/${shipmentId}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
  },

  subscribeToUpdates: async (token, shipmentId) => {
    // This would use WebSocket for real-time updates
    // For now, returning a basic promise
    return Promise.resolve({ subscribed: true });
  },
};

const apiExports = {
  authApi,
  companyApi,
  driverApi,
  trackingApi,
};

export default apiExports;
