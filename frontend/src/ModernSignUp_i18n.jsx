import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from './ThemeProvider';
import { Button, Input, Alert } from './components';
import { spacing, borderRadius, shadows, transitions } from './theme';
import { useAuth } from './AuthContext';
import { authApi } from './api';

const ModernSignUp = ({ onSignUpSuccess, onBackToLogin }) => {
  const { theme } = useTheme();
  const { login } = useAuth();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [apiSuccess, setApiSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
  });
  const [errors, setErrors] = useState({});

  const handleUserTypeSelect = (type) => {
    setUserType(type);
    setStep(2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = t('nameRequired');
    if (!formData.phone.trim()) newErrors.phone = t('phoneRequired');
    if (!formData.email.trim()) newErrors.email = t('emailRequired');
    if (!formData.email.includes('@')) newErrors.email = t('emailInvalid');
    if (!formData.password) newErrors.password = t('passwordRequired');
    if (formData.password.length < 6) newErrors.password = t('passwordTooShort');
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = t('passwordsNotMatch');
    if (userType === 'company' && !formData.companyName.trim()) newErrors.companyName = t('companyNameRequired');
    return newErrors;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setApiError('');
    setApiSuccess('');

    const newErrors = validateStep2();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const signupPayload = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        userType,
        ...(userType === 'company' && { companyName: formData.companyName }),
      };

      const response = await authApi.signUp(signupPayload);

      if (response.success) {
        await login(response.user, response.token);
        setApiSuccess(t('successSignup'));
        setTimeout(() => {
          onSignUpSuccess(userType);
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
      <div style={{ width: '100%', maxWidth: '450px' }}>
        {/* Header */}
        <div style={{ marginBottom: spacing[8] }}>
          <button
            onClick={onBackToLogin}
            style={{
              background: 'none',
              border: 'none',
              color: theme.primary,
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: spacing[4],
              transition: transitions.fast,
              display: 'flex',
              alignItems: 'center',
              gap: spacing[1],
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.7';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            {isRTL ? '→' : '←'} {t('backToLogin')}
          </button>

          <h1 style={{
            margin: 0,
            fontSize: '32px',
            fontWeight: 700,
            color: theme.text.primary,
          }}>
            {t('signupTitle')}
          </h1>
          <p style={{
            margin: `${spacing[2]} 0 0 0`,
            color: theme.text.secondary,
            fontSize: '14px',
          }}>
            {t('signupSubtitle')}
          </p>
        </div>

        {/* Step 1: User Type Selection */}
        {step === 1 && (
          <div style={{
            background: theme.background.secondary,
            border: `1px solid ${theme.border.light}`,
            borderRadius: borderRadius.xl,
            padding: spacing[6],
            boxShadow: shadows.lg,
          }}>
            <h2 style={{
              margin: `0 0 ${spacing[6]} 0`,
              fontSize: '18px',
              fontWeight: 600,
              color: theme.text.primary,
            }}>
              {t('selectAccountType')}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
              {/* Company Card */}
              <button
                onClick={() => handleUserTypeSelect('company')}
                style={{
                  background: theme.background.tertiary,
                  border: `2px solid ${theme.border.light}`,
                  borderRadius: borderRadius.lg,
                  padding: spacing[6],
                  cursor: 'pointer',
                  transition: transitions.base,
                  textAlign: isRTL ? 'right' : 'left',
                  color: theme.text.primary,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = theme.primary;
                  e.currentTarget.style.background = `${theme.primary}15`;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = theme.border.light;
                  e.currentTarget.style.background = theme.background.tertiary;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: spacing[3] }}>🏢</div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, marginBottom: spacing[1] }}>
                  {t('companyAccount')}
                </h3>
                <p style={{
                  margin: 0,
                  fontSize: '12px',
                  color: theme.text.secondary,
                  lineHeight: 1.5,
                }}>
                  {t('companyAccountDesc')}
                </p>
              </button>

              {/* Driver Card */}
              <button
                onClick={() => handleUserTypeSelect('driver')}
                style={{
                  background: theme.background.tertiary,
                  border: `2px solid ${theme.border.light}`,
                  borderRadius: borderRadius.lg,
                  padding: spacing[6],
                  cursor: 'pointer',
                  transition: transitions.base,
                  textAlign: isRTL ? 'right' : 'left',
                  color: theme.text.primary,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = theme.primary;
                  e.currentTarget.style.background = `${theme.primary}15`;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = theme.border.light;
                  e.currentTarget.style.background = theme.background.tertiary;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: spacing[3] }}>🚗</div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, marginBottom: spacing[1] }}>
                  {t('driverAccount')}
                </h3>
                <p style={{
                  margin: 0,
                  fontSize: '12px',
                  color: theme.text.secondary,
                  lineHeight: 1.5,
                }}>
                  {t('driverAccountDesc')}
                </p>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Registration Form */}
        {step === 2 && (
          <form onSubmit={handleSignUp} style={{
            background: theme.background.secondary,
            border: `1px solid ${theme.border.light}`,
            borderRadius: borderRadius.xl,
            padding: spacing[6],
            boxShadow: shadows.lg,
          }}>
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

            <h2 style={{
              margin: `0 0 ${spacing[6]} 0`,
              fontSize: '18px',
              fontWeight: 600,
              color: theme.text.primary,
            }}>
              {userType === 'company' ? t('companyInfo') : t('driverInfo')}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
              {userType === 'company' && (
                <Input
                  label={t('companyName')}
                  name="companyName"
                  placeholder={t('companyNameExample')}
                  value={formData.companyName}
                  onChange={handleChange}
                  error={!!errors.companyName}
                  errorMessage={errors.companyName}
                />
              )}

              <Input
                label={userType === 'company' ? t('name') : t('name')}
                name="name"
                placeholder={t('nameExample')}
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                errorMessage={errors.name}
              />

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
                label={t('email')}
                name="email"
                type="email"
                placeholder={t('emailExample')}
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                errorMessage={errors.email}
              />

              <Input
                label={t('password')}
                name="password"
                type="password"
                placeholder={t('passwordPlaceholder')}
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                errorMessage={errors.password}
              />

              <Input
                label={t('confirmPassword')}
                name="confirmPassword"
                type="password"
                placeholder={t('confirmPasswordPlaceholder')}
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                errorMessage={errors.confirmPassword}
              />

              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing[2],
                cursor: 'pointer',
                fontSize: '12px',
                color: theme.text.secondary,
              }}>
                <input type="checkbox" required style={{ cursor: 'pointer' }} />
                {t('agreeTerms')} <a href="#" style={{ color: theme.primary, textDecoration: 'none' }}>{t('termsOfService')}</a> {t('and')} <a href="#" style={{ color: theme.primary, textDecoration: 'none' }}>{t('privacyPolicy')}</a>
              </label>

              <Button
                type="submit"
                disabled={loading}
                loading={loading}
                style={{ width: '100%' }}
              >
                {loading ? t('loading') : t('signup')}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ModernSignUp;
