import { Login } from '../components/auth/Login';
import { Register } from '../components/auth/Register';

type AuthPageProps = {
  type: 'login' | 'register';
};

export const AuthPage = ({ type }: AuthPageProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {type === 'login' ? <Login /> : <Register />}
    </div>
  );
};