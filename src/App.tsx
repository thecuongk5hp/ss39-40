import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import AddTask from "../../BTss39/src/components/AddTask";
import Tabs from "../../BTss39/src/components/Tabs";
import TaskList from "../../BTss39/src/components/TaskList";
import Modal from "../../BTss39/src/components/Modal";

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

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">(
    "all"
  );
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [modal, setModal] = useState<Modal>({
    show: false,
    type: "",
    task: null,
  });

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(savedTasks);
  }, []);

  const addTask = (id: string, taskName: string) => {
    if (!taskName) {
      setModal({
        show: true,
        type: "warning",
        message: "Tên công việc không được phép để trống.",
      });
      return;
    }
    if (tasks.some((task) => task.name === taskName)) {
      setModal({
        show: true,
        type: "warning",
        message: "Tên công việc không được phép trùng.",
      });
      return;
    }
    const newTask = { id: uuidv4(), name: taskName, completed: false };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const deleteTask = (taskId: string) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setModal({ ...modal, show: false });
  };

  const updateTask = (taskId: string, newName: string, oldName: string) => {
    if (!newName) {
      setModal({
        show: true,
        type: "warning",
        message: "Tên công việc không được phép để trống.",
      });
      return;
    }
    if (tasks.some((task) => task.name === newName && task.name !== oldName)) {
      setModal({
        show: true,
        type: "warning",
        message: "Tên công việc không được phép trùng.",
      });
      return;
    }
    const newTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, name: newName } : task
    );
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setEditingTask(null);
  };

  const toggleTaskCompletion = (taskId: string) => {
    const newTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  return (
    <div className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card">
              <div className="card-body p-5">
                <AddTask
                  addTask={addTask}
                  editingTask={editingTask}
                  updateTask={updateTask}
                />
                <Tabs setFilter={setFilter} />
                <TaskList
                  tasks={filteredTasks}
                  deleteTask={deleteTask}
                  toggleTaskCompletion={toggleTaskCompletion}
                  setEditingTask={setEditingTask}
                  setModal={setModal}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {modal.show && (
        <Modal modal={modal} setModal={setModal} deleteTask={deleteTask} />
      )}
    </div>
  );
}