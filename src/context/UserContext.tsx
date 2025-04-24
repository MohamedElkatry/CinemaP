import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserContextType {
  isAuthenticated: boolean;
  token: string | null;
  userName: string | null;
  login: (token: string, name: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [userName, setUserName] = useState<string | null>(localStorage.getItem('userName'));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);

  const login = (newToken: string, name: string) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('userName', name);
    setToken(newToken);
    setUserName(name);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setToken(null);
    setUserName(null);
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider value={{ isAuthenticated, token, userName, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 