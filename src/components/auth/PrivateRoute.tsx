import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  
  // Si no hay usuario, redirige al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si hay usuario, muestra el contenido protegido
  return children;
};