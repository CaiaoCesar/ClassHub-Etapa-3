import React, { createContext, useState, useContext, ReactNode } from 'react';

// Definindo o tipo para o contexto
type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

// Criando o contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Criando o provedor do contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};