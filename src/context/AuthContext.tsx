import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type UserCredentials = {
  username: string;
  password: string;
};

type AuthContextType = {
  user: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('taskmaster-user');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = async (username: string, password: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const usersJSON = localStorage.getItem('taskmaster-users');
        const users: UserCredentials[] = usersJSON ? JSON.parse(usersJSON) : [];
        
        const validUser = users.find(u => u.username === username && u.password === password);
        
        if (validUser) {
          setUser(username);
          localStorage.setItem('taskmaster-user', username);
          navigate('/dashboard');
          resolve();
        } else {
          reject(new Error('Credenciales incorrectas'));
        }
      }, 500);
    });
  };

  const register = async (username: string, password: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const usersJSON = localStorage.getItem('taskmaster-users');
        const users: UserCredentials[] = usersJSON ? JSON.parse(usersJSON) : [];
        
        if (users.some(u => u.username === username)) {
          reject(new Error('El usuario ya existe'));
        } else {
          const newUsers = [...users, { username, password }];
          localStorage.setItem('taskmaster-users', JSON.stringify(newUsers));
          setUser(username);
          localStorage.setItem('taskmaster-user', username);
          navigate('/dashboard');
          resolve();
        }
      }, 500);
    });
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('taskmaster-user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
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