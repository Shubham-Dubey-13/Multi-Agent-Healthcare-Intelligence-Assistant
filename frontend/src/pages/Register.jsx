import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Stethoscope } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login(email, password, name);
    setLoading(false);
    navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="auth-orb1" />
      <div className="auth-orb2" />

      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <div className="logo-icon-wrapper">
              <Stethoscope size={20} color="white" />
            </div>
            <h1 className="logo-text" style={{ fontSize: 22 }}>MediAssist AI</h1>
          </div>
          <h1 style={{ marginTop: 20, marginBottom: 8 }}>Create account</h1>
          <p>Join thousands managing their health with AI</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Full Name</label>
            <div className="input-with-icon">
              <User size={16} className="input-icon" />
              <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} placeholder="Shubham Dubey" required />
            </div>
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Email Address</label>
            <div className="input-with-icon">
              <Mail size={16} className="input-icon" />
              <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
            </div>
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Password</label>
            <div className="input-with-icon" style={{ position: 'relative' }}>
              <Lock size={16} className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                required
                style={{ paddingRight: 44 }}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading} style={{ marginTop: 8, padding: 14 }}>
            {loading ? 'Creating account...' : 'Create Free Account'}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <a className="auth-link" href="/login">Sign in</a>
        </div>

        <p style={{ fontSize: 11, color: 'var(--text-muted)', textAlign: 'center', marginTop: 20, lineHeight: 1.6 }}>
          By registering, you agree to our Terms of Service. Your health data is encrypted and never shared.
        </p>
      </div>
    </div>
  );
};

export default Register;
