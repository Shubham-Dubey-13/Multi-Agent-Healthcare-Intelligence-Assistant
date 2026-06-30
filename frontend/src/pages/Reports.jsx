import React from 'react';
import { FileText, Download, Eye } from 'lucide-react';

const mockReports = [
  { id: 1, date: '2026-06-25', title: 'Comprehensive Blood Analysis', type: 'Lab Result', status: 'Analyzed' },
  { id: 2, date: '2026-05-12', title: 'Cardiology Consultation', type: 'Doctor Notes', status: 'Analyzed' },
  { id: 3, date: '2026-01-10', title: 'Annual Physical Summary', type: 'Summary', status: 'Analyzed' },
];

const Reports = () => {
  return (
    <div className="card animate-slide-up" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(6, 182, 212, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-secondary)' }}>
          <FileText size={24} />
        </div>
        <div>
          <h2 style={{ margin: 0 }}>Medical Reports</h2>
          <p style={{ margin: 0 }}>View and download your generated health summaries and uploaded files.</p>
        </div>
      </div>

      <div style={{ marginTop: '32px' }}>
        {mockReports.map((report) => (
          <div key={report.id} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            padding: '20px',
            backgroundColor: 'var(--color-bg-primary)',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '16px',
            border: '1px solid transparent',
            transition: 'var(--transition-fast)',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--color-primary-light)'}
          onMouseOut={(e) => e.currentTarget.style.borderColor = 'transparent'}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ padding: '12px', backgroundColor: 'var(--color-bg-card)', borderRadius: 'var(--radius-sm)', color: 'var(--color-primary)' }}>
                <FileText size={20} />
              </div>
              <div>
                <h4 style={{ margin: 0, color: 'var(--text-primary)' }}>{report.title}</h4>
                <div style={{ display: 'flex', gap: '16px', marginTop: '4px', fontSize: '13px', color: 'var(--text-muted)' }}>
                  <span>{report.date}</span>
                  <span>•</span>
                  <span>{report.type}</span>
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn btn-secondary" style={{ padding: '8px', borderRadius: '50%' }} title="View">
                <Eye size={18} />
              </button>
              <button className="btn btn-outline" style={{ padding: '8px', borderRadius: '50%' }} title="Download">
                <Download size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
