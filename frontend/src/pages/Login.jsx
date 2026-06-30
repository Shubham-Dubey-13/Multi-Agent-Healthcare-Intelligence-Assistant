import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Stethoscope } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login(email, password);
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
          <h1 style={{ marginTop: 20, marginBottom: 8 }}>Welcome back</h1>
          <p>Sign in to your health dashboard</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Email Address</label>
            <div className="input-with-icon">
              <Mail size={16} className="input-icon" />
              <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
            </div>
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Password</label>
            <div className="input-with-icon">
              <Lock size={16} className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{ paddingRight: 44 }}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading} style={{ marginTop: 8, padding: 14 }}>
            {loading ? 'Signing in...' : 'Sign In to Dashboard'}
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account? <a className="auth-link" href="/register">Create account</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
