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

interface ModalProps {
  modal: Modal;
  setModal: (modal: Modal) => void;
  deleteTask: (taskName: string) => void;
}

export default function Modal({ modal, setModal, deleteTask }: ModalProps) {
  const handleClose = () => setModal({ ...modal, show: false });

  const handleConfirm = () => {
    if (modal.type === "confirm") {
      deleteTask(modal.task?.id);
    }
    handleClose();
  };

  return (
    <div className="overlay">
      <div className="modal-custom">
        <div className="modal-header-custom">
          <h5>{modal.type === "confirm" ? "Xác nhận" : "Cảnh báo"}</h5>
          <i className="fas fa-xmark" onClick={handleClose}></i>
        </div>
        <div className="modal-body-custom">
          <p>
            {modal.type === "confirm"
              ? `Bạn chắc chắn muốn xóa công việc ${modal.task.name}?`
              : modal.message}
          </p>
        </div>
        <div className="modal-footer-footer">
          {modal.type === "confirm" ? (
            <>
              <button className="btn btn-light" onClick={handleClose}>
                Hủy
              </button>
              <button className="btn btn-danger" onClick={handleConfirm}>
                Xóa
              </button>
            </>
          ) : (
            <button className="btn btn-light" onClick={handleClose}>
              Đóng
            </button>
          )}
        </div>
      </div>
    </div>
  );
}