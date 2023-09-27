import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Candidateinfo/DeleteCandidate.css'

function RejectStatus({ openDelete, CandidateId, setCandidates }) {
    const handleSubmit = (e) => {
      e.preventDefault();
      axios.put(`http://localhost:8000/register/updatereject/${CandidateId}`, {
         headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
  
          setCandidates(prevCandidates =>
            prevCandidates.map(register => (register.CandidateID === CandidateId ? response.data : register))
          );
          
          openDelete(false);

        })
        
          
        
        .catch((error) => {
          console.log('Error while updating status', error);
        });
         };
        

  return (
    <div className = "modalBackgroundDeleteFeedback">
          <form onSubmit={(e)=>handleSubmit(e)}>
      <div className= "modalContainerDeleteFeedback">
        <div className = "CloseBtnDeleteFeedback  d-flex justify-content-between">
        <h1 className="text-black font-bold "> Update Candidate Status: </h1>
        <button onClick = {() => openDelete(false) } className="text-white d-flex justify-content-end">  X  </button>
        </div>
        <div className = "titleDeleteFeedback">
        </div>
        <div className = "bodyDeleteFeedback">

                <h1 className="font-bold text-black d-flex justify-content-start align-items-start">Are you sure that you want to reject the candidate application ?</h1>
   
              </div>
             

          <div className = "footerDeleteFeedback">
            <button onClick = {() => openDelete(false) } id="cancelBtn"> Cancel </button>
            <button type = "submit"> Save </button>

          </div>

      </div>
      </form>

    </div>
  );
};

export default RejectStatus;





   