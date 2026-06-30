import React from 'react';
import { Clock, Activity, MessageCircle, FileText } from 'lucide-react';

const mockHistory = [
  { id: 1, date: 'Today, 10:30 AM', type: 'chat', title: 'Consultation about Migraines', icon: MessageCircle, color: 'var(--color-primary)' },
  { id: 2, date: 'Yesterday, 2:15 PM', type: 'upload', title: 'Uploaded CBC Blood Report', icon: FileText, color: 'var(--color-secondary)' },
  { id: 3, date: 'Jun 25, 2026', type: 'risk', title: 'Completed Cardiac Risk Assessment', icon: Activity, color: 'var(--color-accent)' },
  { id: 4, date: 'May 12, 2026', type: 'chat', title: 'Analyzed flu symptoms', icon: MessageCircle, color: 'var(--color-primary)' },
];

const History = () => {
  return (
    <div className="card animate-slide-up" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(79, 70, 229, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
          <Clock size={24} />
        </div>
        <div>
          <h2 style={{ margin: 0 }}>Health Timeline</h2>
          <p style={{ margin: 0 }}>Your complete history of interactions and assessments.</p>
        </div>
      </div>

      <div style={{ position: 'relative', paddingLeft: '24px' }}>
        {/* Timeline line */}
        <div style={{ position: 'absolute', left: '24px', top: '24px', bottom: '24px', width: '2px', backgroundColor: 'var(--border-color)' }}></div>
        
        {mockHistory.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={item.id} style={{ position: 'relative', marginBottom: index === mockHistory.length - 1 ? 0 : '32px', paddingLeft: '32px' }}>
              {/* Timeline dot */}
              <div style={{ 
                position: 'absolute', 
                left: '-11px', 
                top: '0', 
                width: '24px', 
                height: '24px', 
                borderRadius: '50%', 
                backgroundColor: item.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                boxShadow: '0 0 0 4px var(--color-bg-card)'
              }}>
                <Icon size={12} />
              </div>
              
              <div style={{ backgroundColor: 'var(--color-bg-primary)', padding: '20px', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: '500' }}>{item.date}</div>
                <div style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '16px' }}>{item.title}</div>
                <button className="btn btn-outline" style={{ marginTop: '12px', padding: '6px 12px', fontSize: '12px' }}>
                  View Details
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default History;
