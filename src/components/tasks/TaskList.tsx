// src/components/tasks/TaskList.tsx
import { useTasks } from '../../context/TaskContext';

export const TaskList = () => {
  const { tasks, filter, setFilter } = useTasks();

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Buscar tareas..."
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          className="p-2 border rounded flex-grow"
        />
        <select
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="all">Todos</option>
          <option value="pending">Pendientes</option>
          <option value="in-progress">En progreso</option>
          <option value="completed">Completadas</option>
        </select>
        <select
          onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="all">Todas</option>
          <option value="low">Baja</option>
          <option value="medium">Media</option>
          <option value="high">Alta</option>
        </select>
      </div>

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <p className="text-gray-500">No hay tareas disponibles</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="p-4 border rounded-lg">
              <h3 className="font-semibold">{task.title}</h3>
              <p className="text-gray-600">{task.description}</p>
              <div className="flex justify-between items-center mt-2">
                <span className={`px-2 py-1 text-xs rounded ${
                  task.priority === 'high' ? 'bg-red-100 text-red-800' :
                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {task.priority}
                </span>
                <span>{task.dueDate}</span>
                <span className={`px-2 py-1 text-xs rounded ${
                  task.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                  task.status === 'in-progress' ? 'bg-purple-100 text-purple-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {task.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};