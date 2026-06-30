import React, { useState } from 'react';
import { Pill, Plus, Trash2, Bell, Clock, CheckCircle2 } from 'lucide-react';

const FREQUENCY_OPTIONS = ['Once daily', 'Twice daily', 'Three times daily', 'Every 6 hours', 'Every 8 hours', 'As needed', 'Weekly'];
const TIME_OPTIONS = ['Morning (8:00 AM)', 'Noon (12:00 PM)', 'Afternoon (2:00 PM)', 'Evening (6:00 PM)', 'Night (9:00 PM)', 'Bedtime (10:00 PM)'];

const MOCK_MEDICINES = [
  { id: 1, name: 'Metformin 500mg', frequency: 'Twice daily', times: ['Morning (8:00 AM)', 'Evening (6:00 PM)'], condition: 'Diabetes management', refillDate: '2026-07-15', taken: true, color: '#6366F1' },
  { id: 2, name: 'Lisinopril 10mg', frequency: 'Once daily', times: ['Morning (8:00 AM)'], condition: 'Blood pressure', refillDate: '2026-07-20', taken: false, color: '#EC4899' },
  { id: 3, name: 'Vitamin D3 1000IU', frequency: 'Once daily', times: ['Morning (8:00 AM)'], condition: 'Supplement', refillDate: '2026-08-01', taken: true, color: '#F59E0B' },
];

const MedicineReminders = () => {
  const [medicines, setMedicines] = useState(MOCK_MEDICINES);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', dosage: '', frequency: 'Once daily', times: [], condition: '', refillDate: '' });
  const [activeTab, setActiveTab] = useState('today');

  const toggleTaken = (id) => setMedicines(prev => prev.map(m => m.id === id ? { ...m, taken: !m.taken } : m));
  const deleteMed = (id) => setMedicines(prev => prev.filter(m => m.id !== id));

  const handleAdd = (e) => {
    e.preventDefault();
    const colors = ['#6366F1', '#EC4899', '#10B981', '#F59E0B', '#06B6D4'];
    const newMed = { ...form, id: Date.now(), taken: false, color: colors[medicines.length % colors.length] };
    setMedicines(prev => [...prev, newMed]);
    setForm({ name: '', dosage: '', frequency: 'Once daily', times: [], condition: '', refillDate: '' });
    setShowForm(false);
  };

  const takenCount = medicines.filter(m => m.taken).length;

  return (
    <div className="animate-slide-up" style={{ maxWidth: 900, margin: '0 auto' }}>
      <div className="page-header">
        <div className="page-header-icon" style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}>
          <Pill size={24} />
        </div>
        <div>
          <h2>Medicine Reminders</h2>
          <p>Track your daily medication schedule and get timely reminders.</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="card" style={{ marginBottom: 24, padding: '20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontWeight: 600 }}>Today's Progress</span>
          <span style={{ fontWeight: 700, color: 'var(--success)' }}>{takenCount} / {medicines.length} taken</span>
        </div>
        <div className="risk-bar-track">
          <div className="risk-bar-fill" style={{ width: `${medicines.length ? (takenCount / medicines.length) * 100 : 0}%`, background: 'linear-gradient(90deg, #10B981, #059669)' }} />
        </div>
        {takenCount === medicines.length && medicines.length > 0 && (
          <div style={{ marginTop: 12, color: 'var(--success)', fontWeight: 600, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
            <CheckCircle2 size={15} /> All medications taken for today! Great job!
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div className="tabs" style={{ marginBottom: 0, flex: 1, maxWidth: 300 }}>
          {['today', 'all'].map(t => (
            <button key={t} className={`tab-btn ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>
              {t === 'today' ? "Today's Doses" : 'All Medicines'}
            </button>
          ))}
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          <Plus size={16} /> Add Medicine
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="card animate-slide-up" style={{ marginBottom: 24, borderColor: 'var(--primary)' }}>
          <h4 style={{ marginBottom: 20 }}>Add New Medicine</h4>
          <form onSubmit={handleAdd}>
            <div className="grid-2" style={{ gap: 16, marginBottom: 16 }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Medicine Name</label>
                <input className="form-control" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Paracetamol 500mg" />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Condition / Reason</label>
                <input className="form-control" value={form.condition} onChange={e => setForm({ ...form, condition: e.target.value })} placeholder="e.g. Fever, Pain relief" />
              </div>
            </div>
            <div className="grid-2" style={{ gap: 16, marginBottom: 16 }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Frequency</label>
                <select className="form-control" value={form.frequency} onChange={e => setForm({ ...form, frequency: e.target.value })}>
                  {FREQUENCY_OPTIONS.map(f => <option key={f}>{f}</option>)}
                </select>
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Refill Date</label>
                <input type="date" className="form-control" value={form.refillDate} onChange={e => setForm({ ...form, refillDate: e.target.value })} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button type="button" className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
              <button type="submit" className="btn btn-success">Add Reminder</button>
            </div>
          </form>
        </div>
      )}

      {/* Medicine cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {medicines.map(med => (
          <div key={med.id} className="card" style={{ padding: '18px 24px', display: 'flex', alignItems: 'center', gap: 20, opacity: med.taken ? 0.7 : 1, transition: 'all 0.2s' }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: `${med.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Pill size={22} color={med.color} />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <h4 style={{ margin: 0, fontSize: 15, textDecoration: med.taken ? 'line-through' : 'none', color: med.taken ? 'var(--text-muted)' : 'var(--text-primary)' }}>{med.name}</h4>
                {med.taken && <span className="badge badge-success">Taken</span>}
              </div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Bell size={11} /> {med.frequency}
                </span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Clock size={11} /> {Array.isArray(med.times) ? med.times.join(', ') : med.times}
                </span>
                {med.condition && <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>For: {med.condition}</span>}
              </div>
            </div>

            {med.refillDate && (
              <div style={{ textAlign: 'center', flexShrink: 0 }}>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Refill by</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--warning)' }}>{med.refillDate}</div>
              </div>
            )}

            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              <button className={`btn ${med.taken ? 'btn-ghost' : 'btn-success'}`} style={{ padding: '8px 14px', fontSize: 13 }} onClick={() => toggleTaken(med.id)}>
                <CheckCircle2 size={14} /> {med.taken ? 'Undo' : 'Mark Taken'}
              </button>
              <button className="btn btn-danger" style={{ padding: '8px 10px' }} onClick={() => deleteMed(med.id)}>
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicineReminders;
