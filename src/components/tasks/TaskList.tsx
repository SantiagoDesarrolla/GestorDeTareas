import { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import type { Task, Status, Priority } from '../../context/TaskContext';

export const TaskList = () => {
  const { tasks, updateTask, deleteTask, toggleTaskStatus } = useTasks();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Status>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | Priority>('all');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Filtrar tareas
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || task.status === statusFilter;
    
    const matchesPriority = 
      priorityFilter === 'all' || task.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Manejar edición
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTask) {
      updateTask(editingTask.id, {
        title: editingTask.title,
        description: editingTask.description,
        dueDate: editingTask.dueDate,
        priority: editingTask.priority
      });
      setEditingTask(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filtros y búsqueda */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Buscar
            </label>
            <input
              type="text"
              placeholder="Buscar tareas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | Status)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="all">Todos</option>
              <option value="pending">Pendiente</option>
              <option value="in-progress">En progreso</option>
              <option value="completed">Completado</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prioridad
            </label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as 'all' | Priority)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="all">Todas</option>
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          </div>
        </div>
      </div>

      {/* Modal de edición */}
      {editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Editar Tarea</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Título
                  </label>
                  <input
                    type="text"
                    value={editingTask.title}
                    onChange={(e) => setEditingTask({...editingTask, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción
                  </label>
                  <textarea
                    value={editingTask.description}
                    onChange={(e) => setEditingTask({...editingTask, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha límite
                    </label>
                    <input
                      type="date"
                      value={editingTask.dueDate}
                      onChange={(e) => setEditingTask({...editingTask, dueDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prioridad
                    </label>
                    <select
                      value={editingTask.priority}
                      onChange={(e) => setEditingTask({
                        ...editingTask, 
                        priority: e.target.value as Priority
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="low">Baja</option>
                      <option value="medium">Media</option>
                      <option value="high">Alta</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setEditingTask(null)}
                    className="px-4 py-2 border border-gray-300 rounded-md"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Listado de tareas */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-500">No hay tareas que coincidan con los filtros</p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <div key={task.id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">{task.title}</h3>
                  {task.description && (
                    <p className="text-gray-600 mt-1">{task.description}</p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => toggleTaskStatus(task.id)}
                    className={`px-2 py-1 text-xs rounded-md ${
                      task.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : task.status === 'in-progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {task.status === 'completed' ? 'Completada' : 
                     task.status === 'in-progress' ? 'En progreso' : 'Pendiente'}
                  </button>
                </div>
              </div>

              <div className="mt-3 flex justify-between items-center">
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-md ${
                    task.priority === 'high' ? 'bg-red-100 text-red-800' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {task.priority === 'high' ? 'Alta' :
                     task.priority === 'medium' ? 'Media' : 'Baja'}
                  </span>
                  {task.dueDate && (
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-md">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  )}
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingTask(task)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};