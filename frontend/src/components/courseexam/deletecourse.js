import React from 'react';

function DeleteConfirmationModal({ isOpen, onClose, onDelete }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal" style={{ width: '500px' }}>
        <h2 className="mb-4 my-2">Confirm Deletion</h2>
        <p>Are you sure you want to delete this course?</p>
        <div className="text-center mb-2 d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            style={{ marginRight: '10px' }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              onDelete();
              onClose();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
