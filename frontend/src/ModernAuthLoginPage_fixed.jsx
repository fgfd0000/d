import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from './ThemeProvider';
import { Button, Input, Alert } from './components';
import { spacing, borderRadius, shadows, transitions } from './theme';
import { useAuth } from './AuthContext';
import { authApi } from './api';

const ModernAuthLoginPage = ({ onLogin, onGoToSignUp }) => {
  const { theme } = useTheme();
  const { login } = useAuth();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const [formData, setFormData] = useState({ phone: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [apiSuccess, setApiSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.phone.trim()) {
      newErrors.phone = t('phoneRequired');
    }
    if (!formData.password) {
      newErrors.password = t('passwordRequired');
    }
    return newErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setApiError('');
    setApiSuccess('');

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await authApi.login(formData.phone, formData.password);
      
      if (response.success) {
        await login(response.user, response.token);
        setApiSuccess(t('successLogin'));
        setTimeout(() => {
          onLogin(response.user.userType);
        }, 500);
      } else {
        setApiError(response.message || t('errorSomethingWrong'));
      }
    } catch (error) {
      setApiError(error.message || t('errorSomethingWrong'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: theme.background.primary,
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: spacing[4],
      direction: isRTL ? 'rtl' : 'ltr',
      fontFamily: '"Segoe UI", Roboto, sans-serif',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
      }}>
        {/* Logo Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: spacing[8],
        }}>
          <div style={{
            fontSize: '64px',
            marginBottom: spacing[4],
          }}>
            🚚
          </div>
          <h1 style={{
            margin: 0,
            fontSize: '32px',
            fontWeight: 700,
            color: theme.primary,
            marginBottom: spacing[2],
          }}>
            {t('appName')}
          </h1>
          <p style={{
            margin: 0,
            color: theme.text.secondary,
            fontSize: '14px',
          }}>
            {t('appSlogan')}
          </p>
        </div>

        {/* Login Form Card */}
        <div style={{
          background: theme.background.secondary,
          border: `1px solid ${theme.border.light}`,
          borderRadius: borderRadius.xl,
          padding: spacing[6],
          boxShadow: shadows.lg,
        }}>
          <h2 style={{
            margin: `0 0 ${spacing[6]} 0`,
            fontSize: '24px',
            fontWeight: 600,
            color: theme.text.primary,
            textAlign: 'center',
          }}>
            {t('loginTitle')}
          </h2>
          <p style={{
            margin: `0 0 ${spacing[6]} 0`,
            fontSize: '14px',
            color: theme.text.secondary,
            textAlign: 'center',
          }}>
            {t('loginSubtitle')}
          </p>

          {/* Alerts */}
          {apiError && (
            <Alert
              type="error"
              message={apiError}
              onClose={() => setApiError('')}
              style={{ marginBottom: spacing[4] }}
            />
          )}
          {apiSuccess && (
            <Alert
              type="success"
              message={apiSuccess}
              style={{ marginBottom: spacing[4] }}
            />
          )}

          {/* Form */}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
            <Input
              label={t('phone')}
              name="phone"
              type="tel"
              placeholder={t('phoneExample')}
              value={formData.phone}
              onChange={handleChange}
              error={!!errors.phone}
              errorMessage={errors.phone}
            />

            <Input
              label={t('password')}
              name="password"
              type="password"
              placeholder={t('password')}
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              errorMessage={errors.password}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: spacing[1], cursor: 'pointer', color: theme.text.secondary }}>
                <input type="checkbox" style={{ cursor: 'pointer' }} />
                {t('rememberMe')}
              </label>
              <a href="#" style={{ color: theme.primary, textDecoration: 'none', transition: transitions.fast }} 
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                {t('forgotPassword')}
              </a>
            </div>

            <Button
              type="submit"
              disabled={loading}
              loading={loading}
              style={{ width: '100%', marginTop: spacing[2] }}
            >
              {loading ? t('loginButtonLoading') : t('loginButton')}
            </Button>
          </form>

          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: spacing[3],
            margin: `${spacing[6]} 0`,
            opacity: 0.5,
          }}>
            <div style={{ flex: 1, height: '1px', background: theme.border.light }} />
            <span style={{ fontSize: '12px', color: theme.text.secondary }}>أو</span>
            <div style={{ flex: 1, height: '1px', background: theme.border.light }} />
          </div>

          {/* Social Login (Placeholder) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing[3], marginBottom: spacing[6] }}>
            <Button variant="secondary" size="sm">
              Google
            </Button>
            <Button variant="secondary" size="sm">
              Apple
            </Button>
          </div>

          {/* Sign Up Link */}
          <p style={{
            margin: 0,
            textAlign: 'center',
            fontSize: '14px',
            color: theme.text.secondary,
          }}>
            {t('noAccount')} {' '}
            <button
              onClick={onGoToSignUp}
              style={{
                background: 'none',
                border: 'none',
                color: theme.primary,
                cursor: 'pointer',
                fontWeight: 600,
                textDecoration: 'none',
                transition: transitions.fast,
              }}
              onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
              onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
            >
              {t('createNewAccount')}
            </button>
          </p>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          marginTop: spacing[8],
          fontSize: '12px',
          color: theme.text.tertiary,
        }}>
          <p style={{ margin: 0, lineHeight: 1.6 }}>
            {t('by_signing_in')} {' '}
            <a href="#" style={{ color: theme.primary, textDecoration: 'none' }}>
              {t('termsOfService')}
            </a>
            {' '} و {' '}
            <a href="#" style={{ color: theme.primary, textDecoration: 'none' }}>
              {t('privacyPolicy')}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModernAuthLoginPage;
