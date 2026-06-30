import React, { useState } from 'react';
import { ShieldAlert, Activity, CheckCircle } from 'lucide-react';
import { api } from '../services/api';

const RiskAssessment = () => {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    blood_pressure: '',
    blood_sugar: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call to ML pipeline
      setTimeout(() => {
        setResult({
          diabetes: {
            level: Number(formData.blood_sugar) > 140 ? 'High' : Number(formData.age) > 45 ? 'Medium' : 'Low',
            probability: Number(formData.blood_sugar) > 140 ? 0.75 : 0.2,
            factors: ['Blood Sugar', 'Age']
          },
          cardiac: {
            level: formData.blood_pressure.startsWith('14') || formData.blood_pressure.startsWith('15') ? 'High' : 'Low',
            probability: formData.blood_pressure.startsWith('14') ? 0.65 : 0.15,
            factors: ['Blood Pressure']
          }
        });
        setLoading(false);
      }, 1500);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div className="card animate-slide-up" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(236, 72, 153, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)' }}>
          <ShieldAlert size={24} />
        </div>
        <div>
          <h2 style={{ margin: 0 }}>Health Risk Predictor</h2>
          <p style={{ margin: 0 }}>Enter your health parameters to predict potential risks using ML models.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: result ? '1fr 1fr' : '1fr', gap: '32px' }}>
        <div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label className="form-label">Age</label>
                <input type="number" name="age" className="form-control" value={formData.age} onChange={handleChange} required />
              </div>
              <div>
                <label className="form-label">Blood Pressure (e.g. 120/80)</label>
                <input type="text" name="blood_pressure" className="form-control" value={formData.blood_pressure} onChange={handleChange} required />
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label className="form-label">Weight (kg)</label>
                <input type="number" name="weight" className="form-control" value={formData.weight} onChange={handleChange} required />
              </div>
              <div>
                <label className="form-label">Height (cm)</label>
                <input type="number" name="height" className="form-control" value={formData.height} onChange={handleChange} required />
              </div>
            </div>

            <div>
              <label className="form-label">Fasting Blood Sugar (mg/dL)</label>
              <input type="number" name="blood_sugar" className="form-control" value={formData.blood_sugar} onChange={handleChange} />
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: '16px' }} disabled={loading}>
              {loading ? 'Predicting Risks...' : 'Assess Health Risks'}
            </button>
          </form>
        </div>

        {result && (
          <div className="animate-fade-in" style={{ padding: '24px', backgroundColor: 'var(--color-bg-primary)', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ marginBottom: '16px', color: 'var(--color-primary-dark)' }}>Prediction Results</h3>
            
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <strong>Type 2 Diabetes Risk</strong>
                <span style={{ 
                  color: result.diabetes.level === 'High' ? 'var(--color-danger)' : result.diabetes.level === 'Medium' ? 'var(--color-warning)' : 'var(--color-success)',
                  fontWeight: 'bold'
                }}>
                  {result.diabetes.level}
                </span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${result.diabetes.probability * 100}%`, height: '100%', backgroundColor: result.diabetes.level === 'High' ? 'var(--color-danger)' : result.diabetes.level === 'Medium' ? 'var(--color-warning)' : 'var(--color-success)' }}></div>
              </div>
              <p className="text-small text-muted" style={{ marginTop: '8px' }}>Key factors: {result.diabetes.factors.join(', ')}</p>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <strong>Cardiovascular Risk</strong>
                <span style={{ 
                  color: result.cardiac.level === 'High' ? 'var(--color-danger)' : result.cardiac.level === 'Medium' ? 'var(--color-warning)' : 'var(--color-success)',
                  fontWeight: 'bold'
                }}>
                  {result.cardiac.level}
                </span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${result.cardiac.probability * 100}%`, height: '100%', backgroundColor: result.cardiac.level === 'High' ? 'var(--color-danger)' : result.cardiac.level === 'Medium' ? 'var(--color-warning)' : 'var(--color-success)' }}></div>
              </div>
              <p className="text-small text-muted" style={{ marginTop: '8px' }}>Key factors: {result.cardiac.factors.join(', ')}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiskAssessment;
