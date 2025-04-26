import { createContext, useContext, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type AuthContextType = {
  user: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, password: string) => Promise<void>;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(localStorage.getItem('taskmaster-user'));
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (username: string, password: string): Promise<void> => {
    try {
      const usersJSON = localStorage.getItem('taskmaster-users');
      const users: { username: string; password: string }[] = usersJSON ? JSON.parse(usersJSON) : [];
      const validUser = users.find(u => u.username === username && u.password === password);

      if (!validUser) {
        throw new Error('Credenciales incorrectas');
      }

      setUser(username);
      localStorage.setItem('taskmaster-user', username);
      setError(null);
      navigate('/dashboard');
    } catch (err) {
      setError('Credenciales incorrectas');
      throw err;
    }
  };

  const register = async (username: string, password: string): Promise<void> => {
    try {
      const usersJSON = localStorage.getItem('taskmaster-users');
      const users: { username: string; password: string }[] = usersJSON ? JSON.parse(usersJSON) : [];

      if (users.some(u => u.username === username)) {
        throw new Error('El usuario ya existe');
      }

      const newUsers = [...users, { username, password }];
      localStorage.setItem('taskmaster-users', JSON.stringify(newUsers));
      setUser(username);
      localStorage.setItem('taskmaster-user', username);
      setError(null);
      navigate('/dashboard');
    } catch (err) {
      setError('Error al registrar');
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('taskmaster-user');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};