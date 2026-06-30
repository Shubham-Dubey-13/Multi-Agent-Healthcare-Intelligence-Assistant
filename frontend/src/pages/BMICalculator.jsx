import React, { useState } from 'react';
import { Calculator, TrendingUp } from 'lucide-react';

const BMI_CATEGORIES = [
  { range: '< 18.5', label: 'Underweight', color: '#06B6D4', bg: 'rgba(6,182,212,0.15)', advice: 'Consider increasing caloric intake with nutrient-rich foods. Consult a dietitian.' },
  { range: '18.5 – 24.9', label: 'Normal weight', color: '#10B981', bg: 'rgba(16,185,129,0.15)', advice: 'Great job! Maintain your current diet and exercise habits.' },
  { range: '25 – 29.9', label: 'Overweight', color: '#F59E0B', bg: 'rgba(245,158,11,0.15)', advice: 'Consider a balanced diet with reduced processed foods and regular 30-min exercise.' },
  { range: '30 – 34.9', label: 'Obese (Class I)', color: '#EF4444', bg: 'rgba(239,68,68,0.15)', advice: 'Consult a doctor. Lifestyle changes including diet and exercise are recommended.' },
  { range: '≥ 35', label: 'Obese (Class II/III)', color: '#7F1D1D', bg: 'rgba(127,29,29,0.2)', advice: 'Medical evaluation strongly recommended. Significant health risks present.' },
];

const getBMICategory = (bmi) => {
  if (bmi < 18.5) return BMI_CATEGORIES[0];
  if (bmi < 25) return BMI_CATEGORIES[1];
  if (bmi < 30) return BMI_CATEGORIES[2];
  if (bmi < 35) return BMI_CATEGORIES[3];
  return BMI_CATEGORIES[4];
};

const BMICalculator = () => {
  const [unit, setUnit] = useState('metric');
  const [form, setForm] = useState({ weight: '', height: '', age: '', gender: 'male' });
  const [result, setResult] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const calculate = (e) => {
    e.preventDefault();
    let bmi;
    if (unit === 'metric') {
      const h = parseFloat(form.height) / 100;
      bmi = parseFloat(form.weight) / (h * h);
    } else {
      bmi = (703 * parseFloat(form.weight)) / (parseFloat(form.height) ** 2);
    }
    if (!isFinite(bmi) || bmi <= 0) return;
    bmi = Math.round(bmi * 10) / 10;
    const category = getBMICategory(bmi);
    // Ideal weight range (18.5-24.9 BMI) for given height
    const hm = unit === 'metric' ? parseFloat(form.height) / 100 : parseFloat(form.height) * 0.0254;
    const idealLow = Math.round(18.5 * hm * hm);
    const idealHigh = Math.round(24.9 * hm * hm);
    setResult({ bmi, category, idealLow, idealHigh });
  };

  const pct = result ? Math.min((result.bmi / 40) * 100, 100) : 0;

  return (
    <div className="animate-slide-up" style={{ maxWidth: 820, margin: '0 auto' }}>
      <div className="page-header">
        <div className="page-header-icon" style={{ background: 'linear-gradient(135deg, #06B6D4, #0284C7)' }}>
          <Calculator size={24} />
        </div>
        <div>
          <h2>BMI Calculator</h2>
          <p>Calculate your Body Mass Index and understand your health category.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: result ? '1fr 1fr' : '1fr', gap: 24 }}>
        {/* Form */}
        <div className="card">
          <div className="tabs" style={{ marginBottom: 24 }}>
            <button className={`tab-btn ${unit === 'metric' ? 'active' : ''}`} onClick={() => setUnit('metric')}>Metric (cm / kg)</button>
            <button className={`tab-btn ${unit === 'imperial' ? 'active' : ''}`} onClick={() => setUnit('imperial')}>Imperial (in / lb)</button>
          </div>

          <form onSubmit={calculate} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="grid-2">
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Weight ({unit === 'metric' ? 'kg' : 'lbs'})</label>
                <input type="number" name="weight" className="form-control" value={form.weight} onChange={handleChange} placeholder={unit === 'metric' ? '70' : '154'} required />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Height ({unit === 'metric' ? 'cm' : 'inches'})</label>
                <input type="number" name="height" className="form-control" value={form.height} onChange={handleChange} placeholder={unit === 'metric' ? '175' : '69'} required />
              </div>
            </div>
            <div className="grid-2">
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Age</label>
                <input type="number" name="age" className="form-control" value={form.age} onChange={handleChange} placeholder="30" />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Gender</label>
                <select name="gender" className="form-control" value={form.gender} onChange={handleChange}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Prefer not to say</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: 8 }}>
              <Calculator size={16} /> Calculate BMI
            </button>
          </form>

          {/* Reference table */}
          <div style={{ marginTop: 28 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>BMI Reference Chart</div>
            {BMI_CATEGORIES.map(c => (
              <div key={c.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', borderRadius: 8, marginBottom: 6, background: c.bg }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: c.color }}>{c.label}</span>
                <span style={{ fontSize: 12, color: c.color, fontWeight: 700 }}>{c.range}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className="card animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ textAlign: 'center', padding: '12px 0' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Your BMI Score</div>
              <div style={{ fontSize: 72, fontWeight: 900, letterSpacing: '-0.04em', color: result.category.color, lineHeight: 1 }}>{result.bmi}</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 12, padding: '6px 20px', borderRadius: 20, background: result.category.bg, color: result.category.color, fontWeight: 700, fontSize: 15 }}>
                {result.category.label}
              </div>
            </div>

            {/* BMI Bar */}
            <div>
              <div className="risk-bar-track" style={{ height: 16, borderRadius: 8, background: 'var(--bg-elevated)', position: 'relative', overflow: 'visible' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, #06B6D4, #10B981, #F59E0B, #EF4444)`, borderRadius: 8, transition: 'width 0.8s ease' }} />
                <div style={{ position: 'absolute', top: '50%', left: `${pct}%`, transform: 'translate(-50%, -50%)', width: 22, height: 22, borderRadius: '50%', background: result.category.color, border: '3px solid var(--bg-surface)', boxShadow: `0 0 10px ${result.category.color}` }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>
                <span>Underweight</span><span>Normal</span><span>Overweight</span><span>Obese</span>
              </div>
            </div>

            <div style={{ padding: 16, borderRadius: 12, background: `${result.category.bg}`, border: `1px solid ${result.category.color}30` }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: result.category.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Recommendation</div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>{result.category.advice}</p>
            </div>

            <div style={{ padding: 16, borderRadius: 12, background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Ideal Weight Range</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--success)' }}>{result.idealLow} – {result.idealHigh} kg</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Based on healthy BMI (18.5–24.9) for your height</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BMICalculator;
