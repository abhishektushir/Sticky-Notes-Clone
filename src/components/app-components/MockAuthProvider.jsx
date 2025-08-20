import React, { createContext, useContext, useState, useEffect } from 'react';

const Auth0Context = createContext(null);

export const useAuth0 = () => {
  const context = useContext(Auth0Context);
  if (!context) {
    throw new Error('useAuth0 must be used within an Auth0Provider');
  }
  return context;
};

export const MockAuth0Provider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('mockAuth0User');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const loginWithRedirect = async (options = {}) => {
    setIsLoading(true);
    
    // Simulate login process
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const connection = options?.authorizationParams?.connection;
    let mockUser;
    
    if (connection === 'google-oauth2') {
      mockUser = {
        sub: 'google-oauth2|123456789',
        email: 'user@gmail.com',
        name: 'John Doe',
        picture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
      };
    } else if (connection === 'github') {
      mockUser = {
        sub: 'github|123456789',
        email: 'user@github.com', 
        name: 'Jane Smith',
        picture: 'https://images.unsplash.com/photo-1494790108755-2616b612b8c5?w=100&h=100&fit=crop&crop=face'
      };
    } else {
      mockUser = {
        sub: 'auth0|123456789',
        email: 'demo@notekeeper.com',
        name: 'Demo User',
        picture: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face'
      };
    }
    
    setUser(mockUser);
    localStorage.setItem('mockAuth0User', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const logout = (options = {}) => {
    setUser(undefined);
    localStorage.removeItem('mockAuth0User');
    
    // Clear all user notes when logging out
    const allKeys = Object.keys(localStorage);
    allKeys.forEach(key => {
      if (key.startsWith('notes_')) {
        localStorage.removeItem(key);
      }
    });
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    loginWithRedirect,
    logout
  };

  return (
    <Auth0Context.Provider value={value}>
      {children}
    </Auth0Context.Provider>
  );
};