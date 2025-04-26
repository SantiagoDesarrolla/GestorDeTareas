import { createContext, useContext, ReactNode, useState, useEffect, useCallback } from 'react';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  doc,
  FirestoreError
} from 'firebase/firestore';
import { db, auth } from '../firebase/config';
import { Task, Priority, Status } from '../types/taskTypes';

type TaskContextType = {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'userId' | 'createdAt'>) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTaskStatus: (id: string) => Promise<void>;
  refreshTasks: () => Promise<void>;
  loading: boolean;
  error: string | null;
  clearError: () => void;
};

const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const handleFirestoreError = (err: unknown): string => {
    if (err instanceof FirestoreError) {
      switch (err.code) {
        case 'permission-denied':
          return 'No tienes permisos para esta acción';
        case 'not-found':
          return 'Documento no encontrado';
        default:
          return 'Error en la base de datos';
      }
    }
    return 'Error desconocido';
  };

  const fetchTasks = useCallback(async () => {
    if (!auth.currentUser?.uid) return;
    
    try {
      setLoading(true);
      clearError();
      const q = query(
        collection(db, 'tasks'),
        where('userId', '==', auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const tasksData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as Task[];
      setTasks(tasksData);
    } catch (err) {
      setError(handleFirestoreError(err));
    } finally {
      setLoading(false);
    }
  }, [clearError]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (task: Omit<Task, 'id' | 'userId' | 'createdAt'>) => {
    if (!auth.currentUser?.uid) {
      setError('Usuario no autenticado');
      return;
    }
    
    try {
      const newTask = {
        ...task,
        userId: auth.currentUser.uid,
        createdAt: new Date(),
        status: 'pending' as Status
      };
      const docRef = await addDoc(collection(db, 'tasks'), newTask);
      setTasks(prev => [...prev, { ...newTask, id: docRef.id }]);
    } catch (err) {
      setError(handleFirestoreError(err));
      throw err;
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      await updateDoc(doc(db, 'tasks', id), updates);
      setTasks(prev => prev.map(task => 
        task.id === id ? { ...task, ...updates } : task
      ));
    } catch (err) {
      setError(handleFirestoreError(err));
      throw err;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'tasks', id));
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err) {
      setError(handleFirestoreError(err));
      throw err;
    }
  };

  const toggleTaskStatus = async (id: string) => {
    try {
      const task = tasks.find(t => t.id === id);
      if (!task) {
        setError('Tarea no encontrada');
        return;
      }

      const newStatus: Status = 
        task.status === 'completed' ? 'pending' : 
        task.status === 'pending' ? 'in-progress' : 'completed';

      await updateTask(id, { status: newStatus });
    } catch (err) {
      setError(handleFirestoreError(err));
    }
  };

  const value = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    refreshTasks: fetchTasks,
    loading,
    error,
    clearError
  };

  return (
    <TaskContext.Provider value={value}>
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

export type { Status, Priority };