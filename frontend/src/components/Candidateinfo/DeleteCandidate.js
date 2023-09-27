import React from 'react';
import axios from 'axios';
import './DeleteCandidate.css';

function DeleteCandidate({ openDelete, candidateId , setCandidate}) {
    const handleSubmit = (e) => {
            e.preventDefault();

        axios.delete(`http://localhost:8000/register/delete/${candidateId}`)
        .then((response) => {
          setCandidate((prevCandidates) =>
          prevCandidates.filter((Candidate) => Candidate.candidateId !== candidateId)
        );        
        }).then(()=>{
          openDelete(false);
        })
        .catch((error) => {
          console.log('Error while deleting the Candidate:', error);
        });
         };
        

  return (
    <div className = "modalBackgroundDeleteFeedback">
          <form onSubmit={(e)=>handleSubmit(e)}>
      <div className= "modalContainerDeleteFeedback">
        <div className = "CloseBtnDeleteFeedback  d-flex justify-content-between">
        <h1 className="text-white font-bold "> Delete Candidate</h1>
        <button onClick = {() => openDelete(false) } className="text-white flex justify-content-end">  X  </button>
        </div>
        <div className = "titleDeleteFeedback">
        </div>
        <div className = "bodyDeleteFeedback">

                <h1 className="font-bold text-white d-flex justify-content-start align-items-start">Are you sure you want to delete this ?</h1>
   
              </div>
             

          <div className = "footerDeleteFeedback">
            <button onClick = {() => openDelete(false) } id="cancelBtn"> Cancel </button>
            <button type = "submit"> Delete </button>

          </div>

      </div>
      </form>

    </div>
  );
};

export default DeleteCandidate;

