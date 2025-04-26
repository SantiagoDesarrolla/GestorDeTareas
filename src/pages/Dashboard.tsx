import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import { TaskForm } from '../components/tasks/TaskForm';
import { TaskList } from '../components/tasks/TaskList';

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const { error } = useTasks(); // <-- Obtén el error del contexto

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Bienvenid@, {user}!</h1>
          <button onClick={logout} className="bg-red-500 text-white py-2 px-4 rounded-md">
            Cerrar Sesión
          </button>
        </header>

        {error && ( // <-- Muestra el error si existe
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <TaskForm />
          </div>
          <div className="lg:col-span-2">
            <TaskList />
          </div>
        </div>
      </div>
    </div>
  );
};