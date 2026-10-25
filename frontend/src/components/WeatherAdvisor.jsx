import React, { useState } from 'react';
import { CloudRain, Sun, Wind, Umbrella, AlertTriangle, CheckCircle, AlertOctagon, Sparkles } from 'lucide-react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function WeatherAdvisor() {
  const [activity, setActivity] = useState('Slab Casting / Concreting');
  const [weather, setWeather] = useState('Overcast with Intermittent Drizzle');
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadScenario = (act, wth) => {
    setActivity(act);
    setWeather(wth);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post('http://localhost:8000/api/weather-advisor', {
        activity,
        weather
      });
      setAdvice(res.data);
    } catch (err) {
      console.error(err);
      setError('Weather advisory query failed. Ensure backend service is running on port 8000.');
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
          <h1 className="page-title">WEATHER ADVISOR</h1>
          <p className="page-subtitle">AI-powered meteorological impact assessment and GO / NO-GO decision engine</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={() => loadScenario('High-Elevation Scaffold Dismantling', 'Severe Wind Gusts (>45 km/h)')}
            className="btn-sample"
          >
            <Wind size={14} color="var(--orange)" />
            <span>High Wind Test</span>
          </button>
          <button
            type="button"
            onClick={() => loadScenario('Ready-Mix Slab Pour', 'Heavy Monsoon Rain')}
            className="btn-sample"
          >
            <CloudRain size={14} color="var(--orange)" />
            <span>Heavy Rain Test</span>
          </button>
        </div>
      </div>

      <div className="grid-2">
        {/* Input Column */}
        <div className="glass-card">
          <h3 className="card-title">
            <CloudRain size={20} color="var(--orange)" />
            <span>CHECK WEATHER IMPACT</span>
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Planned Construction Task</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Slab Conversion, Crane Hoisting, Exterior Painting, Deep Trenching"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Current / Forecasted Weather Condition</label>
              <select
                className="form-select"
                value={weather}
                onChange={(e) => setWeather(e.target.value)}
              >
                <option value="Overcast with Intermittent Drizzle">Overcast with Intermittent Drizzle</option>
                <option value="Heavy Monsoon Rain / Waterlogging">Heavy Monsoon Rain / Waterlogging</option>
                <option value="Severe Wind Gusts (>45 km/h)">Severe Wind Gusts (&gt;45 km/h)</option>
                <option value="Extreme Summer Heat (>40°C)">Extreme Summer Heat (&gt;40°C)</option>
                <option value="Clear Sky & Moderate Humidity (Optimal)">Clear Sky &amp; Moderate Humidity (Optimal)</option>
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
                  <span>RUNNING WEATHER SIMULATION...</span>
                </>
              ) : (
                <>
                  <Umbrella size={18} />
                  <span>CHECK FEASIBILITY</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Column */}
        <div className="glass-card">
          <h3 className="card-title">
            <CheckCircle size={20} color="var(--success)" />
            <span>DECISION & FEASIBILITY REPORT</span>
          </h3>

          {!advice ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-dim)' }}>
              <Umbrella size={48} strokeWidth={1.5} style={{ margin: '0 auto 1rem auto', opacity: 0.4 }} />
              <p style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-muted)' }}>No weather audit executed</p>
              <p style={{ fontSize: '0.85rem', marginTop: '0.35rem' }}>Select planned operations and meteorological conditions to test GO/NO-GO clearance.</p>
            </div>
          ) : (
            <div className="result-box">
              {/* Feasibility Banner */}
              <div className={`status-banner ${advice.status_code === 'halt' ? 'status-halt' : advice.status_code === 'go' ? 'status-go' : 'status-caution'}`}>
                {advice.status_code === 'halt' ? <AlertOctagon size={24} /> : advice.status_code === 'go' ? <CheckCircle size={24} /> : <AlertTriangle size={24} />}
                <div>
                  <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', opacity: 0.8 }}>
                    Operation Clearance Verdict
                  </span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>{advice.recommendation}</span>
                </div>
              </div>

              {/* Reasoning */}
              <div style={{ marginBottom: '1.25rem' }}>
                <span className="form-label">Meteorological Impact Rationale</span>
                <p style={{ color: '#e2e8f0', fontSize: '0.92rem', lineHeight: 1.55 }}>{advice.reasoning}</p>
              </div>

              {/* Identified Hazards */}
              <div style={{ marginBottom: '1.25rem' }}>
                <span className="form-label">Weather-Induced Hazards</span>
                <div className="tags-cluster">
                  {advice.hazards?.map((h, idx) => (
                    <span key={idx} className="tag-badge" style={{ background: 'rgba(245, 158, 11, 0.12)', borderColor: 'rgba(245, 158, 11, 0.3)', color: '#fbbf24' }}>
                      ⚠ {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Required Precautions */}
              <div>
                <span className="form-label">Mandatory Mitigation Steps</span>
                <ul className="checklist">
                  {advice.precautions?.map((p, idx) => (
                    <li key={idx} className="checklist-item">
                      <CheckCircle size={16} color="var(--success)" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span>{p}</span>
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
