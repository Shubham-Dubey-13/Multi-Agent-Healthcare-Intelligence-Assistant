import React from 'react';
import { User, Mail, Shield, Save } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Profile = () => {
  const { user } = useAuth();
  
  return (
    <div className="card animate-slide-up" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid var(--border-color)' }}>
        {user?.avatar ? (
          <img src={user.avatar} alt={user.name} style={{ width: '80px', height: '80px', borderRadius: '50%', boxShadow: 'var(--shadow-sm)' }} />
        ) : (
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={40} />
          </div>
        )}
        <div>
          <h2 style={{ margin: 0, fontSize: '28px' }}>{user?.name || 'Patient'}</h2>
          <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
            <Mail size={16} /> {user?.email || 'email@example.com'}
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '18px' }}>Personal Information</h3>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" defaultValue={user?.name || ''} />
          </div>
          <div className="form-group">
            <label className="form-label">Date of Birth</label>
            <input type="date" className="form-control" defaultValue="1990-01-01" />
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input type="tel" className="form-control" defaultValue="+1 (555) 000-0000" />
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '18px' }}>Health Profile</h3>
          <div className="form-group">
            <label className="form-label">Blood Type</label>
            <select className="form-control" defaultValue="O+">
              <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
              <option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Known Allergies</label>
            <input type="text" className="form-control" defaultValue="None" />
          </div>
          <div className="form-group">
            <label className="form-label">Chronic Conditions</label>
            <input type="text" className="form-control" defaultValue="None" />
          </div>
        </div>
      </div>

      <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
        <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Shield size={18} /> Update Password
        </button>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Save size={18} /> Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;
