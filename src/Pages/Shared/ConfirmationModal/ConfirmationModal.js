import React from "react";

const ConfirmationModal = ({
  title,
  message,
  modalData,
  closeModal,
  handleDeleteDoctor,
}) => {
  return (
    <div>
      <input type="checkbox" id="confirmationModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="confirmationModal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{title} </h3>
          <p className="py-4">{message}</p>
          <div className="flex justify-between">
            <button
              className="btn "
              onClick={() => handleDeleteDoctor(modalData)}
            >
              Confirm
            </button>
            <button onClick={closeModal} className="btn">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
