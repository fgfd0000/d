import React, { useState } from 'react';
import { authApi } from './api';
import { useAuth } from './AuthContext';

const AuthLoginPage = ({ onLogin, onGoToSignUp, onToggleLanguage, currentLang }) => {
  const { login } = useAuth();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isArabic = currentLang === 'ar';

  const validateInputs = () => {
    setError('');
    
    if (!phone.trim()) {
      setError(isArabic ? 'يرجى إدخال رقم الجوال' : 'Please enter phone number');
      return false;
    }
    if (!/^\d{9,}$/.test(phone)) {
      setError(isArabic ? 'رقم الجوال غير صحيح' : 'Phone number is invalid');
      return false;
    }
    if (!password.trim()) {
      setError(isArabic ? 'يرجى إدخال كلمة المرور' : 'Please enter password');
      return false;
    }
    if (password.length < 6) {
      setError(isArabic ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleLogin = async (userType) => {
    if (!validateInputs()) return;
    
    setLoading(true);
    
    try {
      const response = await authApi.login(phone, password, userType);
      
      if (response.token && response.user) {
        login(response.user, response.token, userType);
        onLogin(userType);
      } else {
        setError(isArabic ? 'خطأ في الاستجابة. حاول لاحقاً' : 'Response error. Try again later.');
      }
    } catch (err) {
      setError(err.message || (isArabic ? 'فشل الدخول. تحقق من البيانات.' : 'Login failed. Check credentials.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle(isArabic)}>
      {/* Language Switcher */}
      <button
        onClick={onToggleLanguage}
        style={langSwitcherStyle}
        title={isArabic ? 'Switch to English' : 'التبديل للعربية'}
      >
        {isArabic ? 'EN' : 'عربي'}
      </button>

      <div style={cardStyle}>
        <h2 style={titleStyle}>🚛 {isArabic ? 'لوجي كونكت' : 'LogiConnect'}</h2>
        <p style={{color: '#8b4513', marginBottom: '25px', fontSize: '14px'}}>
          {isArabic ? 'منصة الخدمات اللوجستية' : 'Modern Logistics Platform'}
        </p>
        
        {error && <div style={errorStyle}>{error}</div>}
        
        <input 
          type="tel" 
          placeholder={isArabic ? 'رقم الجوال' : 'Phone Number'}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={loading}
          style={inputStyle} 
        />
        <input 
          type="password" 
          placeholder={isArabic ? 'كلمة المرور' : 'Password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          onKeyPress={(e) => e.key === 'Enter' && handleLogin('company')}
          style={inputStyle} 
        />
        
        <button 
          onClick={() => handleLogin('company')}
          disabled={loading}
          style={{...buttonStyle, opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer'}}
        >
          {loading ? (isArabic ? '⏳ جاري الدخول...' : '⏳ Signing in...') : (isArabic ? 'دخول (لوحة الشركات)' : 'Sign In (Company)')}
        </button>

        <button 
          onClick={() => handleLogin('driver')}
          disabled={loading}
          style={{...buttonStyle, backgroundColor: '#d2b48c', color: '#3d2b1f', marginTop: '10px', opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer'}}
        >
          {loading ? (isArabic ? '⏳ جاري الدخول...' : '⏳ Signing in...') : (isArabic ? 'دخول (لوحة السائقين)' : 'Sign In (Driver)')}
        </button>
        
        <button 
          onClick={onGoToSignUp}
          disabled={loading}
          style={{...buttonStyle, backgroundColor: '#8b4513', marginTop: '15px', opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer'}}
        >
          ✨ {isArabic ? 'إنشاء حساب جديد' : 'Create New Account'}
        </button>

        <div style={{marginTop: '25px', fontSize: '11px', color: '#5d4037', lineHeight: '1.6'}}>
          <p style={{margin: '0 0 8px 0'}}>{isArabic ? 'بيانات اختبار:' : 'Test credentials:'}</p>
          <p style={{margin: '3px 0'}}>📱 {isArabic ? 'الجوال:' : 'Phone:'} <code style={{backgroundColor: '#f0f0f0', padding: '2px 4px'}}>500000000</code></p>
          <p style={{margin: '3px 0'}}>🔐 {isArabic ? 'المرور:' : 'Password:'} <code style={{backgroundColor: '#f0f0f0', padding: '2px 4px'}}>123456</code></p>
        </div>
      </div>
    </div>
  );
};

const containerStyle = (isArabic) => ({
  display: 'flex', justifyContent: 'center', alignItems: 'center', 
  minHeight: '100vh', backgroundColor: '#ffffff', 
  direction: isArabic ? 'rtl' : 'ltr',
  padding: '20px',
  position: 'relative',
});

const langSwitcherStyle = {
  position: 'fixed',
  top: '16px',
  right: '16px',
  padding: '8px 16px',
  backgroundColor: '#3d2b1f',
  color: '#d2b48c',
  border: '2px solid #d2b48c',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '14px',
  zIndex: 1000,
  transition: 'all 0.2s',
};

const cardStyle = {
  padding: '40px', borderRadius: '15px', textAlign: 'center',
  backgroundColor: '#f5f5dc', 
  borderTop: '10px solid #d2b48c', 
  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: '350px'
};

const titleStyle = { color: '#3d2b1f', fontSize: '28px', fontWeight: 'bold' };

const inputStyle = {
  width: '100%', padding: '12px', margin: '10px 0', 
  borderRadius: '8px', border: '1px solid #d2b48c', outline: 'none',
  fontSize: '14px',
  transition: 'border-color 0.3s',
  boxSizing: 'border-box',
  backgroundColor: '#fff',
  color: '#333',
};

const errorStyle = {
  backgroundColor: '#ffebe6',
  color: '#c0392b',
  padding: '12px',
  borderRadius: '8px',
  marginBottom: '15px',
  fontSize: '13px',
  fontWeight: 'bold',
  border: '1px solid #ffcccc'
};

const buttonStyle = {
  width: '100%', padding: '12px', marginTop: '10px',
  backgroundColor: '#3d2b1f', color: '#fff', 
  border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold',
  transition: 'transform 0.2s, opacity 0.3s'
};

export default AuthLoginPage;