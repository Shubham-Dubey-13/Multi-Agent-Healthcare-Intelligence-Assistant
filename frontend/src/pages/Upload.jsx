import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { api } from '../services/api';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setResult(null);
      setError(null);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setIsUploading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      // We need to fetch natively because our api service expects JSON
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/v1/documents/upload', {
        method: 'POST',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: formData
      });
      
      if (!response.ok) throw new Error('Upload failed');
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="card animate-slide-up" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2>Document Analysis</h2>
      <p style={{ marginBottom: '24px' }}>Upload your medical documents or prescriptions for automatic OCR extraction and AI analysis.</p>
      
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{ 
          border: `2px dashed ${isDragging ? 'var(--color-primary)' : 'var(--border-color)'}`, 
          borderRadius: 'var(--radius-md)', 
          padding: '48px 24px', 
          textAlign: 'center', 
          backgroundColor: isDragging ? 'rgba(79, 70, 229, 0.05)' : 'var(--color-bg-primary)',
          transition: 'all 0.2s',
          cursor: 'pointer'
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <UploadCloud size={48} color="var(--color-primary)" style={{ marginBottom: '16px' }} />
        <h3 style={{ marginBottom: '8px' }}>Drag and drop files here</h3>
        <p className="text-muted" style={{ marginBottom: '24px' }}>Supports PDF, JPG, PNG up to 20MB</p>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          style={{ display: 'none' }} 
          accept=".pdf,image/*"
        />
        <button className="btn btn-secondary">Browse Files</button>
      </div>

      {file && (
        <div style={{ marginTop: '24px', padding: '16px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-bg-sidebar)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <FileText size={24} color="var(--color-primary)" />
            <div>
              <div style={{ fontWeight: '600' }}>{file.name}</div>
              <div className="text-small text-muted">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
            </div>
          </div>
          
          <button 
            className="btn btn-primary" 
            onClick={(e) => { e.stopPropagation(); handleUpload(); }}
            disabled={isUploading}
          >
            {isUploading ? <><Loader className="animate-spin" size={16} /> Analyzing...</> : 'Analyze Document'}
          </button>
        </div>
      )}

      {error && (
        <div style={{ marginTop: '24px', padding: '16px', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <AlertCircle size={20} /> {error}
        </div>
      )}

      {result && (
        <div style={{ marginTop: '32px' }} className="animate-fade-in">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--color-success)' }}>
            <CheckCircle size={20} />
            <h3 style={{ margin: 0, color: 'inherit' }}>Analysis Complete</h3>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div style={{ padding: '20px', backgroundColor: 'var(--color-bg-primary)', borderRadius: 'var(--radius-sm)' }}>
              <h4 style={{ marginBottom: '12px', color: 'var(--color-primary-dark)' }}>Extracted Text (OCR)</h4>
              <pre style={{ whiteSpace: 'pre-wrap', fontSize: '13px', color: 'var(--text-secondary)', fontFamily: 'inherit' }}>
                {result.extracted_text}
              </pre>
            </div>
            
            <div style={{ padding: '20px', backgroundColor: 'var(--color-bg-primary)', borderRadius: 'var(--radius-sm)' }}>
              <h4 style={{ marginBottom: '12px', color: 'var(--color-primary-dark)' }}>AI Insights</h4>
              <div><strong>Document Type:</strong> {result.analysis_result?.type}</div>
              <div style={{ marginTop: '12px' }}>
                <strong>Identified Entities:</strong>
                <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                  {result.analysis_result?.entities?.map((e, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>{e}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
