// src/context/TaskContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
};

type TaskFilter = {
  search: string;
  status: string;
  priority: string;
};

type TaskContextType = {
  tasks: Task[];
  filter: TaskFilter;
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  setFilter: (filter: TaskFilter) => void;
};

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>({
    search: '',
    status: 'all',
    priority: 'all'
  });

  const addTask = (task: Omit<Task, 'id'>) => {
    setTasks([...tasks, { ...task, id: Date.now().toString() }]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, ...updates } : task));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(filter.search.toLowerCase()) || 
                         task.description.toLowerCase().includes(filter.search.toLowerCase());
    const matchesStatus = filter.status === 'all' || task.status === filter.status;
    const matchesPriority = filter.priority === 'all' || task.priority === filter.priority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <TaskContext.Provider value={{
      tasks: filteredTasks,
      filter,
      addTask,
      updateTask,
      deleteTask,
      setFilter
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};