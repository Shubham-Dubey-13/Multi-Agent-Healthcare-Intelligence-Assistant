import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, Search } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const PAGE_META = {
  '/': { title: 'Dashboard', subtitle: 'Your health overview at a glance' },
  '/chat': { title: 'AI Consultation', subtitle: 'Multi-agent health assistant' },
  '/upload': { title: 'Document Analysis', subtitle: 'OCR & AI-powered medical report extraction' },
  '/symptoms': { title: 'Symptom Checker', subtitle: 'AI-driven preliminary diagnosis' },
  '/risk-assessment': { title: 'Health Risk Predictor', subtitle: 'ML-based risk analysis' },
  '/reports': { title: 'Medical Reports', subtitle: 'Your generated health summaries' },
  '/history': { title: 'Health Timeline', subtitle: 'Complete interaction history' },
  '/profile': { title: 'Patient Profile', subtitle: 'Manage your health information' },
  '/bmi-calculator': { title: 'BMI Calculator', subtitle: 'Calculate & track your Body Mass Index' },
  '/medicines': { title: 'Medicine Reminders', subtitle: 'Track your medication schedule' },
};

const Header = () => {
  const location = useLocation();
  const { user } = useAuth();
  const meta = PAGE_META[location.pathname] || { title: 'MediAssist AI', subtitle: '' };

  return (
    <header className="main-header">
      <div className="page-title-area">
        <h2>{meta.title}</h2>
        {meta.subtitle && <div className="page-subtitle">{meta.subtitle}</div>}
      </div>

      <div className="header-right">
        <div className="search-bar">
          <Search size={16} className="search-icon" />
          <input type="text" placeholder="Search records..." className="search-input" />
        </div>

        <button className="icon-btn" title="Notifications">
          <Bell size={18} />
          <span className="notification-badge">2</span>
        </button>

        <img
          src={user?.avatar || `https://ui-avatars.com/api/?name=User&background=6366F1&color=fff`}
          alt={user?.name}
          style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid #6366F1', cursor: 'pointer' }}
        />
      </div>
    </header>
  );
};

export default Header;
