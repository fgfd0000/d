// AuthContext.js - Context API للتحكم بحالة المستخدم

import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageUtils } from './utils';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  // تحميل البيانات من localStorage عند بدء التطبيق
  useEffect(() => {
    const savedToken = storageUtils.getToken();
    const savedUserType = storageUtils.getUserType();
    const savedUserData = storageUtils.getUserData();

    if (savedToken && savedUserType) {
      setToken(savedToken);
      setUserType(savedUserType);
      setUser(savedUserData);
    }

    setLoading(false);
  }, []);

  const login = (userData, token, userType) => {
    setUser(userData);
    setToken(token);
    setUserType(userType);
    storageUtils.setToken(token);
    storageUtils.setUserType(userType);
    storageUtils.setUserData(userData);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setUserType(null);
    storageUtils.clearAll();
  };

  const updateUser = (userData) => {
    setUser(userData);
    storageUtils.setUserData(userData);
  };

  const value = {
    user,
    token,
    userType,
    loading,
    login,
    logout,
    updateUser,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
