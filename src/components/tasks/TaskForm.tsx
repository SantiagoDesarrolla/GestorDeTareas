import { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import { Priority } from '../types/taskTypes';

export const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const { addTask, loading, error } = useTasks();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addTask({
        title,
        description,
        dueDate,
        priority,
        status: 'pending'
      });
      // Reset form
      setTitle('');
      setDescription('');
      setDueDate('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Nueva Tarea</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campos del formulario */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Creando...' : 'Crear Tarea'}
        </button>
      </form>
    </div>
  );
};