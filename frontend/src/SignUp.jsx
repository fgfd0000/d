import React, { useState } from 'react';
import { authApi } from './api';
import { useAuth } from './AuthContext';

const SignUp = ({ onSignUpSuccess, onBackToLogin, onToggleLanguage, currentLang }) => {
  const { login } = useAuth();
  const isArabic = currentLang === 'ar';
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validatePhoneFormat = (phone) => /^\d{9,}$/.test(phone);
  const validatePasswordFormat = (password) => password && password.length >= 6;
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateStep2 = () => {
    setError('');

    if (!formData.name.trim()) {
      setError(isArabic ? 'يرجى إدخال الاسم الشخصي' : 'Please enter your full name');
      return false;
    }
    if (!formData.phone.trim()) {
      setError(isArabic ? 'يرجى إدخال رقم الجوال' : 'Please enter phone number');
      return false;
    }
    if (!validatePhoneFormat(formData.phone)) {
      setError(isArabic ? 'رقم الجوال غير صحيح (يجب أن يكون 9 أرقام على الأقل)' : 'Phone number is invalid (minimum 9 digits)');
      return false;
    }
    if (!formData.email.trim()) {
      setError(isArabic ? 'يرجى إدخال البريد الإلكتروني' : 'Please enter email address');
      return false;
    }
    if (!validateEmail(formData.email)) {
      setError(isArabic ? 'البريد الإلكتروني غير صحيح' : 'Email address is invalid');
      return false;
    }
    if (!formData.password.trim()) {
      setError(isArabic ? 'يرجى إدخال كلمة المرور' : 'Please enter password');
      return false;
    }
    if (!validatePasswordFormat(formData.password)) {
      setError(isArabic ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError(isArabic ? 'كلمات المرور غير متطابقة' : 'Passwords do not match');
      return false;
    }
    if (userType === 'company' && !formData.companyName.trim()) {
      setError(isArabic ? 'يرجى إدخال اسم الشركة' : 'Please enter company name');
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validateStep2()) return;

    setLoading(true);

    try {
      const signUpData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        userType,
      };

      if (userType === 'company') {
        signUpData.companyName = formData.companyName;
      }

      const response = await authApi.signUp(signUpData);

      if (response.token && response.user) {
        login(response.user, response.token, userType);
        onSignUpSuccess(userType);
      } else {
        setError(isArabic ? 'حدث خطأ في التسجيل. حاول لاحقاً' : 'Registration error. Try again later.');
      }
    } catch (err) {
      setError(err.message || (isArabic ? 'فشل التسجيل. تحقق من البيانات.' : 'Registration failed. Check your data.'));
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    direction: isArabic ? 'rtl' : 'ltr',
    padding: '20px',
    position: 'relative',
  };

  const cardStyle = {
    padding: '40px',
    borderRadius: '15px',
    textAlign: 'center',
    backgroundColor: '#f5f5dc',
    borderTop: '10px solid #d2b48c',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '450px',
  };

  const titleStyle = {
    color: '#3d2b1f',
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const subtitleStyle = {
    color: '#8b4513',
    fontSize: '14px',
    marginBottom: '30px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    backgroundColor: '#3d2b1f',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
    transition: 'all 0.3s',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    borderRadius: '8px',
    border: '1px solid #d2b48c',
    outline: 'none',
    fontSize: '14px',
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
    border: '1px solid #ffcccc',
  };

  const typeCardStyle = (selected) => ({
    flex: 1,
    padding: '20px 15px',
    margin: '5px',
    border: selected ? '2px solid #3d2b1f' : '1px solid #d2b48c',
    borderRadius: '12px',
    backgroundColor: selected ? '#d2b48c' : '#fff',
    color: selected ? '#3d2b1f' : '#8b4513',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s',
    fontSize: '15px',
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

  // Step 1: Account type selection
  if (step === 1) {
    return (
      <div style={containerStyle}>
        <button onClick={onToggleLanguage} style={langSwitcherStyle}>
          {isArabic ? 'EN' : 'عربي'}
        </button>
        <div style={cardStyle}>
          <h2 style={titleStyle}>🚛 {isArabic ? 'لوجي كونكت' : 'LogiConnect'}</h2>
          <p style={subtitleStyle}>{isArabic ? 'إنشاء حساب جديد' : 'Create New Account'}</p>

          <h3 style={{ color: '#3d2b1f', marginBottom: '20px', fontSize: '16px' }}>
            {isArabic ? 'ما نوع حسابك؟' : 'What type of account?'}
          </h3>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '30px' }}>
            <button
              onClick={() => { setUserType('company'); setStep(2); setError(''); }}
              style={typeCardStyle(false)}
            >
              🏢<br/>
              <span style={{fontSize: '14px'}}>{isArabic ? 'شركة شحن' : 'Company'}</span><br/>
              <span style={{fontSize: '11px', fontWeight: 'normal', opacity: 0.8}}>
                {isArabic ? 'إدارة الشحنات والمستودعات' : 'Manage shipments & warehouses'}
              </span>
            </button>
            <button
              onClick={() => { setUserType('driver'); setStep(2); setError(''); }}
              style={typeCardStyle(false)}
            >
              🚗<br/>
              <span style={{fontSize: '14px'}}>{isArabic ? 'سائق' : 'Driver'}</span><br/>
              <span style={{fontSize: '11px', fontWeight: 'normal', opacity: 0.8}}>
                {isArabic ? 'قبول الرحلات وإدارة الأرباح' : 'Accept trips & manage earnings'}
              </span>
            </button>
          </div>

          <button onClick={onBackToLogin} style={{ ...buttonStyle, backgroundColor: '#8b4513' }}>
            {isArabic ? 'العودة للدخول' : 'Back to Sign In'}
          </button>
        </div>
      </div>
    );
  }

  // Step 2: Registration form
  return (
    <div style={containerStyle}>
      <button onClick={onToggleLanguage} style={langSwitcherStyle}>
        {isArabic ? 'EN' : 'عربي'}
      </button>
      <div style={cardStyle}>
        <h2 style={titleStyle}>
          {userType === 'company'
            ? (isArabic ? '🏢 تسجيل شركة' : '🏢 Company Registration')
            : (isArabic ? '🚗 تسجيل سائق' : '🚗 Driver Registration')}
        </h2>
        <p style={subtitleStyle}>{isArabic ? 'أنشئ حسابك الآن' : 'Create your account now'}</p>

        {error && <div style={errorStyle}>{error}</div>}

        {userType === 'company' && (
          <input
            type="text"
            placeholder={isArabic ? 'اسم الشركة' : 'Company Name'}
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            disabled={loading}
            style={inputStyle}
          />
        )}

        <input
          type="text"
          placeholder={isArabic ? 'الاسم الشخصي الكامل' : 'Full Name'}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          disabled={loading}
          style={inputStyle}
        />

        <input
          type="tel"
          placeholder={isArabic ? 'رقم الجوال' : 'Phone Number'}
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          disabled={loading}
          style={inputStyle}
        />

        <input
          type="email"
          placeholder={isArabic ? 'البريد الإلكتروني' : 'Email Address'}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          disabled={loading}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder={isArabic ? 'كلمة المرور (6 أحرف على الأقل)' : 'Password (min 6 characters)'}
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          disabled={loading}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder={isArabic ? 'تأكيد كلمة المرور' : 'Confirm Password'}
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          disabled={loading}
          style={inputStyle}
        />

        <button
          onClick={handleSignUp}
          disabled={loading}
          style={{
            ...buttonStyle,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading
            ? (isArabic ? '⏳ جاري التسجيل...' : '⏳ Creating account...')
            : (isArabic ? 'إنشاء الحساب' : 'Create Account')}
        </button>

        <button
          onClick={() => { setStep(1); setError(''); }}
          disabled={loading}
          style={{
            ...buttonStyle,
            backgroundColor: '#8b4513',
            marginTop: '15px',
            opacity: loading ? 0.6 : 1,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {isArabic ? 'العودة' : 'Back'}
        </button>

        <div style={{ marginTop: '20px', fontSize: '12px', color: '#5d4037' }}>
          {isArabic ? 'لديك حساب بالفعل؟' : 'Already have an account?'}{' '}
          <button
            onClick={onBackToLogin}
            style={{
              background: 'none',
              border: 'none',
              color: '#d2b48c',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontSize: '12px',
            }}
          >
            {isArabic ? 'تسجيل دخول' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
