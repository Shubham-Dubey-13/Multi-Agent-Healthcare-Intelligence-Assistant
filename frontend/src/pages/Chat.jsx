import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Send, Mic, Paperclip, Loader, Bot, User, Stethoscope } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../hooks/useAuth';

const SUGGESTIONS = [
  "I have a headache and fever.",
  "Can you explain this CBC blood report?",
  "What are the early signs of diabetes?",
  "I need a cardiologist near me."
];

const Chat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    { 
      role: 'ai', 
      content: 'Hello! I am MediAssist, your intelligent healthcare companion. How can I help you today?', 
      agent: 'Supervisor' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (location.state && location.state.initialPrompt) {
      // Small timeout to let component mount fully
      setTimeout(() => {
        handleSend(location.state.initialPrompt);
        // Clear state so it doesn't trigger again on reload
        navigate('/chat', { replace: true, state: {} });
      }, 500);
    }
  }, [location.state]);

  const handleSend = async (text = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage = text;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await api.chat.sendMessage(userMessage);
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: response.response,
        agent: response.agent_used
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: 'I apologize, but I am unable to connect to our secure servers right now. Please try again later.',
        isError: true 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <div className="chat-container animate-fade-in">
      
      {/* Chat Header */}
      <div className="chat-header">
        <div className="chat-avatar">
          <Stethoscope size={24} />
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>MediAssist Intelligence</h3>
          <p className="text-small text-muted" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-success)', display: 'inline-block' }}></span>
            Online • Multi-Agent System
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message-row ${msg.role}`}>
            
            <div className={`message-avatar ${msg.role}`}>
              {msg.role === 'user' ? (
                user?.avatar ? <img src={user.avatar} alt="User" style={{width: '100%', height: '100%', borderRadius: '50%'}}/> : <User size={18} />
              ) : (
                <Bot size={18} />
              )}
            </div>
            
            <div className="message-content">
              {msg.role === 'ai' && msg.agent && (
                <div className="message-agent-label">
                  {msg.agent}
                </div>
              )}
              <div className={`message-bubble ${msg.role}`} style={msg.isError ? { border: '1px solid var(--color-danger)', color: 'var(--color-danger)' } : {}}>
                {msg.content}
              </div>
            </div>

          </div>
        ))}

        {isLoading && (
          <div className="chat-message-row ai">
            <div className="message-avatar ai">
              <Bot size={18} />
            </div>
            <div className="message-content">
              <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="chat-input-area">
        {/* Suggestion Chips */}
        {messages.length <= 2 && (
          <div className="chat-suggestions">
            {SUGGESTIONS.map((suggestion, idx) => (
              <button 
                key={idx} 
                className="chat-suggestion-chip"
                onClick={() => handleSend(suggestion)}
                disabled={isLoading}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={onSubmit} className="chat-form">
          <button type="button" className="chat-action-btn" title="Upload Document">
            <Paperclip size={20} />
          </button>
          
          <input 
            type="text" 
            className="chat-input" 
            placeholder="Describe your symptoms, ask a question, or upload a report..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          
          <button type="button" className="chat-action-btn" title="Voice Input">
            <Mic size={20} />
          </button>
          
          <button type="submit" className="chat-send-btn" disabled={!input.trim() || isLoading}>
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
