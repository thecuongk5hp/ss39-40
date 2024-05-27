import React from "react";
import TaskItem from "./TaskItem";

interface Task {
  id: string;
  name: string;
  completed: boolean;
}

interface Modal {
  show: boolean;
  type: "warning" | "confirm";
  message?: string;
  task?: Task | null;
}

interface TaskListProps {
  tasks: Task[];
  deleteTask: (taskName: string) => void;
  toggleTaskCompletion: (taskName: string) => void;
  setEditingTask: (task: Task | null) => void;
  setModal: (modal: Modal) => void;
}

export default function TaskList({
  tasks,
  deleteTask,
  toggleTaskCompletion,
  setEditingTask,
  setModal,
}: TaskListProps) {
  return (
    <ul className="list-group mb-0">
      {tasks.map((task) => (
        <TaskItem
          key={task.name}
          task={task}
          deleteTask={deleteTask}
          toggleTaskCompletion={toggleTaskCompletion}
          setEditingTask={setEditingTask}
          setModal={setModal}
        />
      ))}
    </ul>
  );
}