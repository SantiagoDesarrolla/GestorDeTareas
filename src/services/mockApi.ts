type Task = {
    id: string;
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    completed: boolean;
  };
  
  let tasks: Task[] = [];
  
  export const mockApi = {
    createTask: (task: Omit<Task, "id" | "completed">) => {
      const newTask = { ...task, id: Date.now().toString(), completed: false };
      tasks.push(newTask);
      return Promise.resolve(newTask);
    },
    getTasks: () => Promise.resolve(tasks),
  };