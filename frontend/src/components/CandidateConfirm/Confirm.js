import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Candidateinfo/DeleteCandidate.css'

function ConfirmStatus({ close, CandidateID, setCandidates }) {
    const handleSubmit = (e) => {
      e.preventDefault();
      axios.put(`http://localhost:8000/register/status/${CandidateID}`, {
         headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
  
          setCandidates(prevCandidates =>
            prevCandidates.map(register => (register.CandidateID === CandidateID ? response.data : register))
          );
          window.location.reload();
          close(false);

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
        <button onClick = {() => close(false) } className="text-white d-flex justify-content-end">  X  </button>
        </div>
        <div className = "titleDeleteFeedback">
        </div>
        <div className = "bodyDeleteFeedback">

                <h1 className="font-bold text-black d-flex justify-content-start align-items-start">Are you sure that candidate has paid the fees ?</h1>
   
              </div>
             

          <div className = "footerDeleteFeedback">
            <button onClick = {() => close(false) } id="cancelBtn"> Cancel </button>
            <button type = "submit"> Save </button>

          </div>

      </div>
      </form>

    </div>
  );
};

export default ConfirmStatus;





   