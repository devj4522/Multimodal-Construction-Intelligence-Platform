import React, { useState } from 'react';
import { Upload, Activity, AlertOctagon, Wrench, CheckCircle, Sparkles, X, Layers } from 'lucide-react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function CrackDetection() {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadSampleData = () => {
    setText("Diagonal 45-degree crack observed near the beam-column joint on the 2nd floor exterior wall. Crack width is approximately 3.2mm, propagating downward toward the plinth band.");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('text', text);
    if (image) formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:8000/api/crack-detection', formData);
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError('Diagnosis failed. Ensure backend server is active on port 8000.');
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
          <h1 className="page-title">STRUCTURAL CRACK DIAGNOSIS</h1>
          <p className="page-subtitle">Computer vision & structural engineering reasoning for failure prevention</p>
        </div>
        <button type="button" onClick={loadSampleData} className="btn-sample">
          <Sparkles size={14} color="var(--orange)" />
          <span>Load Sample Crack Spec</span>
        </button>
      </div>

      <div className="grid-2">
        {/* Input Column */}
        <div className="glass-card">
          <h3 className="card-title">
            <Activity size={20} color="var(--orange)" />
            <span>INPUT CRACK TELEMETRY</span>
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Visual Description & Orientation</label>
              <textarea
                className="form-textarea"
                placeholder="Describe crack location, orientation (vertical, horizontal, diagonal), width, and structural member..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">High-Resolution Crack Image (Vision Analysis)</label>
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
                      Upload close-up photo of crack or concrete spall
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

            {error && (
              <div style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', color: '#f87171', fontSize: '0.85rem', marginBottom: '1rem' }}>
                {error}
              </div>
            )}

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <div className="spinner"></div>
                  <span>ANALYZING CRACK GEOMETRY...</span>
                </>
              ) : (
                <>
                  <Activity size={18} />
                  <span>RUN DIAGNOSIS</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Column */}
        <div className="glass-card">
          <h3 className="card-title">
            <Layers size={20} color="var(--orange-light)" />
            <span>STRUCTURAL HEALTH EVALUATION</span>
          </h3>

          {!result ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-dim)' }}>
              <AlertOctagon size={48} strokeWidth={1.5} style={{ margin: '0 auto 1rem auto', opacity: 0.4 }} />
              <p style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-muted)' }}>No crack telemetry evaluated</p>
              <p style={{ fontSize: '0.85rem', marginTop: '0.35rem' }}>Upload crack photography or structural notes to run severity assessment.</p>
            </div>
          ) : (
            <div className="result-box">
              <div className="status-banner status-caution">
                <AlertOctagon size={24} />
                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', opacity: 0.8 }}>
                    Diagnosed Classification
                  </span>
                  <span style={{ fontSize: '1.15rem', color: '#ffffff' }}>{result.crack_type}</span>
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <span className="form-label">Severity Assessment</span>
                <p style={{ color: '#fbbf24', fontWeight: 600, fontSize: '0.92rem' }}>{result.severity}</p>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <span className="form-label">Probable Structural Mechanisms</span>
                <ul className="checklist">
                  {result.probable_causes?.map((cause, i) => (
                    <li key={i} className="checklist-item">
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--orange)', marginTop: 7, flexShrink: 0 }}></div>
                      <span>{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <span className="form-label">Associated Structural Risks</span>
                <div className="tags-cluster">
                  {result.potential_risks?.map((risk, i) => (
                    <span key={i} className="tag-badge tag-danger">
                      ⚠ {risk}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="form-label">Recommended Remediation & Repair</span>
                <ul className="checklist">
                  {result.repair_methods?.map((m, i) => (
                    <li key={i} className="checklist-item">
                      <Wrench size={15} color="var(--success)" style={{ flexShrink: 0, marginTop: 3 }} />
                      <span>{m}</span>
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
