import { useEffect } from "react";
import { useTaskStore } from "@store";

export const useTask = (id?: string) => {
  const {
    tasks,
    load,
    addOrUpdate,
    toggle,
    delete: deleteTask,
  } = useTaskStore();

  useEffect(() => {
    load();
  }, [load]);

  const task = tasks.find((t) => t.id === id) || {
    createdAt: "",
    description: "",
    id: "",
    status: "pending",
    title: "",
  };

  return {
    tasks,
    task,
    addOrUpdateTask: addOrUpdate,
    toggleTask: toggle,
    deleteTask,
  };
};
