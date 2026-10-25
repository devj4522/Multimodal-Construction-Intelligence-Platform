import React, { useState } from 'react';
import { Building2, TrendingUp, IndianRupee, Sparkles, CheckCircle, PieChart, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function Valuation() {
  const [form, setForm] = useState({
    location: '',
    area: '',
    property_type: 'Residential',
    building_age: '',
    amenities: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadSampleData = () => {
    setForm({
      location: 'Whitefield / ITPL Corridor, Bengaluru',
      area: '1850',
      property_type: 'Residential',
      building_age: '2',
      amenities: 'Clubhouse, 100% DG Backup, Covered Car Parking, Swimming Pool, Gated Security'
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));

    try {
      const response = await axios.post('http://localhost:8000/api/real-estate-valuation', formData);
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError('Valuation engine failed. Check backend connection.');
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
          <h1 className="page-title">REAL ESTATE ESTIMATOR</h1>
          <p className="page-subtitle">AI-assisted market valuation & rental yield forecasting in Indian Rupees (₹ INR)</p>
        </div>
        <button type="button" onClick={loadSampleData} className="btn-sample">
          <Sparkles size={14} color="var(--orange)" />
          <span>Load Sample Property</span>
        </button>
      </div>

      <div className="grid-2">
        {/* Input Column */}
        <div className="glass-card">
          <h3 className="card-title">
            <Building2 size={20} color="var(--orange)" />
            <span>PROPERTY DETAILS</span>
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">City / Micro-Market Location</label>
              <input
                type="text"
                name="location"
                className="form-input"
                placeholder="e.g. HSR Layout, Bengaluru / Sector 62, Noida"
                value={form.location}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Super Built-up Area (Sq. Ft)</label>
                <input
                  type="number"
                  name="area"
                  className="form-input"
                  placeholder="e.g. 1500"
                  value={form.area}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Age of Construction (Years)</label>
                <input
                  type="number"
                  name="building_age"
                  className="form-input"
                  placeholder="e.g. 3 (0 for Under-Const.)"
                  value={form.building_age}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Asset Classification</label>
              <select
                name="property_type"
                className="form-select"
                value={form.property_type}
                onChange={handleChange}
              >
                <option value="Residential">Residential (Apartment / Villa)</option>
                <option value="Commercial">Commercial (Office / Retail)</option>
                <option value="Industrial">Industrial / Warehouse</option>
                <option value="Mixed-Use">Mixed-Use Development</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Key Amenities & Infrastructure</label>
              <textarea
                name="amenities"
                className="form-textarea"
                style={{ minHeight: '80px' }}
                placeholder="e.g. Metro within 500m, DG backup, Lift, Gated campus, Swimming pool"
                value={form.amenities}
                onChange={handleChange}
              />
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
                  <span>CALCULATING INDIAN MARKET VALUATION...</span>
                </>
              ) : (
                <>
                  <IndianRupee size={18} />
                  <span>CALCULATE VALUE</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Column */}
        <div className="glass-card">
          <h3 className="card-title">
            <TrendingUp size={20} color="var(--orange-light)" />
            <span>VALUATION & YIELD METRICS</span>
          </h3>

          {!result ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-dim)' }}>
              <Building2 size={48} strokeWidth={1.5} style={{ margin: '0 auto 1rem auto', opacity: 0.4 }} />
              <p style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-muted)' }}>No valuation generated</p>
              <p style={{ fontSize: '0.85rem', marginTop: '0.35rem' }}>Provide property dimensions and location to generate pricing intelligence.</p>
            </div>
          ) : (
            <div className="result-box">
              {/* Highlight Card */}
              <div style={{ background: 'linear-gradient(135deg, rgba(255, 118, 0, 0.15), rgba(234, 88, 12, 0.05))', border: '1px solid var(--border-highlight)', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Indicative Market Value ({result.location})
                </span>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#ffffff', marginTop: 4, fontFamily: 'var(--font-mono)' }}>
                  {result.estimated_market_value}
                </div>
                <div style={{ display: 'flex', gap: '1.25rem', marginTop: 8, fontSize: '0.85rem', color: 'var(--orange-light)' }}>
                  <span>Rate: <strong>{result.price_per_sqft}</strong></span>
                </div>
              </div>

              {/* Secondary Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Gross Rental Yield</span>
                  <p style={{ color: 'var(--success)', fontWeight: 700, fontSize: '1rem', marginTop: 2 }}>{result.rental_yield}</p>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{result.monthly_rental_potential}</span>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Appreciation Forecast</span>
                  <p style={{ color: 'var(--orange-light)', fontWeight: 700, fontSize: '0.9rem', marginTop: 2 }}>{result.appreciation_outlook}</p>
                </div>
              </div>

              {/* Valuation Drivers */}
              <div>
                <span className="form-label">Core Valuation Factors</span>
                <ul className="checklist">
                  {result.factors?.map((f, i) => (
                    <li key={i} className="checklist-item">
                      <CheckCircle size={15} color="var(--success)" style={{ flexShrink: 0, marginTop: 3 }} />
                      <span>{f}</span>
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
