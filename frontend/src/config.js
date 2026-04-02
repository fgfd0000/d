// config.js - إعدادات المشروع

const ENV = process.env.NODE_ENV || 'development';

const config = {
  development: {
    API_URL: 'http://localhost:5000/api',
    API_TIMEOUT: 30000,
    DEBUG: true,
  },
  production: {
    API_URL: process.env.REACT_APP_API_URL || 'https://api.logiconnect.com/api',
    API_TIMEOUT: 30000,
    DEBUG: false,
  },
};

const currentConfig = config[ENV];

export default {
  API_URL: currentConfig.API_URL,
  API_TIMEOUT: currentConfig.API_TIMEOUT,
  DEBUG: currentConfig.DEBUG,
  ENV,
};
