import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export type Priority = 'low' | 'medium' | 'high';
export type Status = 'pending' | 'in-progress' | 'completed';

export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  status: Status;
  userId: string;
};

type TaskContextType = {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'userId'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { user } = useAuth();

  // Cargar tareas al iniciar o cambiar de usuario
  useEffect(() => {
    if (user) {
      const savedTasks = localStorage.getItem(`taskmaster-tasks-${user}`);
      setTasks(savedTasks ? JSON.parse(savedTasks) : []);
    }
  }, [user]);

  // Guardar tareas cuando cambian
  useEffect(() => {
    if (user && tasks.length > 0) {
      localStorage.setItem(`taskmaster-tasks-${user}`, JSON.stringify(tasks));
    }
  }, [tasks, user]);

  const addTask = (task: Omit<Task, 'id' | 'userId'>) => {
    if (!user) return;
    
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      userId: user
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskStatus = (id: string) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const newStatus: Status = 
          task.status === 'completed' ? 'pending' : 
          task.status === 'pending' ? 'in-progress' : 'completed';
        return { ...task, status: newStatus };
      }
      return task;
    }));
  };

  return (
    <TaskContext.Provider 
      value={{ tasks, addTask, updateTask, deleteTask, toggleTaskStatus }}
    >
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