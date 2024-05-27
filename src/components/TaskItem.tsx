import React from "react";

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

interface TaskItemProps {
  task: Task;
  deleteTask: (taskId: string) => void;
  toggleTaskCompletion: (taskId: string) => void;
  setEditingTask: (task: Task | null) => void;
  setModal: (modal: Modal) => void;
}

export default function TaskItem({
  task,
  deleteTask,
  toggleTaskCompletion,
  setEditingTask,
  setModal,
}: TaskItemProps) {
  return (
    <li
      className="list-group-item d-flex align-items-center justify-content-between border-0 mb-2 rounded"
      style={{ backgroundColor: "#f4f6f7" }}
    >
      <div>
        <input
          className="form-check-input me-2"
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTaskCompletion(task.id)}
        />
        {task.completed ? <s>{task.name}</s> : <span>{task.name}</span>}
      </div>
      <div className="d-flex gap-3">
        <i
          className="fas fa-pen-to-square text-warning"
          onClick={() => setEditingTask(task)}
        ></i>
        <i
          className="far fa-trash-can text-danger"
          onClick={() => setModal({ show: true, type: "confirm", task })}
        ></i>
      </div>
    </li>
  );
}