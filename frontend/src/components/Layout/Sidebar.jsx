import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home, MessageCircle, UploadCloud, Activity, ShieldAlert,
  FileText, Clock, User, LogOut, Stethoscope, Calculator,
  Bell, Pill, Info
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const navSections = [
  {
    label: 'Main',
    items: [
      { path: '/', label: 'Dashboard', icon: Home, exact: true },
      { path: '/chat', label: 'AI Health Chat', icon: MessageCircle, badge: 'AI' },
    ]
  },
  {
    label: 'Tools',
    items: [
      { path: '/symptoms', label: 'Symptom Checker', icon: Activity },
      { path: '/risk-assessment', label: 'Risk Assessment', icon: ShieldAlert },
      { path: '/upload', label: 'Document Analysis', icon: UploadCloud },
      { path: '/bmi-calculator', label: 'BMI Calculator', icon: Calculator },
    ]
  },
  {
    label: 'Records',
    items: [
      { path: '/reports', label: 'Reports', icon: FileText },
      { path: '/history', label: 'Health History', icon: Clock },
      { path: '/medicines', label: 'Medicine Reminders', icon: Pill },
    ]
  },
  {
    label: 'Account',
    items: [
      { path: '/profile', label: 'Profile', icon: User },
    ]
  }
];

const Sidebar = () => {
  const { user, logout } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-icon-wrapper">
            <Stethoscope size={20} color="white" />
          </div>
          <h1 className="logo-text">MediAssist AI</h1>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navSections.map(section => (
          <div key={section.label}>
            <div className="sidebar-section-label">{section.label}</div>
            <ul>
              {section.items.map(item => {
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      end={item.exact}
                      className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
                    >
                      <Icon size={17} />
                      <span>{item.label}</span>
                      {item.badge && <span className="nav-badge">{item.badge}</span>}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile-sm">
          <img
            src={user?.avatar || `https://ui-avatars.com/api/?name=User&background=6366F1&color=fff`}
            alt={user?.name}
            className="avatar"
          />
          <div className="user-info-sm">
            <div className="user-name-sm">{user?.name || 'Patient'}</div>
            <div className="user-role-sm">Patient Account</div>
          </div>
          <button className="logout-btn" onClick={logout} title="Logout">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
