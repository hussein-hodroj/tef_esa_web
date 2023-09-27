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
        <div className = "titleCloseBtn  d-flex justify-content-between my-3">
        <h3 className="text-white font-bold "> Update Candidate Status: </h3>
        <button onClick = {() => openDelete(false) } className="text-white d-flex justify-content-end">  X  </button>
        </div>
        <div className = "titleDeleteFeedback">
        </div>
        <div className = "bodyDeleteFeedback">

                <h4 className="font-bold text-white d-flex justify-content-start align-items-start">Are you sure that you want to reject the candidate application ?</h4>
   
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
