import React, { useState, useEffect } from 'react';

const DriverDashboard = ({ onLogout }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // --- حالات الرحلة والمحفظة ---
  const [journeyStatus, setJourneyStatus] = useState('available'); // available, driving, arrived, completed
  const [walletBalance, setWalletBalance] = useState(0); 
  const [tripHistory, setTripHistory] = useState([]);

  // --- بيانات سوق الطلبات (Load Board) ---
  const [availableLoads, setAvailableLoads] = useState([
    { id: 'L-101', from: 'ميناء جدة الإسلامي', to: 'مستودع الرياض المركزي', cargo: 'مواد بناء', weight: '25 طن', distance: 950, price: 2500 },
    { id: 'L-102', from: 'الدمام', to: 'الجبيل', cargo: 'مواد كيميائية', weight: '15 طن', distance: 90, price: 400 },
    { id: 'L-103', from: 'الرياض', to: 'القصيم', cargo: 'مواد غذائية', weight: '20 طن', distance: 350, price: 900 }
  ]);
  const [activeLoad, setActiveLoad] = useState(null); // الشحنة التي تم قبولها

  // --- بيانات القيادة الحية ---
  const [distanceLeft, setDistanceLeft] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [podUploaded, setPodUploaded] = useState(false);

  // دالة حساب الوقت المتوقع (ETA) بناءً على 90 كم/س + ساعتين أمان
  const calculateETA = (dist) => {
    if (dist <= 0) return 0;
    const hours = (dist / 90) + 2; 
    return Math.max(0, hours).toFixed(1);
  };

  // محاكاة القيادة الحية (عداد السرعة وتقليل المسافة)
  useEffect(() => {
    let interval;
    if (journeyStatus === 'driving') {
      interval = setInterval(() => {
        const randomSpeed = Math.floor(Math.random() * (105 - 75 + 1)) + 75;
        setCurrentSpeed(randomSpeed);
        
        setDistanceLeft((prev) => {
          // تسريع المحاكاة لأغراض التجربة (نخصم 15 كم كل 3 ثوانٍ)
          const newDist = prev - 15; 
          if (newDist <= 0) {
            setJourneyStatus('arrived');
            setCurrentSpeed(0);
            return 0;
          }
          return newDist;
        });
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [journeyStatus]);

  // قبول الشحنة من سوق الطلبات
  const handleAcceptLoad = (load) => {
    setActiveLoad(load);
    setDistanceLeft(load.distance);
    setJourneyStatus('driving');
    setPodUploaded(false);
    
    // إزالة الطلب من السوق حتى لا يقبله سائق آخر
    setAvailableLoads(availableLoads.filter(l => l.id !== load.id));
  };

  // معالجة الوصول ورفع الـ POD
  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPodUploaded(true);
      
      // محاكاة إرسال الملف وإنهاء الرحلة
      setTimeout(() => {
        setJourneyStatus('completed');
        setWalletBalance(prev => prev + activeLoad.price); // إضافة الأرباح
        
        setTripHistory(prev => [{
            id: activeLoad.id,
            date: new Date().toLocaleDateString('ar-SA'),
            from: activeLoad.from,
            to: activeLoad.to,
            amount: activeLoad.price,
            status: 'مكتمل'
        }, ...prev]);
      }, 1500);
    }
  };

  // العودة لسوق الطلبات بعد الانتهاء
  const handleBackToMarket = () => {
    setJourneyStatus('available');
    setActiveLoad(null);
  };

  const styles = getThemeStyles(isDarkMode);

  return (
    <div style={styles.pageStyle}>
      {/* --- الشريط العلوي (الهيدر) --- */}
      <header style={styles.headerStyle}>
        <div style={styles.logoStyle}>LogiConnect 🚛</div>
        <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
          <button onClick={() => setIsDarkMode(!isDarkMode)} style={styles.themeToggleBtn}>
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <span>مرحباً، كابتن محمد</span>
          <button onClick={onLogout} style={styles.logoutBtn}>خروج</button>
        </div>
      </header>

      <main style={styles.container}>
        
        {/* --- المحفظة المالية للسائق --- */}
        <div style={styles.walletCard}>
           <div>
               <h3 style={{color: styles.textSecondary, margin: '0 0 5px 0'}}>إجمالي الأرباح</h3>
               <div style={{fontSize: '36px', fontWeight: 'bold', color: styles.accent}}>{walletBalance} <span style={{fontSize: '18px'}}>ر.س</span></div>
           </div>
           <button style={styles.withdrawBtn}>سحب الرصيد 💸</button>
        </div>

        {/* =========================================
            المرحلة 1: عرض الطلبات (Load Board)
        ========================================= */}
        {journeyStatus === 'available' && (
          <div style={styles.dashboardGrid}>
            <div>
                <h2 style={styles.headingStyle}>سوق الطلبات المتاحة 📦</h2>
                {availableLoads.length === 0 ? (
                  <p style={{color: styles.textSecondary}}>لا توجد طلبات متاحة حالياً. جرب التحديث لاحقاً.</p>
                ) : (
                  availableLoads.map((load) => (
                    <div key={load.id} style={styles.jobCard}>
                      <div style={styles.jobHeader}>
                        <span style={styles.priceTag}>{load.price} ريال</span>
                        <span style={{color: styles.textSecondary, fontSize: '12px'}}>مسافة: {load.distance} كم</span>
                      </div>
                      <div style={styles.tripDetails}>
                        <p><strong>📍 من:</strong> {load.from}</p>
                        <p><strong>🏁 إلى:</strong> {load.to}</p>
                        <p>📦 <strong>الحمولة:</strong> {load.weight} ({load.cargo})</p>
                      </div>
                      <button onClick={() => handleAcceptLoad(load)} style={styles.actionBtn}>
                        قبول الشحنة ✔️
                      </button>
                    </div>
                  ))
                )}
            </div>

            {/* سجل الرحلات المكتملة */}
            <div>
                 <h2 style={styles.headingStyle}>سجل رحلاتك 📜</h2>
                 <div style={styles.historyContainer}>
                     {tripHistory.length === 0 ? (
                       <p style={{color: styles.textSecondary, fontSize: '14px'}}>لم تقم بأي رحلة بعد.</p>
                     ) : (
                       tripHistory.map((trip, idx) => (
                         <div key={idx} style={styles.historyCard}>
                             <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                                 <strong>{trip.id}</strong>
                                 <span style={{color: styles.textSecondary}}>{trip.date}</span>
                             </div>
                             <p style={{fontSize: '14px'}}>🛣️ {trip.from} ➡️ {trip.to}</p>
                             <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '10px', alignItems: 'center'}}>
                                 <strong style={{color: '#27ae60'}}>+ {trip.amount} ر.س</strong>
                                 <span style={styles.statusBadge}>{trip.status}</span>
                             </div>
                         </div>
                       ))
                     )}
                 </div>
            </div>
          </div>
        )}

        {/* =========================================
            المرحلة 2 و 3: الملاحة وإثبات التسليم
        ========================================= */}
        {(journeyStatus === 'driving' || journeyStatus === 'arrived') && activeLoad && (
          <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
              <h2 style={styles.headingStyle}>الرحلة الحالية: {activeLoad.from} ⬅️ {activeLoad.to}</h2>
              {journeyStatus === 'driving' && (
                <button onClick={() => setJourneyStatus('arrived')} style={{...styles.actionBtn, width: 'auto', padding: '10px 20px', backgroundColor: '#27ae60', color: '#fff'}}>
                  تسجيل الوصول مبكراً 🏁
                </button>
              )}
            </div>

            <div style={styles.dashboardGrid}>
              
              {/* قسم الإجراءات (الخريطة أو رفع الملفات) */}
              <div style={styles.mainActionCard}>
                {journeyStatus === 'driving' ? (
                  <>
                    <h3 style={{color: styles.textMain, textAlign: 'center'}}>جارٍ التوجه للوجهة... 🚚</h3>
                    <div style={{...styles.mapContainer, marginTop: '20px', height: '250px'}}>
                        <iframe src="https://maps.google.com/maps?q=Jeddah,Al%20Khumra&t=&z=13&ie=UTF8&iwloc=&output=embed6" width="100%" height="100%" style={{border:0, borderRadius: '8px'}} allowFullScreen></iframe>
                    </div>
                  </>
                ) : (
                  <div style={styles.uploadSection}>
                    <h2 style={{color: '#27ae60', marginBottom: '10px'}}>تم الوصول بنجاح! 🏁</h2>
                    <p style={{marginBottom: '20px', color: styles.textSecondary}}>يرجى رفع بوليصة الاستلام (POD) موقعة من المستودع لإضافة <strong>{activeLoad.price} ر.س</strong> لمحفظتك.</p>
                    <label style={styles.uploadBtn}>
                      📎 إرفاق ملف / صورة الإثبات
                      <input type="file" accept="image/*,.pdf" style={{display: 'none'}} onChange={handleFileUpload} />
                    </label>
                  </div>
                )}
              </div>

              {/* العدادات الحية */}
              <div style={styles.statsContainer}>
                {/* عداد السرعة */}
                <div style={{...styles.statCard, border: currentSpeed > 90 ? '2px solid #e74c3c' : styles.statCard.border}}>
                  <div style={styles.statLabel}>السرعة الحالية</div>
                  <div style={{...styles.statValue, color: currentSpeed > 90 ? '#e74c3c' : styles.textMain}}>
                    {currentSpeed} <span style={{fontSize: '14px'}}>كم/س</span>
                  </div>
                  {currentSpeed > 90 && (
                    <div style={styles.warningAlert}>⚠️ تحذير: تجاوزت السرعة المحددة (90 كم/س)</div>
                  )}
                </div>

                {/* المسافة */}
                <div style={styles.statCard}>
                  <div style={styles.statLabel}>المسافة المتبقية</div>
                  <div style={styles.statValue}>{distanceLeft} <span style={{fontSize: '14px'}}>كم</span></div>
                </div>

                {/* الوقت المتوقع */}
                <div style={styles.statCard}>
                  <div style={styles.statLabel}>الوقت المتوقع (ETA)</div>
                  <div style={styles.statValue}>{calculateETA(distanceLeft)} <span style={{fontSize: '14px'}}>ساعة</span></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================
            المرحلة 4: شاشة الدفع والنجاح
        ========================================= */}
        {journeyStatus === 'completed' && (
          <div style={{...styles.jobCard, textAlign: 'center', margin: '0 auto', padding: '40px 20px', maxWidth: '600px'}}>
            <h1 style={{fontSize: '64px', margin: '0 0 20px 0'}}>✅</h1>
            <h2 style={{color: '#27ae60', marginBottom: '15px'}}>تم استلام الشحنة وتوثيقها!</h2>
            <p style={{color: styles.textSecondary, marginBottom: '25px', fontSize: '18px'}}>
              تم إضافة <strong>{activeLoad?.price} ر.س</strong> إلى محفظتك بنجاح.
            </p>
            <button onClick={handleBackToMarket} style={styles.actionBtn}>
              البحث عن شحنات جديدة 🔍
            </button>
          </div>
        )}

      </main>
    </div>
  );
};

// --- التنسيقات (Aesthetic Wood Theme) ---
const getThemeStyles = (isDark) => {
  const colors = {
    bgPage: isDark ? '#121212' : '#f9f9f9',
    bgHeader: isDark ? '#1a110a' : '#3d2b1f',
    bgCard: isDark ? '#282828' : '#fff',
    bgCardAccent: isDark ? '#332a22' : '#f5f5dc',
    textMain: isDark ? '#ffffff' : '#3d2b1f',
    textSecondary: isDark ? '#cccccc' : '#555',
    accent: '#d2b48c',
    border: isDark ? '#444' : '#e0e0e0',
  };

  return {
    pageStyle: { minHeight: '100vh', backgroundColor: colors.bgPage, direction: 'rtl', fontFamily: 'Arial', color: colors.textMain, transition: 'all 0.3s' },
    headerStyle: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px', backgroundColor: colors.bgHeader, color: colors.accent, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
    logoStyle: { fontSize: '22px', fontWeight: 'bold' },
    themeToggleBtn: { backgroundColor: 'transparent', border: `1px solid ${colors.accent}`, borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' },
    logoutBtn: { backgroundColor: 'transparent', color: '#ffb3b3', border: '1px solid #ffb3b3', padding: '5px 15px', borderRadius: '5px', cursor: 'pointer' },
    
    container: { padding: '30px', maxWidth: '1200px', margin: '0 auto' },
    headingStyle: { color: colors.textMain, marginBottom: '20px' },
    
    walletCard: { backgroundColor: colors.bgHeader, color: '#fff', padding: '25px 30px', borderRadius: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', boxShadow: '0 8px 15px rgba(0,0,0,0.1)' },
    withdrawBtn: { backgroundColor: colors.accent, color: '#3d2b1f', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },

    jobCard: { backgroundColor: colors.bgCardAccent, border: `2px solid ${colors.accent}`, borderRadius: '15px', padding: '25px', width: '100%', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '20px', transition: 'transform 0.2s' },
    jobHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '15px', alignItems: 'center' },
    priceTag: { backgroundColor: colors.bgHeader, color: colors.accent, padding: '8px 15px', borderRadius: '10px', fontWeight: 'bold', fontSize: '18px' },
    statusBadge: { color: '#27ae60', fontWeight: 'bold', backgroundColor: 'rgba(39, 174, 96, 0.1)', padding: '5px 10px', borderRadius: '5px', fontSize: '12px' },
    tripDetails: { lineHeight: '1.8', color: colors.textSecondary, marginBottom: '20px', backgroundColor: colors.bgCard, padding: '15px', borderRadius: '8px', border: `1px solid ${colors.border}` },
    mapContainer: { backgroundColor: '#e0e0e0', borderRadius: '8px', overflow: 'hidden', border: `1px solid ${colors.border}` },

    historyContainer: { display: 'flex', flexDirection: 'column', gap: '15px' },
    historyCard: { backgroundColor: colors.bgCard, padding: '15px 20px', borderRadius: '10px', border: `1px solid ${colors.border}` },

    actionBtn: { width: '100%', padding: '15px', backgroundColor: colors.accent, color: '#3d2b1f', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', transition: '0.2s', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' },
    
    dashboardGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px', marginTop: '10px' },
    mainActionCard: { backgroundColor: colors.bgCard, padding: '30px', borderRadius: '15px', border: `1px solid ${colors.border}`, display: 'flex', flexDirection: 'column', justifyContent: 'center' },
    statsContainer: { display: 'flex', flexDirection: 'column', gap: '15px' },
    statCard: { backgroundColor: colors.bgCardAccent, padding: '20px', borderRadius: '12px', border: `1px solid ${colors.border}`, display: 'flex', flexDirection: 'column', gap: '10px' },
    statLabel: { fontSize: '14px', color: colors.textSecondary, fontWeight: 'bold' },
    statValue: { fontSize: '32px', fontWeight: 'bold', color: colors.textMain },
    
    warningAlert: { marginTop: '10px', padding: '10px', backgroundColor: '#ffebe6', color: '#c0392b', borderRadius: '5px', fontSize: '13px', fontWeight: 'bold', border: '1px solid #ffcccc' },
    uploadSection: { textAlign: 'center', padding: '30px 20px', backgroundColor: colors.bgPage, borderRadius: '8px', border: `2px dashed ${colors.accent}` },
    uploadBtn: { display: 'inline-block', padding: '15px 30px', backgroundColor: colors.bgHeader, color: colors.accent, borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', marginTop: '10px' },
  };
};

export default DriverDashboard;