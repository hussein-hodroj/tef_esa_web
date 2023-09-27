import React from 'react';
import axios from 'axios';
import './DeleteCandidate.css';

function DeleteCandidate({ openDelete, candidateId, setCandidate }) {
  const handleDelete = () => {
    axios
      .delete(`http://localhost:8000/register/delete/${candidateId}`)
      .then((response) => {
        setCandidate((prevCandidates) =>
          prevCandidates.filter(
            (Candidate) => Candidate.candidateId !== candidateId
          )
        );
      })
      .then(() => {
        openDelete(false);
      })
      .catch((error) => {
        console.log('Error while deleting the Candidate:', error);
      });
  };

  return (
    <div className="modalBackgroundDeleteFeedback">
      <div className="modalContainerDeleteFeedback">
        <div className="CloseBtnDeleteFeedback d-flex justify-content-between">
        <h1 className="text-white font-bold delete-candidate-title">Delete Candidate</h1>

        <button onClick={() => openDelete(false)} className="text-white" style={{ background: 'transparent' }}>X</button>

        </div>
        <div className="bodyDeleteFeedback">
          <h1 className="font-bold text-white">
            Are you sure you want to delete this?
          </h1>
        </div>
        <div className="footerDeleteFeedback">
          <button onClick={() => openDelete(false)} id="cancelBtn">
            Cancel
          </button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteCandidate;
