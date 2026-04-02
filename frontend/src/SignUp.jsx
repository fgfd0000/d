import React, { useState } from 'react';
import { authApi } from './api';
import { useAuth } from './AuthContext';

const SignUp = ({ onSignUpSuccess, onBackToLogin }) => {
  const { login } = useAuth();
  const [step, setStep] = useState(1); // 1: نوع المستخدم, 2: البيانات
  const [userType, setUserType] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '', // للشركات فقط
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validatePhoneFormat = (phone) => /^\d{9,}$/.test(phone);
  const validatePasswordFormat = (password) => password && password.length >= 6;
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateStep2 = () => {
    setError('');

    if (!formData.name.trim()) {
      setError('يرجى إدخال الاسم الشخصي');
      return false;
    }

    if (!formData.phone.trim()) {
      setError('يرجى إدخال رقم الجوال');
      return false;
    }

    if (!validatePhoneFormat(formData.phone)) {
      setError('رقم الجوال غير صحيح (يجب أن يكون 9 أرقام على الأقل)');
      return false;
    }

    if (!formData.email.trim()) {
      setError('يرجى إدخال البريد الإلكتروني');
      return false;
    }

    if (!validateEmail(formData.email)) {
      setError('البريد الإلكتروني غير صحيح');
      return false;
    }

    if (!formData.password.trim()) {
      setError('يرجى إدخال كلمة المرور');
      return false;
    }

    if (!validatePasswordFormat(formData.password)) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('كلمات المرور غير متطابقة');
      return false;
    }

    if (userType === 'company' && !formData.companyName.trim()) {
      setError('يرجى إدخال اسم الشركة');
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

      // استدعاء API التسجيل
      const response = await authApi.signUp(signUpData);

      if (response.token && response.user) {
        // حفظ في AuthContext
        login(response.user, response.token, userType);
        onSignUpSuccess(userType);
      } else {
        setError('حدث خطأ في التسجيل. حاول لاحقاً');
      }
    } catch (err) {
      setError(err.message || 'فشل التسجيل. تحقق من البيانات.');
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
    direction: 'rtl',
    padding: '20px',
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

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: '#5d4b3f',
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

  const typeButtonStyle = (selected) => ({
    flex: 1,
    padding: '15px',
    margin: '10px 5px',
    border: selected ? '2px solid #d2b48c' : '1px solid #d2b48c',
    borderRadius: '8px',
    backgroundColor: selected ? '#d2b48c' : 'transparent',
    color: selected ? '#3d2b1f' : '#8b4513',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s',
  });

  // Step 1: اختيار نوع المستخدم
  if (step === 1) {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h2 style={titleStyle}>🚛 لوجي كونكت</h2>
          <p style={subtitleStyle}>إنشاء حساب جديد</p>

          <h3 style={{ color: '#3d2b1f', marginBottom: '20px', fontSize: '16px' }}>
            ما نوع حسابك؟
          </h3>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '30px' }}>
            <button
              onClick={() => { setUserType('company'); setStep(2); setError(''); }}
              style={typeButtonStyle(false)}
            >
              🏢 شركة شحن
            </button>
            <button
              onClick={() => { setUserType('driver'); setStep(2); setError(''); }}
              style={typeButtonStyle(false)}
            >
              🚗 سائق
            </button>
          </div>

          <button onClick={onBackToLogin} style={{ ...buttonStyle, backgroundColor: '#8b4513' }}>
            العودة للدخول
          </button>
        </div>
      </div>
    );
  }

  // Step 2: ملء بيانات التسجيل
  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>
          {userType === 'company' ? '🏢 تسجيل شركة' : '🚗 تسجيل سائق'}
        </h2>
        <p style={subtitleStyle}>أنشئ حسابك الآن</p>

        {error && <div style={errorStyle}>{error}</div>}

        {/* اسم الشركة (للشركات فقط) */}
        {userType === 'company' && (
          <input
            type="text"
            placeholder="اسم الشركة"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            disabled={loading}
            style={inputStyle}
          />
        )}

        <input
          type="text"
          placeholder="الاسم الشخصي الكامل"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          disabled={loading}
          style={inputStyle}
        />

        <input
          type="tel"
          placeholder="رقم الجوال"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          disabled={loading}
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          disabled={loading}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="كلمة المرور"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          disabled={loading}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="تأكيد كلمة المرور"
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
          {loading ? '⏳ جاري التسجيل...' : 'إنشاء الحساب'}
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
          العودة
        </button>

        <div style={{ marginTop: '20px', fontSize: '12px', color: '#5d4037' }}>
          لديك حساب بالفعل؟{' '}
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
            تسجيل دخول
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
