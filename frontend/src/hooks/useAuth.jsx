import { useState, useEffect, createContext, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    } else if (token) {
      // Fallback
      setUser({
        name: 'Jane Doe',
        email: 'jane@example.com',
        avatar: 'https://ui-avatars.com/api/?name=Jane+Doe&background=5B9A8B&color=fff'
      });
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email, password, name = null) => {
    // Mock login/register
    const userName = name || email.split('@')[0];
    const encodedName = encodeURIComponent(userName);
    
    const newUser = {
      name: userName,
      email: email,
      avatar: `https://ui-avatars.com/api/?name=${encodedName}&background=5B9A8B&color=fff`
    };
    
    localStorage.setItem('token', 'mock_token_123');
    localStorage.setItem('user', JSON.stringify(newUser));
    
    setUser(newUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
