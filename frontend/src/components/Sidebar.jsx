import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  ShieldAlert,
  Activity,
  Building2,
  ClipboardList,
  BookOpen,
  MessageSquare,
  Calendar,
  CloudRain,
  HardHat,
  Cpu
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Safety Monitor', icon: ShieldAlert },
  { path: '/crack-detection', label: 'Crack Detection', icon: Activity },
  { path: '/valuation', label: 'Real Estate Valuation', icon: Building2 },
  { path: '/project-planner', label: 'Project Planner', icon: ClipboardList },
  { path: '/knowledge-base', label: 'Knowledge Base', icon: BookOpen },
  { path: '/chatbot', label: 'Chatbot', icon: MessageSquare },
  { path: '/daily-assistant', label: 'Daily Site Assistant', icon: Calendar },
  { path: '/weather-advisor', label: 'Weather Advisor', icon: CloudRain },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Brand Header */}
      <div className="brand-header">
        <div className="brand-icon-box">
          <HardHat size={26} color="#ffffff" strokeWidth={2.2} />
        </div>
        <div>
          <h2 className="brand-title">
            Construct<span className="text-orange">AI</span>
          </h2>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', letterSpacing: '0.04em' }}>
            INTELLIGENCE PLATFORM
          </p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="nav-menu">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} strokeWidth={2} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer System Status */}
      <div className="sidebar-footer">
        <div>
          <span className="live-dot"></span>
          <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>AI Core v2.4</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Cpu size={14} color="var(--orange)" />
          <span style={{ fontSize: '0.7rem', color: 'var(--orange-light)', fontWeight: 600 }}>ONLINE</span>
        </div>
      </div>
    </aside>
  );
}
