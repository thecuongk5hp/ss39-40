import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
interface Task {
  id: string;
  name: string;
  completed: boolean;
}

interface TaskInputProps {
  addTask: (taskName: string) => void;
  editingTask: Task | null;
  updateTask: (oldName: string, newName: string) => void;
}

export default function TaskInput({
  addTask,
  editingTask,
  updateTask,
}: TaskInputProps) {
  const [taskName, setTaskName] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTaskName(editingTask.name);
    }
  }, [editingTask]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const id = uuidv4();
    if (editingTask) {
      updateTask(editingTask.id, taskName);
    } else {
      addTask(id, taskName);
    }
    setTaskName("");
  };

  return (
    <form
      className="d-flex justify-content-center align-items-center mb-4"
      onSubmit={handleSubmit}
    >
      <div className="form-outline flex-fill">
        <input
          type="text"
          id="form2"
          className="form-control"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <label className="form-label" htmlFor="form2">
          Nhập tên công việc
        </label>
      </div>
      <button type="submit" className="btn btn-info ms-2">
        {editingTask ? "Cập nhật" : "Thêm"}
      </button>
    </form>
  );
}