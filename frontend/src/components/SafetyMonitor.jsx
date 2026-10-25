import React, { useState } from 'react';
import { Upload, AlertTriangle, CheckCircle, FileText, X, ShieldAlert, Sparkles, AlertOctagon } from 'lucide-react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function SafetyMonitor() {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [doc, setDoc] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [result, setResult] = useState({
    hazards: [],
    risk_level: '',
    ppe: [],
    actions: [],
    missing_ppe: [],
    osha_standards: [],
    corrective_actions: [],
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadSampleData = () => {
    setText("3 workers observed on third-tier steel scaffolding without secondary fall arrest harnesses. Missing mid-rails along edge quadrant C. Loose bricks and mortar debris near the base access ladder.");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDocChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDoc(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('text', text);
    if (image) formData.append('image', image);
    if (doc) formData.append('document', doc);

    try {
      const res = await axios.post('http://localhost:8000/api/safety-monitor', formData);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to reach backend API. Check if backend is running on port 8000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="page-container"
    >
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title">SITE SAFETY MONITOR</h1>
          <p className="page-subtitle">Multimodal OSHA compliance auditor and real-time hazard detection</p>
        </div>
        <button type="button" onClick={loadSampleData} className="btn-sample">
          <Sparkles size={14} color="var(--orange)" />
          <span>Load Sample Incident</span>
        </button>
      </div>

      <div className="grid-2">
        {/* Input Column */}
        <div className="glass-card">
          <h3 className="card-title">
            <ShieldAlert size={20} color="var(--orange)" />
            <span>INPUT OBSERVATION DATA</span>
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Observation Log / Description</label>
              <textarea
                className="form-textarea"
                placeholder="Describe the scene e.g. Workers on scaffold without harness, missing edge protection..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Site Photo (Optional - Vision AI)</label>
              <label className="dropzone">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                {image ? (
                  <div className="dropzone-file-info">
                    <CheckCircle size={18} color="var(--success)" />
                    <span>{image.name}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setImage(null);
                        setImagePreview(null);
                      }}
                      style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer', marginLeft: 8 }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload size={24} color="var(--text-dim)" style={{ margin: '0 auto 8px auto', display: 'block' }} />
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Click to upload site photo (JPEG, PNG)
                    </span>
                  </div>
                )}
              </label>
              {imagePreview && (
                <div style={{ marginTop: '0.75rem', borderRadius: '8px', overflow: 'hidden', maxHeight: '160px' }}>
                  <img src={imagePreview} alt="Preview" style={{ width: '100%', objectFit: 'cover' }} />
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Safety Report / Policy Doc (Optional)</label>
              <label className="dropzone">
                <input
                  type="file"
                  accept=".pdf,.txt,.docx"
                  onChange={handleDocChange}
                  style={{ display: 'none' }}
                />
                {doc ? (
                  <div className="dropzone-file-info">
                    <FileText size={18} color="var(--orange-light)" />
                    <span>{doc.name}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setDoc(null);
                      }}
                      style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer', marginLeft: 8 }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div>
                    <FileText size={20} color="var(--text-dim)" style={{ margin: '0 auto 6px auto', display: 'block' }} />
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Attach Safety Doc or Site SOP
                    </span>
                  </div>
                )}
              </label>
            </div>

            {error && (
              <div style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', color: '#f87171', fontSize: '0.85rem', marginBottom: '1rem' }}>
                {error}
              </div>
            )}

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <div className="spinner"></div>
                  <span>RUNNING MULTIMODAL AUDIT...</span>
                </>
              ) : (
                <>
                  <AlertTriangle size={18} />
                  <span>ANALYZE HAZARDS</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Column */}
        <div className="glass-card">
          <h3 className="card-title">
            <CheckCircle size={20} color="var(--success)" />
            <span>ANALYSIS RESULTS</span>
          </h3>

          {!result.risk_level && !result.hazards.length ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-dim)' }}>
              <ShieldAlert size={48} strokeWidth={1.5} style={{ margin: '0 auto 1rem auto', opacity: 0.4 }} />
              <p style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-muted)' }}>Waiting for observation input...</p>
              <p style={{ fontSize: '0.85rem', marginTop: '0.35rem' }}>Submit observations or upload site imagery to evaluate safety parameters.</p>
            </div>
          ) : (
            <div className="result-box">
              {/* Risk Banner */}
              <div className={`status-banner ${result.risk_level?.toLowerCase().includes('high') ? 'status-halt' : 'status-caution'}`}>
                <AlertOctagon size={22} />
                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', opacity: 0.8 }}>
                    Evaluated Threat Index
                  </span>
                  <span style={{ fontSize: '1.15rem' }}>{result.risk_level || 'Evaluated Hazard'}</span>
                </div>
              </div>

              {/* Detected Hazards */}
              <div style={{ marginBottom: '1.25rem' }}>
                <span className="form-label">Identified Site Hazards</span>
                <ul className="checklist">
                  {result.hazards?.map((h, i) => (
                    <li key={i} className="checklist-item">
                      <AlertTriangle size={16} color="#ef4444" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* PPE Verification */}
              <div style={{ marginBottom: '1.25rem' }}>
                <span className="form-label">PPE Compliance Status</span>
                <div className="tags-cluster">
                  {result.ppe?.map((p, i) => (
                    <span key={i} className="tag-badge tag-success">
                      ✓ {p}
                    </span>
                  ))}
                  {result.missing_ppe?.map((mp, i) => (
                    <span key={i} className="tag-badge tag-danger">
                      ✕ MISSING: {mp}
                    </span>
                  ))}
                </div>
              </div>

              {/* OSHA Regulatory Standards */}
              {result.osha_standards?.length > 0 && (
                <div style={{ marginBottom: '1.25rem' }}>
                  <span className="form-label">Applicable Safety Standards</span>
                  <div className="tags-cluster">
                    {result.osha_standards.map((std, i) => (
                      <span key={i} className="tag-badge" style={{ background: 'rgba(59, 130, 246, 0.15)', borderColor: 'rgba(59, 130, 246, 0.3)', color: '#60a5fa' }}>
                        § {std}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Corrective Directives */}
              <div>
                <span className="form-label">Mandatory Corrective Directives</span>
                <ul className="checklist">
                  {result.corrective_actions?.map((act, i) => (
                    <li key={i} className="checklist-item">
                      <CheckCircle size={16} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
