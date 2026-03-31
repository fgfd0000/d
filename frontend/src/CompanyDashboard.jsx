import React, { useState } from 'react';

const CompanyDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  // حالة الوضع الليلي
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 1. بيانات المستودعات
  const [warehouses, setWarehouses] = useState([
    { id: 1, name: 'مستودع الخمرة المركزي', city: 'جدة', mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3715.467433!2d39.21!3d21.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDIxJzAwLjAiTiAzOcKwMTInMzYuMCJF!5e0!3m2!1sar!2ssa!4v1625000000000' },
    { id: 2, name: 'مخازن الكويت - الشويخ', city: 'الكويت', mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111224.23!2d47.9!3d29.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDE4JzAwLjAiTiA0N8KwNTQnMDAuMCJF!5e0!3m2!1sar!2skw!4v1625000000000' }
  ]);

  const handleAddWarehouse = () => {
    const newId = Date.now();
    setWarehouses([...warehouses, {
      id: newId, name: `مستودع جديد #${newId.toString().slice(-3)}`, city: 'قيد التحديد',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.0!2d46.7!3d24.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzAwLjAiTiA0Niw0MicwMC4wIkU!5e0!3m2!1sar!2ssa!4v1625000000000'
    }]);
  };

  // --- دالة حساب الوقت والمسافة (Logic) ---
  const calculateETA = (dist) => {
    const speed = 90;
    const hours = (dist / speed) + 2;
    return Math.round(hours);
  };

  // 2. بيانات الشاحنات المتوفرة
  const availableTrucks = [
    {
      id: 101, type: 'شركة شحن', companyName: 'شركة الرائدة للنقل',
      driverName: 'محمود عبدالسلام', nationality: 'مصري',
      truckType: 'تريلا (سطحة)', plate: 'س ص ع 1234',
      capacity: '25 طن', distance: 1250,
    },
    {
      id: 102, type: 'أفراد', companyName: 'سائق مستقل',
      driverName: 'سالم الدوسري', nationality: 'سعودي',
      truckType: 'براد (ثلاجة)', plate: 'أ ب ت 9876',
      capacity: '20 طن', distance: 950,
    }
  ];

  // 3. بيانات التتبع الحي
  const [activeOrders] = useState([
    {
      id: "LOGI-2026-01",
      driver: "سالم الدوسري",
      totalDist: 1250,
      coveredDist: 800,
      from: "مرسى جدة",
      to: "مخازن الكويت",
      status: "في الطريق (القصيم)",
      plate: "أ ب ت 9876"
    }
  ]);

  // استدعاء التنسيقات بناءً على الوضع الحالي
  const styles = getThemeStyles(isDarkMode);

  return (
    <div style={styles.pageStyle}>
      {/* القائمة الجانبية */}
      <aside style={styles.sidebarStyle}>
        <h2 style={{color: '#d2b48c', marginBottom: '40px', textAlign: 'center'}}>LogiConnect</h2>
        
        {/* زر التبديل للوضع الليلي */}
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)} 
          style={styles.themeToggleBtn}
        >
          {isDarkMode ? '☀️ الوضع النهاري' : '🌙 الوضع الليلي'}
        </button>

        <nav style={styles.navStyle}>
          <div onClick={() => setActiveTab('dashboard')} style={activeTab === 'dashboard' ? styles.navItemActive : styles.navItem}>📊 الرئيسية</div>
          <div onClick={() => setActiveTab('new_order')} style={activeTab === 'new_order' ? styles.navItemActive : styles.navItem}>🆕 طلب شحن جديد</div>
          <div onClick={() => setActiveTab('tracking')} style={activeTab === 'tracking' ? styles.navItemActive : styles.navItem}>📍 الطلبات والتتبع</div>
          <div onClick={() => setActiveTab('warehouses')} style={activeTab === 'warehouses' ? styles.navItemActive : styles.navItem}>🏢 المستودعات</div>
          <div onClick={onLogout} style={styles.logoutItem}>تسجيل الخروج ⬅️</div>
        </nav>
      </aside>

      {/* المحتوى الرئيسي */}
      <main style={styles.mainContentStyle}>

        {/* ================= 1. واجهة الرئيسية ================= */}
        {activeTab === 'dashboard' && (
          <div>
            <header style={styles.headerStyle}><h1 style={styles.headingStyle}>لوحة تحكم سلاسل الإمداد والعمليات</h1></header>
            
            <div style={styles.statsGrid}>
              <div style={styles.statCardMain}>
                <span style={styles.statIcon}>📈</span>
                <div><span style={styles.statLabel}>إجمالي المسافة المقطوعة</span><div style={styles.statValue}>12,400 كم</div></div>
              </div>
              <div style={styles.statCardMain}>
                <span style={styles.statIcon}>📦</span>
                <div><span style={styles.statLabel}>المستودعات النشطة</span><div style={styles.statValue}>{warehouses.length} مواقع</div></div>
              </div>
              <div style={styles.statCardMain}>
                <span style={styles.statIcon}>⏱️</span>
                <div><span style={styles.statLabel}>متوسط سرعة الأسطول</span><div style={styles.statValue}>90 كم/س</div></div>
              </div>
              <div style={styles.statCardMain}>
                <span style={styles.statIcon}>💰</span>
                <div><span style={styles.statLabel}>تكاليف التشغيل</span><div style={styles.statValue}>45,000 ر.س</div></div>
              </div>
            </div>

            <div style={{display: 'flex', gap: '25px', marginTop: '30px'}}>
              <div style={{...styles.orderSection, flex: 1}}>
                <h3 style={styles.sectionTitle}>🔔 تنبيهات الكفاءة واللوجستيات</h3>
                <div style={styles.alertItem}>✅ شحنة #101 تلتزم بالمسار المخطط وسرعة 90كم/س.</div>
                <div style={styles.alertItem}>⚠️ مستودع الكويت: وصول متوقع لـ 3 شاحنات خلال 12 ساعة.</div>
              </div>
              <div style={{...styles.orderSection, flex: 1, backgroundColor: isDarkMode ? '#2d1e13' : '#3d2b1f', color: '#fff', border: 'none'}}>
                <h3 style={{...styles.sectionTitle, color: '#d2b48c', borderBottomColor: '#d2b48c'}}>🧾 الأداء المالي للسلسلة</h3>
                <p>الرصيد المتاح: <b>50,000 ر.س</b></p>
                <p>وفورات النقل هذا الشهر: <b>12% 📈</b></p>
              </div>
            </div>
          </div>
        )}

        {/* ================= 2. واجهة طلب شحن جديد ================= */}
        {activeTab === 'new_order' && (
          <div>
            <header style={styles.headerStyle}><h1 style={styles.headingStyle}>إعداد طلب شحنة جديد</h1></header>
            <div style={styles.orderSection}>
              <h3 style={styles.sectionTitle}>🗺️ تفاصيل المسار والرسوم</h3>
              <div style={styles.routeForm}>
                <div style={styles.inputGroup}>
                  <label style={styles.labelStyle}>من (المرسى/المخزن):</label>
                  <select style={styles.inputField}><option>مرسى ميناء جدة الإسلامي</option></select>
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.labelStyle}>إلى (المخزن/المرسى):</label>
                  <select style={styles.inputField}><option>مخازن الكويت المركزية</option></select>
                </div>
              </div>
              <div style={styles.feesBox}>
                <div style={styles.feeItem}><span>رسوم الجمارك:</span> <strong style={styles.headingStyle}>850 ر.س</strong></div>
                <div style={styles.feeItem}><span>ضريبة (VAT):</span> <strong style={styles.headingStyle}>15%</strong></div>
              </div>
            </div>

            <h3 style={styles.sectionTitle}>🚛 الشاحنات المتوفرة (حساب السرعة: 90كم/س)</h3>
            <div style={styles.trucksGrid}>
              {availableTrucks.map(truck => (
                <div key={truck.id} style={styles.truckCard}>
                  <div style={styles.truckCardHeader}>
                    <span style={styles.truckTypeBadge(truck.type)}>{truck.type}</span>
                    <strong style={styles.headingStyle}>{truck.companyName}</strong>
                  </div>
                  <div style={styles.truckDetails}>
                    <p>👤 <b>السائق:</b> {truck.driverName}</p>
                    <p>🔢 <b>اللوحة:</b> <span style={styles.plateStyle}>{truck.plate}</span></p>
                    <p>📦 <b>الحمولة:</b> {truck.capacity}</p>
                  </div>
                  <div style={styles.tripInfoBox}>
                    <p>🛣️ المسافة: {truck.distance} كم</p>
                    <p>⏱️ الوقت المقدر: {calculateETA(truck.distance)} ساعة</p>
                  </div>
                  <button style={styles.bookBtn}>حجز وتأكيد المسار ✔️</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= 3. واجهة التتبع الحي ================= */}
        {activeTab === 'tracking' && (
          <div>
            <header style={styles.headerStyle}><h1 style={styles.headingStyle}>تتبع حركة سلاسل الإمداد</h1></header>
            {activeOrders.map(order => (
              <div key={order.id} style={styles.orderSection}>
                <div style={{display:'flex', justifyContent:'space-between', marginBottom: '20px'}}>
                  <h3 style={styles.headingStyle}>طلب رقم: {order.id} | السائق: {order.driver}</h3>
                  <span style={{color: '#27ae60', fontWeight: 'bold'}}>{order.status}</span>
                </div>
                
                <div style={{display:'flex', justifyContent:'space-between', fontSize: '14px', marginBottom: '10px', color: isDarkMode ? '#ccc' : '#333'}}>
                  <span>البداية: {order.from}</span>
                  <span>الهدف: {order.to}</span>
                </div>

                <div style={styles.progressContainer}>
                  <div style={{...styles.progressBar, width: `${(order.coveredDist / order.totalDist) * 100}%`}}></div>
                </div>

                <div style={styles.statsGrid}>
                  <div style={styles.statCardMain}>
                    <div><span style={styles.statLabel}>المسافة المتبقية</span><div style={styles.statValue}>{order.totalDist - order.coveredDist} كم</div></div>
                  </div>
                  <div style={styles.statCardMain}>
                    <div><span style={styles.statLabel}>الوقت المتبقي للوصول</span><div style={styles.statValue}>{calculateETA(order.totalDist - order.coveredDist)} ساعة</div></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= 4. واجهة المستودعات ================= */}
        {activeTab === 'warehouses' && (
          <div>
            <header style={styles.headerStyle}>
              <h1 style={styles.headingStyle}>إدارة المستودعات</h1>
              <button onClick={handleAddWarehouse} style={styles.addBtnStyle}>إضافة مستودع جديد ➕</button>
            </header>
            <div style={styles.trucksGrid}>
              {warehouses.map(w => (
                <div key={w.id} style={styles.warehouseCard}>
                  <h3 style={{...styles.headingStyle, margin: '0 0 5px 0'}}>{w.name}</h3>
                  <p style={{color: isDarkMode ? '#d2b48c' : '#8b4513', fontSize: '14px'}}>📍 {w.city}</p>
                  <div style={styles.mapContainer}>
                    <iframe title={w.id} width="100%" height="100%" src={w.mapUrl} style={{border:0, borderRadius:'8px'}}></iframe>
                  </div>
                  <button onClick={() => setWarehouses(warehouses.filter(item => item.id !== w.id))} style={styles.delBtn}>حذف المستودع 🗑️</button>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

// --- مولد التنسيقات المتجاوب مع الوضع الليلي والنهاري ---
const getThemeStyles = (isDark) => {
  // تعريف الألوان الأساسية بناءً على الوضع
  const colors = {
    bgPage: isDark ? '#121212' : '#fff',
    bgSidebar: isDark ? '#1a110a' : '#3d2b1f',
    bgMainContent: isDark ? '#1e1e1e' : '#fafafa',
    bgCard: isDark ? '#282828' : '#fff',
    bgStatCard: isDark ? '#332a22' : '#f5f5dc',
    bgInput: isDark ? '#333' : '#fff',
    bgFeesBox: isDark ? '#2a241e' : '#f5f5dc',
    bgTripInfo: isDark ? '#222' : '#f9f9f9',
    textMain: isDark ? '#ffffff' : '#3d2b1f',
    textSecondary: isDark ? '#cccccc' : '#555',
    textMuted: isDark ? '#bfa482' : '#8b4513',
    accent: '#d2b48c',
    borderLight: isDark ? '#444' : '#f0f0f0',
    borderMedium: isDark ? '#555' : '#ccc',
  };

  return {
    pageStyle: { display: 'flex', height: '100vh', direction: 'rtl', backgroundColor: colors.bgPage, fontFamily: 'Arial', color: colors.textMain },
    sidebarStyle: { width: '250px', backgroundColor: colors.bgSidebar, color: '#fff', padding: '30px 20px', borderLeft: `5px solid ${colors.accent}`, display: 'flex', flexDirection: 'column' },
    
    themeToggleBtn: { marginBottom: '20px', padding: '10px', borderRadius: '8px', border: `1px solid ${colors.accent}`, backgroundColor: 'transparent', color: colors.accent, cursor: 'pointer', fontWeight: 'bold', transition: '0.3s' },
    
    navStyle: { display: 'flex', flexDirection: 'column', gap: '15px', flex: 1 },
    navItem: { padding: '12px', cursor: 'pointer', borderRadius: '5px', transition: 'all 0.3s', color: '#fff' },
    navItemActive: { padding: '12px', cursor: 'pointer', borderRadius: '5px', transition: 'all 0.3s', backgroundColor: colors.accent, color: '#3d2b1f', fontWeight: 'bold' },
    logoutItem: { padding: '12px', cursor: 'pointer', borderRadius: '5px', transition: 'all 0.3s', marginTop: 'auto', color: '#ffb3b3', border: '1px solid #ffb3b3', textAlign: 'center' },
    
    mainContentStyle: { flex: 1, padding: '40px', overflowY: 'auto', backgroundColor: colors.bgMainContent, transition: '0.3s' },
    headerStyle: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: `2px solid ${isDark ? '#333' : '#f5f5dc'}`, paddingBottom: '15px' },
    headingStyle: { color: colors.textMain },
    
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' },
    statCardMain: { backgroundColor: colors.bgStatCard, padding: '15px', borderRadius: '12px', border: `1px solid ${colors.accent}`, display: 'flex', alignItems: 'center', gap: '12px' },
    statIcon: { fontSize: '24px' },
    statLabel: { fontSize: '11px', color: colors.textMuted },
    statValue: { fontSize: '16px', fontWeight: 'bold', color: colors.textMain },
    alertItem: { padding: '10px 0', borderBottom: `1px solid ${colors.borderLight}`, fontSize: '13px', color: colors.textSecondary },

    orderSection: { backgroundColor: colors.bgCard, padding: '25px', borderRadius: '12px', marginBottom: '30px', border: `1px solid ${colors.borderLight}` },
    sectionTitle: { color: colors.textMuted, marginBottom: '20px', borderBottom: `2px dashed ${colors.accent}`, paddingBottom: '10px', display: 'inline-block' },
    
    routeForm: { display: 'flex', gap: '20px', marginBottom: '20px' },
    inputGroup: { flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' },
    labelStyle: { color: colors.textMain, fontWeight: 'bold', fontSize: '14px' },
    inputField: { padding: '12px', borderRadius: '8px', border: `1px solid ${colors.accent}`, outline: 'none', backgroundColor: colors.bgInput, color: colors.textMain },
    feesBox: { backgroundColor: colors.bgFeesBox, padding: '15px', borderRadius: '8px', display: 'flex', gap: '30px', borderRight: `5px solid ${colors.accent}` },
    feeItem: { color: colors.textSecondary, fontSize: '14px' },
    
    trucksGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' },
    truckCard: { border: `2px solid ${colors.accent}`, borderRadius: '12px', padding: '20px', backgroundColor: colors.bgCard, display: 'flex', flexDirection: 'column', gap: '15px' },
    truckCardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    truckTypeBadge: (type) => ({ backgroundColor: type === 'أفراد' ? '#e67e22' : '#2980b9', color: '#fff', padding: '4px 10px', borderRadius: '20px', fontSize: '11px' }),
    truckDetails: { color: colors.textMain, fontSize: '14px', lineHeight: '1.6' },
    plateStyle: { backgroundColor: '#f1c40f', color: '#000', padding: '2px 6px', borderRadius: '4px', border: '1px solid #000', fontWeight: 'bold' },
    tripInfoBox: { backgroundColor: colors.bgTripInfo, padding: '10px', borderRadius: '8px', fontSize: '13px', color: colors.textSecondary, border: `1px dashed ${colors.borderMedium}` },
    bookBtn: { width: '100%', padding: '12px', backgroundColor: isDark ? colors.accent : '#3d2b1f', color: isDark ? '#3d2b1f' : colors.accent, border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', transition: '0.3s' },

    progressContainer: { width: '100%', height: '10px', backgroundColor: isDark ? '#444' : '#eee', borderRadius: '10px', margin: '15px 0', overflow: 'hidden' },
    progressBar: { height: '100%', backgroundColor: isDark ? colors.accent : '#3d2b1f', transition: 'width 0.5s' },
    
    warehouseCard: { border: `2px solid ${colors.accent}`, borderRadius: '12px', padding: '20px', backgroundColor: colors.bgCard, display: 'flex', flexDirection: 'column', gap: '15px' },
    mapContainer: { width: '100%', height: '150px', borderRadius: '8px', overflow: 'hidden', marginBottom: '10px' },
    delBtn: { padding: '10px', backgroundColor: isDark ? '#4a1515' : '#ffebe6', color: isDark ? '#ff9999' : '#e74c3c', border: `1px solid ${isDark ? '#ff9999' : '#ffcccc'}`, borderRadius: '8px', cursor: 'pointer', width: '100%', transition: '0.3s' },
    addBtnStyle: { backgroundColor: isDark ? colors.accent : '#3d2b1f', color: isDark ? '#3d2b1f' : '#fff', border: 'none', padding: '12px 25px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }
  };
};

export default CompanyDashboard;