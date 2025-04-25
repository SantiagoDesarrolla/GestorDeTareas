import { useAuth } from '../context/AuthContext';

export const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Bienvenido, {user}!</h1>
          <button
            onClick={logout}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
          >
            Cerrar Sesión
          </button>
        </header>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Gestor de Tareas</h2>
          <p className="text-gray-600">Aquí irá el contenido del dashboard...</p>
        </div>
      </div>
    </div>
  );
};