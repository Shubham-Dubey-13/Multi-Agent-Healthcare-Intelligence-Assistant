import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText, Activity, ShieldAlert, UploadCloud, MessageCircle,
  ArrowRight, TrendingUp, TrendingDown, Heart, Droplets,
  Thermometer, Zap, Calendar, CheckCircle2, AlertTriangle
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 17) return 'Good Afternoon';
  return 'Good Evening';
};

const mockHealthTip = () => {
  const tips = [
    "💧 Remember to drink at least 8 glasses of water today.",
    "🚶 A 30-minute walk can significantly improve cardiovascular health.",
    "😴 7-9 hours of quality sleep is essential for immune function.",
    "🧘 5 minutes of deep breathing can lower stress hormones by 30%.",
    "🥦 Eating colorful vegetables provides essential antioxidants.",
  ];
  return tips[Math.floor(Math.random() * tips.length)];
};

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tip] = useState(mockHealthTip);
  const [vitals] = useState({
    heartRate: 72,
    bloodPressure: '120/80',
    temperature: 98.6,
    oxygenSat: 98,
  });

  const stats = [
    { title: 'Documents Analyzed', value: '12', icon: FileText, gradient: 'linear-gradient(135deg, #6366F1, #8B5CF6)', change: '+3 this week', trend: 'up' },
    { title: 'Symptoms Checked', value: '5', icon: Activity, gradient: 'linear-gradient(135deg, #EC4899, #F43F5E)', change: '+1 today', trend: 'up' },
    { title: 'Risk Assessments', value: '2', icon: ShieldAlert, gradient: 'linear-gradient(135deg, #F59E0B, #D97706)', change: 'Low risk overall', trend: 'up' },
    { title: 'Reports Generated', value: '8', icon: UploadCloud, gradient: 'linear-gradient(135deg, #06B6D4, #0284C7)', change: '+2 this month', trend: 'up' },
  ];

  const quickActions = [
    { title: 'Start AI Consultation', desc: 'Chat with multi-agent health assistant', icon: MessageCircle, path: '/chat', gradient: 'linear-gradient(135deg, #6366F1, #8B5CF6)' },
    { title: 'Analyze Symptoms', desc: 'Select symptoms for AI diagnosis', icon: Activity, path: '/symptoms', gradient: 'linear-gradient(135deg, #EC4899, #F43F5E)' },
    { title: 'Upload Report', desc: 'OCR & AI extraction from documents', icon: UploadCloud, path: '/upload', gradient: 'linear-gradient(135deg, #06B6D4, #0284C7)' },
    { title: 'Assess Health Risk', desc: 'Predict potential conditions with ML', icon: ShieldAlert, path: '/risk-assessment', gradient: 'linear-gradient(135deg, #F59E0B, #D97706)' },
  ];

  const recentActivity = [
    { text: 'CBC blood report analyzed', time: '2h ago', icon: FileText, type: 'primary' },
    { text: 'Fever & cough symptoms checked', time: '1d ago', icon: Activity, type: 'pink' },
    { text: 'Cardiac risk assessed — Low', time: '3d ago', icon: ShieldAlert, type: 'success' },
  ];

  const vitalItems = [
    { label: 'Heart Rate', value: `${vitals.heartRate} bpm`, icon: Heart, color: '#EC4899', bg: 'rgba(236,72,153,0.1)', status: 'Normal' },
    { label: 'Blood Pressure', value: vitals.bloodPressure, icon: Droplets, color: '#6366F1', bg: 'rgba(99,102,241,0.1)', status: 'Normal' },
    { label: 'Temperature', value: `${vitals.temperature}°F`, icon: Thermometer, color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', status: 'Normal' },
    { label: 'SpO2', value: `${vitals.oxygenSat}%`, icon: Zap, color: '#10B981', bg: 'rgba(16,185,129,0.1)', status: 'Excellent' },
  ];

  return (
    <div className="animate-slide-up">

      {/* Hero / Welcome Card */}
      <div className="welcome-card" style={{ marginBottom: 28 }}>
        <div className="welcome-card-bg" />
        <div className="welcome-card-orb1" />
        <div className="welcome-card-orb2" />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </div>
              <h2 style={{ fontSize: 30, marginBottom: 10 }}>
                {getGreeting()}, {user?.name?.split(' ')[0] || 'Patient'} 👋
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 460, lineHeight: 1.7 }}>
                Your health intelligence dashboard is active. All systems are online. How can I assist you today?
              </p>
              <div className="welcome-card-actions">
                <button className="btn btn-primary" onClick={() => navigate('/chat')} style={{ background: 'white', color: '#4F46E5' }}>
                  <MessageCircle size={16} /> Start Consultation
                </button>
                <button className="btn btn-ghost" onClick={() => navigate('/symptoms')} style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>
                  Check Symptoms <ArrowRight size={16} />
                </button>
              </div>
            </div>
            {/* Daily Health Tip */}
            <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: 16, padding: '16px 20px', maxWidth: 280, border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>💡 Daily Health Tip</div>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, margin: 0, lineHeight: 1.6 }}>{tip}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vital Signs Row */}
      <h3 style={{ marginBottom: 16, color: 'var(--text-secondary)', fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Today's Vitals</h3>
      <div className="grid-4" style={{ marginBottom: 32 }}>
        {vitalItems.map((v, i) => {
          const Icon = v.icon;
          return (
            <div className="card" key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 20px' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: v.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={20} color={v.color} />
              </div>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 2 }}>{v.label}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{v.value}</div>
                <div style={{ fontSize: 11, color: v.color, fontWeight: 600, marginTop: 2 }}>{v.status}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats Grid */}
      <h3 style={{ marginBottom: 16, color: 'var(--text-secondary)', fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Overview</h3>
      <div className="dashboard-grid" style={{ marginBottom: 32 }}>
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div className="card stat-card" key={i}>
              <div className="stat-icon" style={{ background: s.gradient, width: 44, height: 44, borderRadius: 12, marginBottom: 14 }}>
                <Icon size={20} />
              </div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.title}</div>
              <div className={`stat-change ${s.trend}`}>
                {s.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {s.change}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions + Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
        <div>
          <h3 style={{ marginBottom: 16, color: 'var(--text-secondary)', fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Quick Actions</h3>
          <div className="grid-2">
            {quickActions.map((a, i) => {
              const Icon = a.icon;
              return (
                <div className="quick-action-card" key={i} onClick={() => navigate(a.path)}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: a.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                    <Icon size={22} />
                  </div>
                  <div>
                    <h4 style={{ marginBottom: 4 }}>{a.title}</h4>
                    <p className="text-sm text-secondary" style={{ margin: 0 }}>{a.desc}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--primary-light)', fontSize: 13, fontWeight: 600, marginTop: 'auto' }}>
                    Get Started <ArrowRight size={14} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 style={{ marginBottom: 16, color: 'var(--text-secondary)', fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Recent Activity</h3>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {recentActivity.map((item, i) => {
              const Icon = item.icon;
              const colorMap = { primary: '#6366F1', pink: '#EC4899', success: '#10B981' };
              return (
                <div key={i} style={{ padding: '16px 20px', borderBottom: i < recentActivity.length - 1 ? '1px solid var(--border)' : 'none', display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `${colorMap[item.type]}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={16} color={colorMap[item.type]} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{item.text}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{item.time}</div>
                  </div>
                </div>
              );
            })}
            <div style={{ padding: '14px 20px', textAlign: 'center' }}>
              <button className="btn btn-ghost btn-block" style={{ fontSize: 13 }} onClick={() => navigate('/history')}>
                View All History
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
