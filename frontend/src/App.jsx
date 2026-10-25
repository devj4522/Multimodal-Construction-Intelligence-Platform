import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import SafetyMonitor from './components/SafetyMonitor';
import CrackDetection from './components/CrackDetection';
import Valuation from './components/Valuation';
import ProjectPlanner from './components/ProjectPlanner';
import KnowledgeBase from './components/KnowledgeBase';
import ConstructionChatbot from './components/ConstructionChatbot';
import DailySiteAssistant from './components/DailySiteAssistant';
import WeatherAdvisor from './components/WeatherAdvisor';

export default function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Navigation Sidebar */}
        <Sidebar />

        {/* Main Content Workspace */}
        <div className="main-content">
          <Navbar />

          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<SafetyMonitor />} />
              <Route path="/safety" element={<SafetyMonitor />} />
              <Route path="/crack-detection" element={<CrackDetection />} />
              <Route path="/valuation" element={<Valuation />} />
              <Route path="/project-planner" element={<ProjectPlanner />} />
              <Route path="/knowledge-base" element={<KnowledgeBase />} />
              <Route path="/chatbot" element={<ConstructionChatbot />} />
              <Route path="/daily-assistant" element={<DailySiteAssistant />} />
              <Route path="/weather-advisor" element={<WeatherAdvisor />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
