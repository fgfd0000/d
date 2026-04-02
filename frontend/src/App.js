import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuthPage from './AuthPage';
import SignUp from './SignUp';
import CompanyDashboard from './CompanyDashboard';
import DriverDashboard from './DriverDashboard';

function App() {
  const { i18n } = useTranslation();
  const [currentPage, setCurrentPage] = useState('login');

  const navigateTo = (pageName) => {
    setCurrentPage(pageName);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  return (
    <div className="App">
      {currentPage === 'login' && (
        <AuthPage
          onLogin={navigateTo}
          onGoToSignUp={() => navigateTo('signup')}
          onToggleLanguage={toggleLanguage}
          currentLang={i18n.language}
        />
      )}

      {currentPage === 'signup' && (
        <SignUp
          onSignUpSuccess={navigateTo}
          onBackToLogin={() => navigateTo('login')}
          onToggleLanguage={toggleLanguage}
          currentLang={i18n.language}
        />
      )}

      {currentPage === 'company' && (
        <CompanyDashboard
          onLogout={() => navigateTo('login')}
          onToggleLanguage={toggleLanguage}
          currentLang={i18n.language}
        />
      )}

      {currentPage === 'driver' && (
        <DriverDashboard
          onLogout={() => navigateTo('login')}
          onToggleLanguage={toggleLanguage}
          currentLang={i18n.language}
        />
      )}
    </div>
  );
}

export default App;