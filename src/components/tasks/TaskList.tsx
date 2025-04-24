import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';


export const TaskList = () => {
  const { tasks, toggleTaskCompletion } = useTasks();
  const [searchTerm, setSearchTerm] = useState('');  // Ahora funcionará
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         (filter === 'pending' && !task.completed) || 
                         (filter === 'completed' && task.completed);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-yellow-600 mb-4">Tus Tareas</h2>
      <div className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Buscar tareas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-yellow-500"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as 'all' | 'pending' | 'completed')}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-yellow-500"
        >
          <option value="all">Todas</option>
          <option value="pending">Pendientes</option>
          <option value="completed">Completadas</option>
        </select>
      </div>
      <ul className="space-y-3">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`p-4 border rounded ${task.completed ? 'bg-gray-50' : ''}`}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
                className="mr-2 h-5 w-5"
              />
              <div className="flex-1">
                <h3 className={`font-bold ${task.completed ? 'line-through' : ''}`}>
                  {task.title}
                </h3>
                <p className="text-gray-600">{task.description}</p>
                <span
                  className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
                    task.priority === 'high'
                      ? 'bg-red-100 text-red-800'
                      : task.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Media' : 'Baja'}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};