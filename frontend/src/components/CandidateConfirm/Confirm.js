import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Candidateinfo/DeleteCandidate.css'

function ConfirmStatus({ close, CandidateId, setCandidates }) {
    const handleSubmit = (e) => {
      e.preventDefault();
      axios.put(`http://localhost:8000/register/updatestatus/${CandidateId}`, {
         headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
  
          setCandidates(prevCandidates =>
            prevCandidates.map(register => (register.CandidateID === CandidateId ? response.data : register))
          );
          
          close(false);

        })
        
          
        
        .catch((error) => {
          console.log('Error while updating status', error);
        });
         };
        

  return (
    <div className = "modalBackgroundDeleteFeedback">
          <form onSubmit={(e)=>handleSubmit(e)}>
      <div className= "modalContainerDeleteFeedback ">
        <div className = "titleCloseBtn  d-flex justify-content-between my-3">
        <h3 className="text-white font-bold "> Update Candidate Status: </h3>
        <button onClick={() => close(false)} className="text-white">X</button>
        
        
        </div>
        <div className = "titleDeleteFeedback">
        </div>
        <div className = "bodyDeleteFeedback">

                <h4 className="font-bold text-white d-flex justify-content-start align-items-start">Are you sure that candidate has paid the fees ?</h4>
   
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
