import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {}
      <img 
        src="public/logoInicio.png" 
        alt="Logo TaskMaster" 
        className="w-24 h-24 mb-4"
      />
      
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Gestor de Tareas</h1>
      
      <div className="space-y-4 w-full max-w-xs">
        <Link
          to="/login"
          className="block w-full bg-blue-600 text-white text-center py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Iniciar Sesión
        </Link>
        <Link
          to="/register"
          className="block w-full bg-white text-gray-800 text-center py-3 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          Registrarse
        </Link>
      </div>

      {}
      <div className="mt-8 text-sm text-gray-500">
        v.1.0 © <span className="font-medium">Santiago Mendoza Meneses</span>
      </div>
    </div>
  );
};
