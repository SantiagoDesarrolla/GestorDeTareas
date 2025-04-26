import axios from "axios";
import type { Task, Priority, Status } from "../context/TaskContext";

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeader = () => ({
  headers: { 
    Authorization: `Bearer ${localStorage.getItem("token")}` 
  }
});

export const taskService = {
  getTasks: async (): Promise<Task[]> => {
    const response = await axios.get(`${API_URL}/tasks`, getAuthHeader());
    return response.data;
  },
  createTask: async (task: Omit<Task, "id" | "userId">): Promise<Task> => {
    const response = await axios.post(`${API_URL}/tasks`, task, getAuthHeader());
    return response.data;
  },
  updateTask: async (id: string, updates: Partial<Task>): Promise<Task> => {
    const response = await axios.patch(
      `${API_URL}/tasks/${id}`, 
      updates, 
      getAuthHeader()
    );
    return response.data;
  },
  deleteTask: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/tasks/${id}`, getAuthHeader());
  },
  toggleTaskStatus: async (id: string): Promise<Task> => {
    const response = await axios.patch(
      `${API_URL}/tasks/${id}/toggle`, 
      {}, 
      getAuthHeader()
    );
    return response.data;
  }
};