import axios, { AxiosResponse } from 'axios';
import type { Task } from '../context/TaskContext'; 

const API_URL = "http://tu-backend.com/api/tasks";

export const taskService = {
  createTask: (task: Omit<Task, 'id' | 'completed'>): Promise<AxiosResponse<Task>> => {
    return axios.post(API_URL, task);
  },
  getTasks: (): Promise<AxiosResponse<Task[]>> => {
    return axios.get(API_URL);
  },
  toggleTask: (id: string): Promise<AxiosResponse<Task>> => {
    return axios.patch(`${API_URL}/${id}/toggle`);
  }
};

