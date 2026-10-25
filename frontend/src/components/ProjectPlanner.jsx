import React, { useState } from 'react';
import { ClipboardList, Calendar, IndianRupee, Layers, CheckCircle, Sparkles } from 'lucide-react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function ProjectPlanner() {
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [plan, setPlan] = useState(null);

  const loadSampleData = () => {
    setDesc("Full structural execution plan for a 20x50 ft (1000 sq ft) G+1 RCC framed residential duplex with M25 concrete, Fe550D TMT reinforcement, and standard AAC block masonry.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8000/api/project-planner', { desc });
      setPlan(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to generate project plan. Check if backend is active.');
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
          <h1 className="page-title">CONSTRUCTION PROJECT PLANNER</h1>
          <p className="page-subtitle">AI Bill of Quantities (BOQ), Material Estimation & Milestones Scheduling</p>
        </div>
        <button type="button" onClick={loadSampleData} className="btn-sample">
          <Sparkles size={14} color="var(--orange)" />
          <span>Load 20x50 Villa Plan</span>
        </button>
      </div>

      {/* Top Brief Form */}
      <div className="glass-card" style={{ marginBottom: '1.75rem' }}>
        <h3 className="card-title">
          <ClipboardList size={20} color="var(--orange)" />
          <span>PROJECT SCOPE & SPECIFICATIONS</span>
        </h3>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Create full plan for 20x50 slab construction in Bengaluru with M25 concrete..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn-primary"
              style={{ width: 'auto', padding: '0.85rem 2rem', whiteSpace: 'nowrap' }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="spinner"></div>
                  <span>GENERATING PLAN...</span>
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  <span>GENERATE PLAN</span>
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

      {/* Plan Results Grid */}
      {plan ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.75rem' }}>
          {/* Material Estimator Table */}
          <div className="glass-card">
            <h3 className="card-title">
              <Layers size={18} color="var(--orange)" />
              <span>MATERIAL ESTIMATOR (BOQ)</span>
            </h3>

            <div style={{ overflowX: 'auto' }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Item Description</th>
                    <th>Estimated Qty</th>
                    <th>Unit Rate (₹)</th>
                    <th style={{ textAlign: 'right' }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {plan.materials?.map((m, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 600 }}>{m.item}</td>
                      <td><span className="tag-badge" style={{ fontSize: '0.75rem' }}>{m.qty}</span></td>
                      <td style={{ color: 'var(--text-muted)' }}>{m.rate}</td>
                      <td style={{ textAlign: 'right' }} className="price-metric">
                        ₹{m.amount?.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Cost & Schedule Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {/* Cost Breakdown */}
            <div className="glass-card">
              <h3 className="card-title">
                <IndianRupee size={18} color="var(--orange)" />
                <span>ESTIMATED COST BREAKDOWN</span>
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Materials Procurement</span>
                  <span className="price-metric">₹{plan.cost_breakdown?.materials?.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Skilled & Unskilled Labour</span>
                  <span className="price-metric">₹{plan.cost_breakdown?.labour?.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Finishing & MEP Fixtures</span>
                  <span className="price-metric">₹{plan.cost_breakdown?.finishing?.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.85rem 0 0 0', marginTop: '0.25rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '1.05rem', color: '#ffffff' }}>PROJECT BUDGET TOTAL</span>
                  <span style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--orange-light)', fontFamily: 'var(--font-mono)' }}>
                    ₹{plan.cost_breakdown?.total?.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Time Schedule */}
            <div className="glass-card">
              <h3 className="card-title">
                <Calendar size={18} color="var(--orange-light)" />
                <span>EXECUTION TIMELINE SCHEDULE</span>
              </h3>

              <ul className="checklist">
                {plan.schedule?.map((item, idx) => (
                  <li key={idx} className="checklist-item" style={{ justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle size={15} color="var(--success)" />
                      <span>{item.phase}</span>
                    </div>
                    <span className="tag-badge" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                      {item.duration}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-card" style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-dim)' }}>
          <ClipboardList size={48} strokeWidth={1.5} style={{ margin: '0 auto 1rem auto', opacity: 0.4 }} />
          <p style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-muted)' }}>No project plan compiled yet</p>
          <p style={{ fontSize: '0.85rem', marginTop: '0.35rem' }}>Enter construction parameters above to generate instant BOQ and Gantt schedule milestones.</p>
        </div>
      )}
    </motion.div>
  );
}
