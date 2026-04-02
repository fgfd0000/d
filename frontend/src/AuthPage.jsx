import React, { useState } from 'react';
import { authApi } from './api';
import { useAuth } from './AuthContext';

const AuthLoginPage = ({ onLogin, onGoToSignUp }) => {
  const { login } = useAuth();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    setError('');
    
    if (!phone.trim()) {
      setError('يرجى إدخال رقم الجوال');
      return false;
    }
    if (!/^\d{9,}$/.test(phone)) {
      setError('رقم الجوال غير صحيح');
      return false;
    }
    if (!password.trim()) {
      setError('يرجى إدخال كلمة المرور');
      return false;
    }
    if (password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
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
        setError('خطأ في الاستجابة. حاول لاحقاً');
      }
    } catch (err) {
      setError(err.message || 'فشل الدخول. تحقق من البيانات.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>🚛 لوجي كونكت</h2>
        <p style={{color: '#8b4513', marginBottom: '25px', fontSize: '14px'}}>منصة الخدمات اللوجستية</p>
        
        {error && <div style={errorStyle}>{error}</div>}
        
        <input 
          type="tel" 
          placeholder="رقم الجوال" 
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={loading}
          style={inputStyle} 
        />
        <input 
          type="password" 
          placeholder="كلمة المرور" 
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
          {loading ? '⏳ جاري الدخول...' : 'دخول (لوحة الشركات)'}
        </button>

        <button 
          onClick={() => handleLogin('driver')}
          disabled={loading}
          style={{...buttonStyle, backgroundColor: '#d2b48c', color: '#3d2b1f', marginTop: '10px', opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer'}}
        >
          {loading ? '⏳ جاري الدخول...' : 'دخول (لوحة السائقين)'}
        </button>
        
        <button 
          onClick={onGoToSignUp}
          disabled={loading}
          style={{...buttonStyle, backgroundColor: '#8b4513', marginTop: '15px', opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer'}}
        >
          ✨ إنشاء حساب جديد
        </button>

        <div style={{marginTop: '25px', fontSize: '11px', color: '#5d4037', lineHeight: '1.6'}}>
          <p style={{margin: '0 0 8px 0'}}>بيانات اختبار:</p>
          <p style={{margin: '3px 0'}}>📱 الجوال: <code style={{backgroundColor: '#f0f0f0', padding: '2px 4px'}}>500000000</code></p>
          <p style={{margin: '3px 0'}}>🔐 المرور: <code style={{backgroundColor: '#f0f0f0', padding: '2px 4px'}}>123456</code></p>
        </div>
      </div>
    </div>
  );
};

const containerStyle = {
  display: 'flex', justifyContent: 'center', alignItems: 'center', 
  minHeight: '100vh', backgroundColor: '#ffffff', 
  direction: 'rtl',
  padding: '20px'
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
  boxSizing: 'border-box'
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