const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

export const api = {
  chat: {
    sendMessage: async (message, contextType = 'general') => {
      const response = await fetch(`${API_BASE_URL}/chat/message`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ message, context_type: contextType })
      });
      if (!response.ok) throw new Error('Failed to send message');
      return response.json();
    },
    getHistory: async (conversationId) => {
      const response = await fetch(`${API_BASE_URL}/chat/history/${conversationId}`, {
        headers: getHeaders()
      });
      if (!response.ok) throw new Error('Failed to get history');
      return response.json();
    }
  },
  health: {
    analyzeSymptoms: async (data) => {
      const response = await fetch(`${API_BASE_URL}/health/analyze-symptoms`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to analyze symptoms');
      return response.json();
    },
    predictRisk: async (data) => {
      const response = await fetch(`${API_BASE_URL}/health/predict-risk`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to predict risk');
      return response.json();
    }
  },
  documents: {
    upload: async (file) => {
      const formData = new FormData();
      formData.append('file', file);
      
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/documents/upload`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData
      });
      if (!response.ok) throw new Error('Failed to upload document');
      return response.json();
    }
  }
};
