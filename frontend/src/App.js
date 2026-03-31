import React, { useState } from 'react';
import AuthPage from './AuthPage';
import CompanyDashboard from './CompanyDashboard';
import DriverDashboard from './DriverDashboard';

function App() {
  // الحالة الافتراضية هي 'login' (صفحة الدخول)
  const [currentPage, setCurrentPage] = useState('login');

  // هذه الوظيفة هي التي ستقوم بتغيير الصفحات
  const navigateTo = (pageName) => {
    setCurrentPage(pageName);
  };

  return (
    <div className="App">
      {/* هنا يقرر النظام أي صفحة يعرض بناءً على قيمة currentPage */}
      
      {currentPage === 'login' && <AuthPage onLogin={navigateTo} />}
      
      {currentPage === 'company' && <CompanyDashboard onLogout={() => navigateTo('login')} />}
      
      {currentPage === 'driver' && <DriverDashboard onLogout={() => navigateTo('login')} />}
    </div>
  );
}

export default App;