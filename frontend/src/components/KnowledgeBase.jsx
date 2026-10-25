import React, { useState } from 'react';
import { BookOpen, Shield, Hammer, FileCheck, CheckCircle, Sparkles, Send } from 'lucide-react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function KnowledgeBase() {
  const [activeTab, setActiveTab] = useState('safety');
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const tabs = [
    { id: 'safety', label: 'SAFETY', icon: Shield },
    { id: 'technique', label: 'TECHNIQUE', icon: Hammer },
    { id: 'doc_gen', label: 'DOC GEN', icon: FileCheck },
  ];

  const sampleQueries = {
    safety: 'Detailed protocol for erecting mobile tower scaffolding higher than 5 meters.',
    technique: 'Proper compaction and curing procedure for M30 column casting in hot weather.',
    doc_gen: 'Generate standardized Daily Progress Report (DPR) format with subcontractor checklist.'
  };

  const handleTabChange = (id) => {
    setActiveTab(id);
    setQuery(sampleQueries[id] || '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8000/api/knowledge-assistant', {
        category: activeTab,
        query: query || sampleQueries[activeTab]
      });
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError('Knowledge query failed. Check backend connection.');
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
          <h1 className="page-title">KNOWLEDGE ASSISTANT</h1>
          <p className="page-subtitle">Civil engineering codes (IS 456, NBC 2016, OSHA) and technical construction standards</p>
        </div>
      </div>

      <div className="glass-card" style={{ marginBottom: '1.75rem' }}>
        {/* Category Tabs */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => handleTabChange(t.id)}
                style={{
                  background: isActive ? 'linear-gradient(135deg, #ff7600, #ea580c)' : 'rgba(255,255,255,0.04)',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  border: isActive ? '1px solid transparent' : '1px solid var(--border-subtle)',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={16} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Query Input */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Technical Query / Subject</label>
            <textarea
              className="form-textarea"
              style={{ minHeight: '90px' }}
              placeholder={activeTab === 'safety' ? 'e.g. Steps for scaffolding safety and green tag inspection...' : activeTab === 'technique' ? 'e.g. Clear cover and lap length requirements for beams...' : 'e.g. Generate daily concrete pour inspection checklist...'}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              type="button"
              onClick={() => setQuery(sampleQueries[activeTab])}
              className="btn-sample"
            >
              <Sparkles size={14} color="var(--orange)" />
              <span>Use Recommended Topic</span>
            </button>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: 'auto', padding: '0.75rem 2rem' }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="spinner"></div>
                  <span>QUERYING CODEX...</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>ASK EXPERT</span>
                </>
              )}
            </button>
          </div>
        </form>

        {error && (
          <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', color: '#f87171', fontSize: '0.85rem' }}>
            {error}
          </div>
        )}
      </div>

      {/* Result Display */}
      {result && (
        <div className="glass-card">
          <h3 className="card-title">
            <BookOpen size={20} color="var(--orange)" />
            <span>{result.title}</span>
          </h3>

          <div style={{ marginBottom: '1.25rem' }}>
            <span className="form-label">Engineering Guidelines & Best Practices</span>
            <ul className="checklist">
              {result.guidelines?.map((item, idx) => (
                <li key={idx} className="checklist-item">
                  <CheckCircle size={16} color="var(--success)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
            <div>
              <span className="form-label">Governing Code Provisions</span>
              <div className="tags-cluster">
                {result.regulatory_codes?.map((code, i) => (
                  <span key={i} className="tag-badge" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', borderColor: 'rgba(59, 130, 246, 0.3)' }}>
                    {code}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="form-label">Standard Document Form</span>
              <p style={{ color: 'var(--orange-light)', fontSize: '0.88rem', fontWeight: 600 }}>
                📄 {result.sample_document}
              </p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
