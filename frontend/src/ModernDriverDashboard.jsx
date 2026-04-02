import React, { useState } from 'react';
import { useTheme } from './ThemeProvider';
import { Button, Card, Badge, Alert, Table } from './components';
import { shadows, transitions, borderRadius, spacing } from './theme';
import { useAuth } from './AuthContext';

const ModernDriverDashboard = ({ onLogout }) => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('active');
  const [selectedTrip, setSelectedTrip] = useState(null);

  const [trips, setTrips] = useState([
    {
      id: 'TRIP-001',
      from: 'جدة',
      to: 'الرياض',
      status: 'active',
      distance: 950,
      earnings: 450,
      time: '4 ساعات',
      deliveries: 12,
      rating: 4.8,
      departure: '08:30 AM',
      eta: '12:30 PM',
    },
    {
      id: 'TRIP-002',
      from: 'الرياض',
      to: 'الدمام',
      status: 'completed',
      distance: 400,
      earnings: 200,
      time: '3 ساعات',
      deliveries: 8,
      rating: 5,
      departure: '14:00 PM',
      eta: '17:00 PM',
    },
    {
      id: 'TRIP-003',
      from: 'الدمام',
      to: 'جدة',
      status: 'pending',
      distance: 1300,
      earnings: 650,
      time: '6 ساعات',
      deliveries: 20,
      rating: '-',
      departure: '09:00 AM',
      eta: '03:00 PM',
    },
  ]);

  const stats = [
    { label: 'إجمالي الرحلات', value: '127', trend: '+8', icon: '🚗' },
    { label: 'الأرباح اليومية', value: '1,245 ر.س', trend: '+15%', icon: '💵' },
    { label: 'التقييم', value: '4.9', trend: '+0.1', icon: '⭐' },
    { label: 'ساعات العمل', value: '8 ساعات', trend: '+2', icon: '⏱️' },
  ];

  const getStatusColor = (status) => {
    const colors = {
      active: 'info',
      completed: 'success',
      pending: 'warning',
      cancelled: 'error',
    };
    return colors[status] || 'default';
  };

  const getStatusText = (status) => {
    const texts = {
      active: 'نشطة',
      completed: 'مكتملة',
      pending: 'قيد الانتظار',
      cancelled: 'ملغاة',
    };
    return texts[status] || status;
  };

  return (
    <div style={{
      background: theme.background.primary,
      color: theme.text.primary,
      minHeight: '100vh',
      direction: 'rtl',
      fontFamily: '"Segoe UI", Roboto, sans-serif',
    }}>
      {/* Header */}
      <header style={{
        background: theme.background.secondary,
        borderBottom: `1px solid ${theme.border.light}`,
        padding: spacing[4],
        boxShadow: shadows.sm,
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: theme.primary }}>
              🚗 سائقي LogiConnect
            </h1>
            <p style={{ margin: '4px 0 0 0', color: theme.text.secondary, fontSize: '14px' }}>
              مرحباً، {user?.name || 'السائق'}
            </p>
          </div>
          <Button variant="secondary" size="sm" onClick={onLogout}>
            تسجيل الخروج
          </Button>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: spacing[6] }}>
        {/* Statistics */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: spacing[6],
          marginBottom: spacing[6],
        }}>
          {stats.map((stat, idx) => (
            <Card key={idx} elevated>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <p style={{ margin: '0 0 8px 0', color: theme.text.secondary, fontSize: '14px' }}>
                    {stat.label}
                  </p>
                  <h3 style={{ margin: 0, fontSize: '28px', fontWeight: 700, color: theme.primary }}>
                    {stat.value}
                  </h3>
                  <p style={{ margin: '8px 0 0 0', color: theme.success, fontSize: '12px', fontWeight: 600 }}>
                    {stat.trend}
                  </p>
                </div>
                <span style={{ fontSize: '36px' }}>{stat.icon}</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Card elevated>
          {/* Tabs */}
          <div style={{
            display: 'flex',
            gap: spacing[4],
            borderBottom: `1px solid ${theme.border.light}`,
            marginBottom: spacing[6],
            flexWrap: 'wrap',
          }}>
            {['active', 'history', 'earnings'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: `${spacing[3]} 0`,
                  marginBottom: '-1px',
                  background: 'none',
                  border: 'none',
                  color: activeTab === tab ? theme.primary : theme.text.secondary,
                  fontWeight: activeTab === tab ? 600 : 400,
                  cursor: 'pointer',
                  borderBottom: activeTab === tab ? `2px solid ${theme.primary}` : 'none',
                  transition: transitions.fast,
                  fontSize: '14px',
                }}
              >
                {tab === 'active' && '🔴 الرحلات النشطة'}
                {tab === 'history' && '📋 السجل'}
                {tab === 'earnings' && '💰 الأرباح'}
              </button>
            ))}
          </div>

          {/* Active Trips */}
          {activeTab === 'active' && (
            <>
              <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: 600 }}>الرحلات النشطة</h2>
              {trips.filter(t => t.status === 'active').length > 0 ? (
                <div style={{ display: 'grid', gap: spacing[4] }}>
                  {trips.filter(t => t.status === 'active').map(trip => (
                    <TripCard key={trip.id} trip={trip} theme={theme} />
                  ))}
                </div>
              ) : (
                <Alert type="info" message="لا توجد رحلات نشطة حالياً" />
              )}
            </>
          )}

          {/* Trip History */}
          {activeTab === 'history' && (
            <>
              <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: 600 }}>سجل الرحلات</h2>
              <Table
                columns={[
                  { key: 'id', label: 'رقم الرحلة' },
                  { key: 'from', label: 'المنطقة الأولى' },
                  { key: 'to', label: 'المنطقة الثانية' },
                  { key: 'distance', label: 'المسافة (كم)' },
                  { key: 'earnings', label: 'الأرباح' },
                  {
                    key: 'status',
                    label: 'الحالة',
                    render: (status) => <Badge variant={getStatusColor(status)}>{getStatusText(status)}</Badge>,
                  },
                  { key: 'rating', label: 'التقييم' },
                ]}
                data={trips}
              />
            </>
          )}

          {/* Earnings */}
          {activeTab === 'earnings' && (
            <>
              <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: 600 }}>الأرباح</h2>
              <div style={{
                background: theme.background.tertiary,
                padding: spacing[6],
                borderRadius: borderRadius.lg,
                textAlign: 'center',
              }}>
                <h3 style={{ margin: '0 0 8px 0', color: theme.text.secondary, fontSize: '14px' }}>
                  إجمالي أرباح هذا الأسبوع
                </h3>
                <p style={{ margin: 0, fontSize: '36px', fontWeight: 700, color: theme.success }}>
                  3,245 ر.س
                </p>
                <div style={{ marginTop: spacing[6] }}>
                  <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: spacing[4] }}>
                    {['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء'].map((day, idx) => (
                      <div key={idx} style={{ textAlign: 'center' }}>
                        <p style={{ margin: '0 0 8px 0', color: theme.text.secondary, fontSize: '12px' }}>
                          {day}
                        </p>
                        <div style={{
                          width: '40px',
                          height: '60px',
                          background: `linear-gradient(to top, ${theme.primary}, ${theme.primary}${Math.random() * 100})`,
                          borderRadius: borderRadius.sm,
                          margin: '0 auto',
                        }} />
                        <p style={{ margin: '8px 0 0 0', fontSize: '12px', fontWeight: 600 }}>
                          {Math.floor(Math.random() * 800 + 400)} ر.س
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </Card>
      </main>
    </div>
  );
};

function TripCard({ trip, theme }) {
  const { spacing: sp, shadows: sh, borderRadius: br, transitions: tr } = { spacing, shadows, borderRadius, transitions };

  const getProgressColor = (status) => {
    if (status === 'active') return theme.info;
    if (status === 'completed') return theme.success;
    return theme.warning;
  };

  const getProgress = (status) => {
    if (status === 'active') return 65;
    if (status === 'completed') return 100;
    return 0;
  };

  return (
    <div style={{
      background: theme.background.secondary,
      border: `1px solid ${theme.border.light}`,
      borderRadius: borderRadius.lg,
      padding: spacing[4],
      display: 'flex',
      flexDirection: 'column',
      gap: spacing[3],
      transition: transitions.fast,
      cursor: 'pointer',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = shadows.lg;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = shadows.base;
    }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>{trip.id}</h3>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: theme.text.secondary }}>
            {trip.from} ← {trip.to}
          </p>
        </div>
        <Badge variant={trip.status === 'active' ? 'info' : trip.status === 'completed' ? 'success' : 'warning'}>
          {trip.status === 'active' ? '🔴 نشطة' : trip.status === 'completed' ? '✓ مكتملة' : '⏳ قيد الانتظار'}
        </Badge>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: spacing[3],
        fontSize: '12px',
      }}>
        <div>
          <p style={{ margin: '0 0 4px 0', color: theme.text.secondary }}>المسافة</p>
          <p style={{ margin: 0, fontWeight: 600, fontSize: '14px' }}>{trip.distance} كم</p>
        </div>
        <div>
          <p style={{ margin: '0 0 4px 0', color: theme.text.secondary }}>الأرباح</p>
          <p style={{ margin: 0, fontWeight: 600, fontSize: '14px', color: theme.success }}>
            {trip.earnings} ر.س
          </p>
        </div>
        <div>
          <p style={{ margin: '0 0 4px 0', color: theme.text.secondary }}>الوقت</p>
          <p style={{ margin: 0, fontWeight: 600, fontSize: '14px' }}>{trip.time}</p>
        </div>
        <div>
          <p style={{ margin: '0 0 4px 0', color: theme.text.secondary }}>التقييم</p>
          <p style={{ margin: 0, fontWeight: 600, fontSize: '14px' }}>
            {trip.rating === '-' ? '-' : `${trip.rating} ⭐`}
          </p>
        </div>
      </div>

      <div style={{
        background: theme.background.tertiary,
        padding: spacing[2],
        borderRadius: borderRadius.md,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: spacing[1], fontSize: '12px' }}>
          <span>التقدم</span>
          <span>{getProgress(trip.status)}%</span>
        </div>
        <div style={{
          width: '100%',
          height: '6px',
          background: theme.border.medium,
          borderRadius: borderRadius.full,
          overflow: 'hidden',
        }}>
          <div style={{
            width: `${getProgress(trip.status)}%`,
            height: '100%',
            background: getProgressColor(trip.status),
            transition: transitions.base,
          }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing[2] }}>
        <Button variant="secondary" size="sm">
          عرض التفاصيل
        </Button>
        {trip.status === 'active' && (
          <Button size="sm" variant="success">
            أنهي الرحلة
          </Button>
        )}
      </div>
    </div>
  );
}

export default ModernDriverDashboard;
