import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Photo({ open, CandidateId}) {
  const [candidate, setCandidate] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8000/register/getid/${CandidateId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setCandidate(response.data);
      })
      .catch((error) => {
        console.log('Error while fetching candidate data', error);
      });
  }, [CandidateId]);

  const handleSubmit = (e) => {
    e.preventDefault();


    open(false);
  };

  return (
    <div className="bg bg-white d-flex align-items-center">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="container w-auto h-auto">
          <div className="CloseButton d-flex justify-content-between">
            <h1 className="text-black font-bold">PassportPhoto</h1>
            <button onClick={() => open(false)} className=" d-flex justify-content-end">
              X
            </button>
          </div>
          <div className="title"></div>
          <div className="body">
            {candidate.PassportPhoto && (
              <img
                src={`/uploads/${candidate.PassportPhoto}`}
                alt="Passport Photo"
                style={{
                  width: '200px',
                  height: '150px',
                }}
              />
            )}
          </div>

       
        </div>
      </form>
    </div>
  );
}

export default Photo;
