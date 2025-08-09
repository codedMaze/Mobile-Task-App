import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { Task, TaskStore } from "@types";

const TASKS_KEY = "TASKS";

export const saveTasks = async (tasks: Task[]) => {
  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

export const loadTasks = async (): Promise<Task[]> => {
  const data = await AsyncStorage.getItem(TASKS_KEY);
  return data ? JSON.parse(data) : [];
};

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  load: async () => {
    const stored = await loadTasks();
    set({ tasks: stored });
  },
  addOrUpdate: async (task) => {
    const updated = get().tasks.some((t) => t.id === task.id)
      ? get().tasks.map((t) => (t.id === task.id ? task : t))
      : [task, ...get().tasks];
    set({ tasks: updated });
    await saveTasks(updated);
  },
  toggle: async (id) => {
    const updated: Task[] = get().tasks.map((t) =>
      t.id === id
        ? { ...t, status: t.status === "pending" ? "completed" : "pending" }
        : t
    );
    set({ tasks: updated });
    await saveTasks(updated);
  },
  delete: async (id) => {
    const updated = get().tasks.filter((t) => t.id !== id);
    set({ tasks: updated });
    await saveTasks(updated);
  },
}));
