import React, { useState } from 'react';

const CompanyDashboard = ({ onLogout, onToggleLanguage, currentLang }) => {
  const isArabic = currentLang === 'ar';
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showCreateShipment, setShowCreateShipment] = useState(false);
  const [shipmentForm, setShipmentForm] = useState({
    origin: '', destination: '', cargoType: '', weight: '', notes: ''
  });
  const [shipmentSuccess, setShipmentSuccess] = useState(false);

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
  const styles = getThemeStyles(isDarkMode, isArabic);

  const handleCreateShipment = (e) => {
    e.preventDefault();
    setShipmentSuccess(true);
    setShipmentForm({ origin: '', destination: '', cargoType: '', weight: '', notes: '' });
    setTimeout(() => {
      setShipmentSuccess(false);
      setShowCreateShipment(false);
    }, 2000);
  };

  return (
    <div style={styles.pageStyle}>
      {/* القائمة الجانبية */}
      <aside style={styles.sidebarStyle}>
        <h2 style={{color: '#d2b48c', marginBottom: '40px', textAlign: 'center'}}>LogiConnect</h2>
        
        {/* Language Switcher */}
        <button
          onClick={onToggleLanguage}
          style={{...styles.themeToggleBtn, marginBottom: '8px'}}
        >
          {isArabic ? '🌐 EN' : '🌐 عربي'}
        </button>

        {/* زر التبديل للوضع الليلي */}
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)} 
          style={styles.themeToggleBtn}
        >
          {isDarkMode ? (isArabic ? '☀️ الوضع النهاري' : '☀️ Light Mode') : (isArabic ? '🌙 الوضع الليلي' : '🌙 Dark Mode')}
        </button>

        <nav style={styles.navStyle}>
          <div onClick={() => setActiveTab('dashboard')} style={activeTab === 'dashboard' ? styles.navItemActive : styles.navItem}>
            📊 {isArabic ? 'الرئيسية' : 'Dashboard'}
          </div>
          <div onClick={() => setActiveTab('new_order')} style={activeTab === 'new_order' ? styles.navItemActive : styles.navItem}>
            🆕 {isArabic ? 'طلب شحن جديد' : 'New Shipment'}
          </div>
          <div onClick={() => setActiveTab('tracking')} style={activeTab === 'tracking' ? styles.navItemActive : styles.navItem}>
            📍 {isArabic ? 'الطلبات والتتبع' : 'Orders & Tracking'}
          </div>
          <div onClick={() => setActiveTab('warehouses')} style={activeTab === 'warehouses' ? styles.navItemActive : styles.navItem}>
            🏢 {isArabic ? 'المستودعات' : 'Warehouses'}
          </div>
          <div onClick={onLogout} style={styles.logoutItem}>
            {isArabic ? 'تسجيل الخروج ⬅️' : 'Logout ⬅️'}
          </div>
        </nav>
      </aside>

      {/* Create Shipment Modal */}
      {showCreateShipment && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalCard}>
            <h2 style={{color: styles.colors.textMain, marginBottom: '20px'}}>
              📦 {isArabic ? 'إنشاء شحنة جديدة' : 'Create New Shipment'}
            </h2>
            {shipmentSuccess ? (
              <div style={{textAlign: 'center', padding: '20px'}}>
                <div style={{fontSize: '48px'}}>✅</div>
                <p style={{color: '#27ae60', fontWeight: 'bold', marginTop: '10px'}}>
                  {isArabic ? 'تم إنشاء الشحنة بنجاح!' : 'Shipment created successfully!'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleCreateShipment} style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                <input
                  type="text"
                  placeholder={isArabic ? 'نقطة الانطلاق (Origin)' : 'Origin'}
                  value={shipmentForm.origin}
                  onChange={(e) => setShipmentForm({...shipmentForm, origin: e.target.value})}
                  required
                  style={styles.modalInput}
                />
                <input
                  type="text"
                  placeholder={isArabic ? 'الوجهة (Destination)' : 'Destination'}
                  value={shipmentForm.destination}
                  onChange={(e) => setShipmentForm({...shipmentForm, destination: e.target.value})}
                  required
                  style={styles.modalInput}
                />
                <select
                  value={shipmentForm.cargoType}
                  onChange={(e) => setShipmentForm({...shipmentForm, cargoType: e.target.value})}
                  required
                  style={styles.modalInput}
                >
                  <option value="">{isArabic ? 'نوع البضاعة' : 'Cargo Type'}</option>
                  <option value="general">{isArabic ? 'بضاعة عامة' : 'General Cargo'}</option>
                  <option value="refrigerated">{isArabic ? 'مبردة' : 'Refrigerated'}</option>
                  <option value="hazardous">{isArabic ? 'مواد خطرة' : 'Hazardous Materials'}</option>
                  <option value="bulk">{isArabic ? 'سائبة' : 'Bulk'}</option>
                </select>
                <input
                  type="number"
                  placeholder={isArabic ? 'الوزن (طن)' : 'Weight (tons)'}
                  value={shipmentForm.weight}
                  onChange={(e) => setShipmentForm({...shipmentForm, weight: e.target.value})}
                  required
                  min="0.1"
                  step="0.1"
                  style={styles.modalInput}
                />
                <textarea
                  placeholder={isArabic ? 'ملاحظات إضافية' : 'Additional Notes'}
                  value={shipmentForm.notes}
                  onChange={(e) => setShipmentForm({...shipmentForm, notes: e.target.value})}
                  rows={3}
                  style={{...styles.modalInput, resize: 'vertical'}}
                />
                <div style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
                  <button type="submit" style={styles.modalSubmitBtn}>
                    ✅ {isArabic ? 'إنشاء الشحنة' : 'Create Shipment'}
                  </button>
                  <button type="button" onClick={() => setShowCreateShipment(false)} style={styles.modalCancelBtn}>
                    ❌ {isArabic ? 'إلغاء' : 'Cancel'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* المحتوى الرئيسي */}
      <main style={styles.mainContentStyle}>

        {/* ================= 1. واجهة الرئيسية ================= */}
        {activeTab === 'dashboard' && (
          <div>
            <header style={styles.headerStyle}>
              <h1 style={styles.headingStyle}>{isArabic ? 'لوحة تحكم سلاسل الإمداد والعمليات' : 'Supply Chain Operations Dashboard'}</h1>
            </header>

            {/* Quick Action Buttons */}
            <div style={styles.quickActionsGrid}>
              <button onClick={() => setShowCreateShipment(true)} style={styles.quickActionBtn('#3d2b1f', '#d2b48c')}>
                <span style={{fontSize: '24px'}}>📦</span>
                <span style={{fontWeight: 'bold'}}>{isArabic ? 'شحنة جديدة' : 'New Shipment'}</span>
                <span style={{fontSize: '11px', opacity: 0.8}}>{isArabic ? 'إنشاء طلب شحن' : 'Create shipment order'}</span>
              </button>
              <button onClick={() => setActiveTab('tracking')} style={styles.quickActionBtn('#1a6b3a', '#d2b48c')}>
                <span style={{fontSize: '24px'}}>📍</span>
                <span style={{fontWeight: 'bold'}}>{isArabic ? 'تتبع شحنة' : 'Track Shipment'}</span>
                <span style={{fontSize: '11px', opacity: 0.8}}>{isArabic ? 'تتبع الطلبات الحالية' : 'Track current orders'}</span>
              </button>
              <button onClick={() => setActiveTab('new_order')} style={styles.quickActionBtn('#1a4a6b', '#d2b48c')}>
                <span style={{fontSize: '24px'}}>📋</span>
                <span style={{fontWeight: 'bold'}}>{isArabic ? 'عرض الطلبات' : 'View Orders'}</span>
                <span style={{fontSize: '11px', opacity: 0.8}}>{isArabic ? 'إدارة جميع الطلبات' : 'Manage all orders'}</span>
              </button>
            </div>
            
            <div style={styles.statsGrid}>
              <div style={styles.statCardMain}>
                <span style={styles.statIcon}>📈</span>
                <div><span style={styles.statLabel}>{isArabic ? 'إجمالي المسافة المقطوعة' : 'Total Distance'}</span><div style={styles.statValue}>12,400 {isArabic ? 'كم' : 'km'}</div></div>
              </div>
              <div style={styles.statCardMain}>
                <span style={styles.statIcon}>📦</span>
                <div><span style={styles.statLabel}>{isArabic ? 'المستودعات النشطة' : 'Active Warehouses'}</span><div style={styles.statValue}>{warehouses.length} {isArabic ? 'مواقع' : 'locations'}</div></div>
              </div>
              <div style={styles.statCardMain}>
                <span style={styles.statIcon}>⏱️</span>
                <div><span style={styles.statLabel}>{isArabic ? 'متوسط سرعة الأسطول' : 'Fleet Speed'}</span><div style={styles.statValue}>90 {isArabic ? 'كم/س' : 'km/h'}</div></div>
              </div>
              <div style={styles.statCardMain}>
                <span style={styles.statIcon}>💰</span>
                <div><span style={styles.statLabel}>{isArabic ? 'تكاليف التشغيل' : 'Operating Costs'}</span><div style={styles.statValue}>45,000 {isArabic ? 'ر.س' : 'SAR'}</div></div>
              </div>
            </div>

            <div style={{display: 'flex', gap: '25px', marginTop: '30px'}}>
              <div style={{...styles.orderSection, flex: 1}}>
                <h3 style={styles.sectionTitle}>🔔 {isArabic ? 'تنبيهات الكفاءة واللوجستيات' : 'Logistics Alerts'}</h3>
                <div style={styles.alertItem}>✅ {isArabic ? 'شحنة #101 تلتزم بالمسار المخطط وسرعة 90كم/س.' : 'Shipment #101 on track at 90 km/h.'}</div>
                <div style={styles.alertItem}>⚠️ {isArabic ? 'مستودع الكويت: وصول متوقع لـ 3 شاحنات خلال 12 ساعة.' : 'Kuwait warehouse: 3 trucks arriving in 12 hours.'}</div>
              </div>
              <div style={{...styles.orderSection, flex: 1, backgroundColor: isDarkMode ? '#2d1e13' : '#3d2b1f', color: '#fff', border: 'none'}}>
                <h3 style={{...styles.sectionTitle, color: '#d2b48c', borderBottomColor: '#d2b48c'}}>🧾 {isArabic ? 'الأداء المالي للسلسلة' : 'Financial Performance'}</h3>
                <p>{isArabic ? 'الرصيد المتاح:' : 'Available Balance:'} <b>50,000 {isArabic ? 'ر.س' : 'SAR'}</b></p>
                <p>{isArabic ? 'وفورات النقل هذا الشهر:' : 'Transport savings this month:'} <b>12% 📈</b></p>
              </div>
            </div>
          </div>
        )}

        {/* ================= 2. واجهة طلب شحن جديد ================= */}
        {activeTab === 'new_order' && (
          <div>
            <header style={styles.headerStyle}>
              <h1 style={styles.headingStyle}>{isArabic ? 'إعداد طلب شحنة جديد' : 'New Shipment Order'}</h1>
              <button onClick={() => setShowCreateShipment(true)} style={styles.addBtnStyle}>
                📦 {isArabic ? 'إنشاء شحنة جديدة' : 'Create Shipment'}
              </button>
            </header>
            <div style={styles.orderSection}>
              <h3 style={styles.sectionTitle}>🗺️ {isArabic ? 'تفاصيل المسار والرسوم' : 'Route Details & Fees'}</h3>
              <div style={styles.routeForm}>
                <div style={styles.inputGroup}>
                  <label style={styles.labelStyle}>{isArabic ? 'من (المرسى/المخزن):' : 'From (Port/Warehouse):'}</label>
                  <select style={styles.inputField}>
                    <option>{isArabic ? 'مرسى ميناء جدة الإسلامي' : 'Jeddah Islamic Port'}</option>
                  </select>
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.labelStyle}>{isArabic ? 'إلى (المخزن/المرسى):' : 'To (Warehouse/Port):'}</label>
                  <select style={styles.inputField}>
                    <option>{isArabic ? 'مخازن الكويت المركزية' : 'Kuwait Central Warehouses'}</option>
                  </select>
                </div>
              </div>
              <div style={styles.feesBox}>
                <div style={styles.feeItem}><span>{isArabic ? 'رسوم الجمارك:' : 'Customs Fees:'}</span> <strong style={styles.headingStyle}>850 {isArabic ? 'ر.س' : 'SAR'}</strong></div>
                <div style={styles.feeItem}><span>{isArabic ? 'ضريبة (VAT):' : 'Tax (VAT):'}</span> <strong style={styles.headingStyle}>15%</strong></div>
              </div>
            </div>

            <h3 style={styles.sectionTitle}>🚛 {isArabic ? 'الشاحنات المتوفرة (حساب السرعة: 90كم/س)' : 'Available Trucks (Speed: 90 km/h)'}</h3>
            <div style={styles.trucksGrid}>
              {availableTrucks.map(truck => (
                <div key={truck.id} style={styles.truckCard}>
                  <div style={styles.truckCardHeader}>
                    <span style={styles.truckTypeBadge(truck.type)}>{truck.type}</span>
                    <strong style={styles.headingStyle}>{truck.companyName}</strong>
                  </div>
                  <div style={styles.truckDetails}>
                    <p>👤 <b>{isArabic ? 'السائق:' : 'Driver:'}</b> {truck.driverName}</p>
                    <p>🔢 <b>{isArabic ? 'اللوحة:' : 'Plate:'}</b> <span style={styles.plateStyle}>{truck.plate}</span></p>
                    <p>📦 <b>{isArabic ? 'الحمولة:' : 'Capacity:'}</b> {truck.capacity}</p>
                  </div>
                  <div style={styles.tripInfoBox}>
                    <p>🛣️ {isArabic ? 'المسافة:' : 'Distance:'} {truck.distance} {isArabic ? 'كم' : 'km'}</p>
                    <p>⏱️ {isArabic ? 'الوقت المقدر:' : 'ETA:'} {calculateETA(truck.distance)} {isArabic ? 'ساعة' : 'hours'}</p>
                  </div>
                  <button style={styles.bookBtn}>{isArabic ? 'حجز وتأكيد المسار ✔️' : 'Book & Confirm ✔️'}</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= 3. واجهة التتبع الحي ================= */}
        {activeTab === 'tracking' && (
          <div>
            <header style={styles.headerStyle}>
              <h1 style={styles.headingStyle}>{isArabic ? 'تتبع حركة سلاسل الإمداد' : 'Supply Chain Tracking'}</h1>
              <button onClick={() => setShowCreateShipment(true)} style={styles.addBtnStyle}>
                📦 {isArabic ? 'إنشاء شحنة جديدة' : 'Create Shipment'}
              </button>
            </header>
            {activeOrders.map(order => (
              <div key={order.id} style={styles.orderSection}>
                <div style={{display:'flex', justifyContent:'space-between', marginBottom: '20px'}}>
                  <h3 style={styles.headingStyle}>{isArabic ? 'طلب رقم:' : 'Order #'} {order.id} | {isArabic ? 'السائق:' : 'Driver:'} {order.driver}</h3>
                  <span style={{color: '#27ae60', fontWeight: 'bold'}}>{order.status}</span>
                </div>
                
                <div style={{display:'flex', justifyContent:'space-between', fontSize: '14px', marginBottom: '10px', color: isDarkMode ? '#ccc' : '#333'}}>
                  <span>{isArabic ? 'البداية:' : 'From:'} {order.from}</span>
                  <span>{isArabic ? 'الهدف:' : 'To:'} {order.to}</span>
                </div>

                <div style={styles.progressContainer}>
                  <div style={{...styles.progressBar, width: `${(order.coveredDist / order.totalDist) * 100}%`}}></div>
                </div>

                <div style={styles.statsGrid}>
                  <div style={styles.statCardMain}>
                    <div><span style={styles.statLabel}>{isArabic ? 'المسافة المتبقية' : 'Remaining Distance'}</span><div style={styles.statValue}>{order.totalDist - order.coveredDist} {isArabic ? 'كم' : 'km'}</div></div>
                  </div>
                  <div style={styles.statCardMain}>
                    <div><span style={styles.statLabel}>{isArabic ? 'الوقت المتبقي للوصول' : 'ETA'}</span><div style={styles.statValue}>{calculateETA(order.totalDist - order.coveredDist)} {isArabic ? 'ساعة' : 'hours'}</div></div>
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
              <h1 style={styles.headingStyle}>{isArabic ? 'إدارة المستودعات' : 'Warehouse Management'}</h1>
              <button onClick={handleAddWarehouse} style={styles.addBtnStyle}>{isArabic ? 'إضافة مستودع جديد ➕' : '➕ Add Warehouse'}</button>
            </header>
            <div style={styles.trucksGrid}>
              {warehouses.map(w => (
                <div key={w.id} style={styles.warehouseCard}>
                  <h3 style={{...styles.headingStyle, margin: '0 0 5px 0'}}>{w.name}</h3>
                  <p style={{color: isDarkMode ? '#d2b48c' : '#8b4513', fontSize: '14px'}}>📍 {w.city}</p>
                  <div style={styles.mapContainer}>
                    <iframe title={w.id} width="100%" height="100%" src={w.mapUrl} style={{border:0, borderRadius:'8px'}}></iframe>
                  </div>
                  <button onClick={() => setWarehouses(warehouses.filter(item => item.id !== w.id))} style={styles.delBtn}>{isArabic ? 'حذف المستودع 🗑️' : '🗑️ Delete Warehouse'}</button>
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
const getThemeStyles = (isDark, isArabic = false) => {
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
    colors,
    pageStyle: { display: 'flex', height: '100vh', direction: isArabic ? 'rtl' : 'ltr', backgroundColor: colors.bgPage, fontFamily: 'Arial', color: colors.textMain },
    sidebarStyle: { width: '250px', backgroundColor: colors.bgSidebar, color: '#fff', padding: '30px 20px', borderLeft: `5px solid ${colors.accent}`, display: 'flex', flexDirection: 'column', overflowY: 'auto' },
    
    themeToggleBtn: { marginBottom: '10px', padding: '10px', borderRadius: '8px', border: `1px solid ${colors.accent}`, backgroundColor: 'transparent', color: colors.accent, cursor: 'pointer', fontWeight: 'bold', transition: '0.3s' },
    
    navStyle: { display: 'flex', flexDirection: 'column', gap: '15px', flex: 1, marginTop: '10px' },
    navItem: { padding: '12px', cursor: 'pointer', borderRadius: '5px', transition: 'all 0.3s', color: '#fff' },
    navItemActive: { padding: '12px', cursor: 'pointer', borderRadius: '5px', transition: 'all 0.3s', backgroundColor: colors.accent, color: '#3d2b1f', fontWeight: 'bold' },
    logoutItem: { padding: '12px', cursor: 'pointer', borderRadius: '5px', transition: 'all 0.3s', marginTop: 'auto', color: '#ffb3b3', border: '1px solid #ffb3b3', textAlign: 'center' },
    
    mainContentStyle: { flex: 1, padding: '40px', overflowY: 'auto', backgroundColor: colors.bgMainContent, transition: '0.3s' },
    headerStyle: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: `2px solid ${isDark ? '#333' : '#f5f5dc'}`, paddingBottom: '15px' },
    headingStyle: { color: colors.textMain },
    
    quickActionsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginBottom: '30px' },
    quickActionBtn: (bg, textColor) => ({
      padding: '20px 15px',
      backgroundColor: bg,
      color: textColor,
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '6px',
      transition: 'transform 0.2s, box-shadow 0.2s',
      boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
    }),

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
    addBtnStyle: { backgroundColor: isDark ? colors.accent : '#3d2b1f', color: isDark ? '#3d2b1f' : '#fff', border: 'none', padding: '12px 25px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },

    // Modal styles
    modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999 },
    modalCard: { backgroundColor: isDark ? '#2a2a2a' : '#fff', padding: '30px', borderRadius: '16px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', border: `2px solid ${colors.accent}`, direction: 'inherit' },
    modalInput: { width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${colors.accent}`, outline: 'none', backgroundColor: colors.bgInput, color: colors.textMain, fontSize: '14px', boxSizing: 'border-box' },
    modalSubmitBtn: { flex: 1, padding: '12px', backgroundColor: '#3d2b1f', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' },
    modalCancelBtn: { flex: 1, padding: '12px', backgroundColor: '#ffebe6', color: '#e74c3c', border: '1px solid #ffcccc', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' },
  };
};

export default CompanyDashboard;