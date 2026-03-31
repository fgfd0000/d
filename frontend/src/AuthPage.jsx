import React from 'react';

// أضفنا { onLogin } هنا لكي تستقبل الصفحة الأوامر من App.js
const AuthPage = ({ onLogin }) => {
  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>لوجي كونكت</h2>
        <p style={{color: '#8b4513', marginBottom: '20px'}}>منصة الخدمات اللوجستية</p>
        
        <input type="text" placeholder="رقم الجوال" style={inputStyle} />
        <input type="password" placeholder="كلمة المرور" style={inputStyle} />
        
        {/* زر دخول مخصص للشركات */}
        <button 
          onClick={() => onLogin('company')} 
          style={buttonStyle}
        >
          دخول (لوحة الشركات)
        </button>

        {/* زر دخول مخصص للسائقين بلون خشبي فاتح لتمييزه */}
        <button 
          onClick={() => onLogin('driver')} 
          style={{...buttonStyle, backgroundColor: '#d2b48c', color: '#3d2b1f', marginTop: '10px'}}
        >
          دخول (لوحة السائقين)
        </button>
        
        <div style={{marginTop: '20px', fontSize: '12px', color: '#5d4037'}}>
          تصميم مستوحى من الطبيعة الخشبية لـ LogiConnect
        </div>
      </div>
    </div>
  );
};

// --- التنسيقات (تبقى كما هي لضمان التصميم الخشبي) ---
const containerStyle = {
  display: 'flex', justifyContent: 'center', alignItems: 'center', 
  height: '100vh', backgroundColor: '#ffffff', 
  direction: 'rtl'
};

const cardStyle = {
  padding: '40px', borderRadius: '15px', textAlign: 'center',
  backgroundColor: '#f5f5dc', 
  borderTop: '10px solid #d2b48c', 
  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
  width: '350px'
};

const titleStyle = { color: '#3d2b1f', fontSize: '28px', fontWeight: 'bold' };

const inputStyle = {
  width: '100%', padding: '12px', margin: '10px 0', 
  borderRadius: '8px', border: '1px solid #d2b48c', outline: 'none'
};

const buttonStyle = {
  width: '100%', padding: '12px', marginTop: '10px',
  backgroundColor: '#3d2b1f', color: '#fff', 
  border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'
};

export default AuthPage;