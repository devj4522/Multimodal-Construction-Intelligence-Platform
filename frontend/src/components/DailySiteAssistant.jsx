import React, { useState } from 'react';
import { Calendar, CheckCircle, AlertTriangle, Hammer, Users, Sparkles, ShieldAlert } from 'lucide-react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function DailySiteAssistant() {
  const [activity, setActivity] = useState('Concreting');
  const [labour, setLabour] = useState(12);
  const [condition, setCondition] = useState('Normal');
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadSample = () => {
    setActivity('RCC Slab Pouring (3rd Floor)');
    setLabour(16);
    setCondition('Normal');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post('http://localhost:8000/api/site-assistant', {
        activity,
        labour_count: parseInt(labour, 10),
        site_condition: condition
      });
      setPlan(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to generate today\'s site plan. Check backend service.');
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
          <h1 className="page-title">DAILY SITE ASSISTANT</h1>
          <p className="page-subtitle">Automated work coordination, resource assignment, and shift safety briefings</p>
        </div>
        <button type="button" onClick={loadSample} className="btn-sample">
          <Sparkles size={14} color="var(--orange)" />
          <span>Load Sample Shift Spec</span>
        </button>
      </div>

      <div className="grid-2">
        {/* Input Column */}
        <div className="glass-card">
          <h3 className="card-title">
            <Calendar size={20} color="var(--orange)" />
            <span>DAILY SHIFT INPUT</span>
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Planned Primary Activity</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Concreting, Formwork Shuttering, Brickwork, Plastering"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Available Labour Workforce Count</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="number"
                  className="form-input"
                  min="1"
                  max="500"
                  value={labour}
                  onChange={(e) => setLabour(e.target.value)}
                  required
                />
                <Users size={16} color="var(--text-dim)" style={{ position: 'absolute', right: 12, top: 14 }} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Site Working Condition</label>
              <select
                className="form-select"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              >
                <option value="Normal">Normal Operational Conditions</option>
                <option value="Congested / Restricted Access">Congested / Restricted Access</option>
                <option value="Elevated Heights & Windy">Elevated Heights & Windy</option>
                <option value="Extreme Heat / Summer Day">Extreme Heat / Summer Day</option>
                <option value="Overcast / High Humidity">Overcast / High Humidity</option>
              </select>
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
                  <span>OPTIMIZING SHIFT PLAN...</span>
                </>
              ) : (
                <>
                  <Hammer size={18} />
                  <span>GENERATE TODAY'S PLAN</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Column */}
        <div className="glass-card">
          <h3 className="card-title">
            <CheckCircle size={20} color="var(--success)" />
            <span>TODAY'S EXECUTION PLAN</span>
          </h3>

          {!plan ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-dim)' }}>
              <Calendar size={48} strokeWidth={1.5} style={{ margin: '0 auto 1rem auto', opacity: 0.4 }} />
              <p style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-muted)' }}>No shift plan generated</p>
              <p style={{ fontSize: '0.85rem', marginTop: '0.35rem' }}>Select task and manpower count to compile prioritized shift execution steps.</p>
            </div>
          ) : (
            <div className="result-box">
              {/* Daily Tasks */}
              <div style={{ marginBottom: '1.25rem' }}>
                <span className="form-label">Prioritized Shift Tasks</span>
                <ul className="checklist">
                  {plan.tasks?.map((t, idx) => (
                    <li key={idx} className="checklist-item">
                      <CheckCircle size={16} color="var(--success)" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Safety Checks */}
              <div style={{ marginBottom: '1.25rem' }}>
                <span className="form-label">Mandatory Pre-Shift Safety Checks</span>
                <div className="tags-cluster">
                  {plan.safety_checks?.map((chk, idx) => (
                    <span key={idx} className="tag-badge" style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#34d399', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
                      🛡 {chk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Risk Alerts */}
              <div>
                <span className="form-label">Operational Risk Warnings</span>
                <ul className="checklist">
                  {plan.risk_alerts?.map((alert, idx) => (
                    <li key={idx} className="checklist-item">
                      <AlertTriangle size={16} color="#ef4444" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{ color: '#fca5a5' }}>{alert}</span>
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
