import React, { createContext, useState, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface AuthContextProps {
  isAuthenticated: boolean;
  login: (token: string) => void; 
  logout: () => void;
  token: string | null; 
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const login = async (newToken: string) => {
    setIsAuthenticated(true);
    setToken(newToken);
    await AsyncStorage.setItem('@token', newToken); 
  };
  
  const logout = async () => {
    setIsAuthenticated(false);
    setToken(null);
    await AsyncStorage.removeItem('@token'); 
  };
  
  const initializeToken = async () => {
    try {
      const savedToken = await AsyncStorage.getItem('@token');
      if (savedToken) {
        setToken(savedToken);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Erro ao inicializar o token:", error);
    }
  };
  
  
  React.useEffect(() => {
    initializeToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, token }}>
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
