import React from 'react';
import { Sparkles, Terminal, ShieldCheck } from 'lucide-react';

export default function Navbar({ title = 'Construction Intelligence Command Center' }) {
  return (
    <header className="top-navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Terminal size={18} color="var(--text-dim)" />
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          WORKSPACE // <strong style={{ color: '#ffffff' }}>CONSTRUCT-AI</strong>
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          <ShieldCheck size={16} color="var(--success)" />
          <span>JSON Schema Enforced</span>
        </div>

        <div className="badge-ai-active">
          <Sparkles size={14} />
          <span>Multimodal AI Active</span>
        </div>
      </div>
    </header>
  );
}
