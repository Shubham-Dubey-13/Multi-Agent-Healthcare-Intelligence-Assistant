import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ArrowRight, CheckCircle2, Search } from 'lucide-react';

const SYMPTOM_GROUPS = {
  'General': ['Fever', 'Fatigue', 'Chills', 'Night Sweats', 'Weight Loss', 'Loss of Appetite'],
  'Head & Throat': ['Headache', 'Sore Throat', 'Stuffy Nose', 'Loss of Taste/Smell', 'Earache', 'Dizziness'],
  'Chest & Breathing': ['Cough', 'Shortness of Breath', 'Chest Pain', 'Wheezing', 'Rapid Heartbeat'],
  'Stomach': ['Nausea', 'Vomiting', 'Diarrhea', 'Abdominal Pain', 'Bloating', 'Heartburn'],
  'Skin & Muscles': ['Rash', 'Itching', 'Muscle Ache', 'Joint Pain', 'Swelling'],
};

const SEVERITY_COLORS = {
  Mild: { bg: 'rgba(16,185,129,0.15)', text: '#10B981', border: 'rgba(16,185,129,0.3)' },
  Moderate: { bg: 'rgba(245,158,11,0.15)', text: '#F59E0B', border: 'rgba(245,158,11,0.3)' },
  Severe: { bg: 'rgba(239,68,68,0.15)', text: '#EF4444', border: 'rgba(239,68,68,0.3)' },
};

const SymptomChecker = () => {
  const [selected, setSelected] = useState([]);
  const [severity, setSeverity] = useState('Mild');
  const [duration, setDuration] = useState('1-2 days');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const toggle = (s) => {
    setSelected(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const handleAnalyze = () => {
    if (!selected.length) return;
    navigate('/chat', {
      state: {
        initialPrompt: `I need a medical assessment. I have been experiencing the following symptoms: ${selected.join(', ')}. Severity: ${severity}. Duration: ${duration}. Please analyze these symptoms, suggest what conditions might be causing them, and recommend what type of specialist I should see.`
      }
    });
  };

  const sev = SEVERITY_COLORS[severity];

  return (
    <div className="animate-slide-up" style={{ maxWidth: 900, margin: '0 auto' }}>
      <div className="page-header">
        <div className="page-header-icon" style={{ background: 'linear-gradient(135deg, #EC4899, #F43F5E)' }}>
          <Activity size={24} />
        </div>
        <div>
          <h2>AI Symptom Checker</h2>
          <p>Select your symptoms and our multi-agent AI will provide a preliminary assessment.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24 }}>
        {/* Left: Symptom selector */}
        <div>
          <div className="card" style={{ marginBottom: 20 }}>
            <div className="input-with-icon">
              <Search size={16} className="input-icon" />
              <input
                className="form-control"
                placeholder="Search symptoms..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {Object.entries(SYMPTOM_GROUPS).map(([group, symptoms]) => {
            const filtered = symptoms.filter(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
            if (!filtered.length) return null;
            return (
              <div key={group} className="card" style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
                  {group}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {filtered.map(s => (
                    <button
                      key={s}
                      className={`symptom-chip ${selected.includes(s) ? 'selected' : ''}`}
                      onClick={() => toggle(s)}
                    >
                      {selected.includes(s) && <CheckCircle2 size={13} />}
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Summary + Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Severity */}
          <div className="card">
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 14 }}>Severity Level</div>
            {['Mild', 'Moderate', 'Severe'].map(lv => (
              <button
                key={lv}
                onClick={() => setSeverity(lv)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  width: '100%', padding: '10px 14px', borderRadius: 10, marginBottom: 8,
                  border: `1px solid ${severity === lv ? SEVERITY_COLORS[lv].border : 'var(--border)'}`,
                  background: severity === lv ? SEVERITY_COLORS[lv].bg : 'transparent',
                  color: severity === lv ? SEVERITY_COLORS[lv].text : 'var(--text-secondary)',
                  fontWeight: 600, fontSize: 14, transition: 'all 0.2s',
                }}
              >
                {lv}
                {severity === lv && <CheckCircle2 size={15} />}
              </button>
            ))}
          </div>

          {/* Duration */}
          <div className="card">
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 12 }}>Duration</div>
            <select className="form-control" value={duration} onChange={e => setDuration(e.target.value)}>
              {['Less than 1 day', '1-2 days', '3-5 days', '1 week', '2 weeks', 'More than 2 weeks'].map(d => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Selected symptoms */}
          <div className="card">
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 12 }}>
              Selected ({selected.length})
            </div>
            {selected.length === 0 ? (
              <p className="text-sm text-muted" style={{ textAlign: 'center', padding: '12px 0' }}>No symptoms selected yet</p>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                {selected.map(s => (
                  <span key={s} className="badge badge-primary" style={{ cursor: 'pointer' }} onClick={() => toggle(s)}>
                    {s} ×
                  </span>
                ))}
              </div>
            )}
            <button
              className="btn btn-accent btn-block"
              disabled={selected.length === 0}
              onClick={handleAnalyze}
            >
              Analyze with AI <ArrowRight size={16} />
            </button>
          </div>

          {/* Disclaimer */}
          <div style={{ padding: 14, borderRadius: 12, background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', fontSize: 12, color: 'var(--warning)', lineHeight: 1.6 }}>
            ⚠️ This tool provides general information only. Always consult a qualified healthcare provider for medical advice.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;
