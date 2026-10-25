import React, { useState } from 'react';
import { MessageSquare, Send, Bot, User, Sparkles, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function ConstructionChatbot() {
  const [query, setQuery] = useState('');
  const [conversation, setConversation] = useState([
    {
      role: 'ai',
      text: 'Hello! I am ConstructAI Copilot. How can I assist you with your construction engineering, concrete specs, safety codes, or project planning queries today?',
      suggestions: ['ASK A QUESTION', 'GET A CONSTRUCTION TIP', 'DISCUSS A PROJECT']
    }
  ]);
  const [loading, setLoading] = useState(false);

  const quickPrompts = [
    'What is the recommended curing duration for OPC 53 vs PPC concrete under IS 456?',
    'What are the minimum safety guardrail heights required for scaffold staging?',
    'What is the typical civil construction cost per sq ft for high-rise residential in India?'
  ];

  const handleSend = async (messageText) => {
    const textToSend = messageText || query;
    if (!textToSend.trim()) return;

    const userMsg = { role: 'user', text: textToSend };
    setConversation((prev) => [...prev, userMsg]);
    setLoading(true);
    setQuery('');

    try {
      const res = await axios.post('http://localhost:8000/api/chatbot', { query: userMsg.text });
      const aiMsg = {
        role: 'ai',
        text: res.data.reply,
        suggestions: res.data.action_suggestions || []
      };
      setConversation((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
      setConversation((prev) => [
        ...prev,
        { role: 'ai', text: 'Sorry, I encountered an error contacting the AI reasoning engine. Please ensure backend is running.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend();
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
          <h1 className="page-title">CONSTRUCTION CHATBOT</h1>
          <p className="page-subtitle">Interactive AI Copilot for Site Engineers, Contractors & Estimators</p>
        </div>
      </div>

      <div className="glass-card chat-window">
        {/* Messages Stream */}
        <div className="chat-messages">
          {conversation.map((msg, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                {msg.role === 'ai' ? (
                  <>
                    <Bot size={14} color="var(--orange)" />
                    <span style={{ fontWeight: 600, color: 'var(--orange-light)' }}>ConstructAI</span>
                  </>
                ) : (
                  <>
                    <User size={14} color="var(--text-muted)" />
                    <span style={{ fontWeight: 600 }}>You</span>
                  </>
                )}
              </div>

              <div className={`chat-bubble ${msg.role}`}>
                <p style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>

                {/* Suggestions Chips */}
                {msg.suggestions?.length > 0 && (
                  <div style={{ marginTop: '0.85rem', display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                    {msg.suggestions.map((sug, sIdx) => (
                      <button
                        key={sIdx}
                        type="button"
                        onClick={() => handleSend(sug)}
                        style={{
                          background: 'rgba(255, 118, 0, 0.12)',
                          border: '1px solid rgba(255, 118, 0, 0.3)',
                          color: '#ff9130',
                          padding: '0.3rem 0.65rem',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <span>{sug}</span>
                        <ArrowRight size={12} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              <div className="spinner"></div>
              <span>ConstructAI reasoning...</span>
            </div>
          )}
        </div>

        {/* Quick Prompts Bar */}
        <div style={{ padding: '0.5rem 0', display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
          {quickPrompts.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSend(p)}
              className="btn-sample"
              style={{ whiteSpace: 'nowrap' }}
            >
              <Sparkles size={12} color="var(--orange)" />
              <span>{p.substring(0, 40)}...</span>
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSubmit} className="chat-input-bar">
          <input
            type="text"
            className="form-input"
            placeholder="Type your construction question or technical problem..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="btn-primary"
            style={{ width: 'auto', padding: '0 1.5rem' }}
            disabled={loading || !query.trim()}
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </motion.div>
  );
}
