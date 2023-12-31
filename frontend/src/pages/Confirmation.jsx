import React, { useEffect, useState } from 'react';
import {FaSearch, FaTimes, FaCheck, FaArrowLeft, FaArrowRight, FaImage} from 'react-icons/fa/index.esm.js';
import Reject from '../components/CandidateConfirm/Reject.js';
import Confirm from '../components/CandidateConfirm/Confirm.js';
import PassportImage from '../components/CandidateConfirm/PassportImage.js';
import axios from 'axios';
import SidebarAdmin from './SidebarAdmin.js';
import NavbarAdmin from './NavbarAdmin.js';
import { format, parseISO } from 'date-fns';
import Photo from "../components/CandidateConfirm/PassportImage.js"
import Modal from 'react-modal';
function Confirmation() {
  
  const [Candidates, setCandidates] = useState([]);
  const [RejectStatus , setRejectStatus ] = useState(false);
  const [ConfirmStatus, setConfirmStatus] = useState(false);
  const [isPassportImageOpen, setPassportImageOpen] = useState(false);
  const [SelectedCandidateId, setSelectedCandidateId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const CandidatesPerPage = 5;

   
  useEffect(() => {
    axios
      .get('http://localhost:8000/register/status')
      .then((response) => setCandidates(response.data))
      .catch((error) => console.log(error));
  }, []);


  

  const filteredCandidates = Candidates.filter((Candidate) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      (Candidate.FirstName && Candidate.FirstName.toLowerCase().includes(searchTermLower)) 
      
    );
  });
  const closeModal = () => {
    setModalOpen(false); 
  };
  const openModal = () => {
    setModalOpen(true);
  };
    const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(filteredCandidates.length / CandidatesPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const indexOfLastCandidate = currentPage * CandidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - CandidatesPerPage;
  const currentCandidates = filteredCandidates.slice(indexOfFirstCandidate, indexOfLastCandidate);


  return (
   
<div>
{RejectStatus && <Reject openDelete={setRejectStatus} CandidateId={SelectedCandidateId}  setCandidates={setCandidates}/>}
{ConfirmStatus && <Confirm close={setConfirmStatus} CandidateId={SelectedCandidateId} setCandidates={setCandidates} />}
{isPassportImageOpen && <PassportImage open={setPassportImageOpen} CandidateId={SelectedCandidateId}  />}

    <NavbarAdmin/>
 <div className='d-flex'>
     <SidebarAdmin/>
     <div >
        <div className = "d-flex justify-content-between">
           
        <div className=" mt-3 mb-3">
           <FaSearch className="search-icon text-black ms-4 mt-2" size={25}/>

            <input
                type="text"
                placeholder="Search by name"
                className="ms-4 p-1 rounded border border-black text-black"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              </div>
              
              </div>
            <div className="m-3">
              {/* <div className='row '>
                <div className='col-12 d-flex justify-content-center align-items-center '>   
                  {isModalOpen && (
                          <Photo
                            open={closeModal}
                            CandidateId={SelectedCandidateId}
                          />
                        )}
                        </div>
              </div> */}
            <table className="table">
                            <thead>
              <tr>
                   <th> #</th>
                   <th > First Name</th>
                   <th > Last Name </th>                                
                   <th >Email</th>                   
                   <th >Phone Number</th>
                   <th >BookDates  </th>  
                   <th >Exam </th>
                   <th >Payment Status</th>       
                   <th >Status</th>    
                    <th > Passport</th>
                    <th >Action</th>
              </tr>
              
            </thead>
            
            <tbody>
            {currentCandidates.map((Candidate, index) => (

                              <tr key={Candidate.CandidateID}  className={index % 2 === 0 ? 'table-row-even' : 'table-row-odd'}>
                                              <td className=" py-4 whitespace-nowrap border Border-white">
                                              {(currentPage - 1) * CandidatesPerPage + index + 1}</td>
                                               <td className=" py-4 whitespace-nowrap border Border-white">{Candidate.FirstName}</td>
                                               <td className=" py-4 whitespace-nowrap border Border-white">{Candidate.LastName}</td>
                                               <td className=" py-4 whitespace-nowrap border Border-white">{Candidate.Email}</td>
                                               <td className=" py-4 whitespace-nowrap border Border-white">{Candidate.Phone}</td>
                                               <td className=" py-4  whitespace-nowrap border Border-white">
                                                {format(parseISO(Candidate.BookDate),'yyyy-MM-dd')}
                                              </td>
                                         
                                               <td className=" py-4 whitespace-nowrap border Border-white">{Candidate.title}</td>
                                               <td className=" py-4 whitespace-nowrap border Border-white">{Candidate.PaymentStatus}</td>
                                               <td className=" py-4 whitespace-nowrap border Border-white">{Candidate.Status}</td>
                                               <td className=" py-4  border Border-white">
                                               <div className=" rounded d-flex justify-content-center align-items-center">
                                            

                                               <button
  className="font-bold py-1 px-2 bg-primary border rounded border-primary"
  title="PassportImage"
  onClick={() => {
    setSelectedCandidateId(Candidate.CandidateID);
    openModal(true); 
  }}
>
  <FaImage />
</button> 


                                            </div></td>


                                               <td className="px-6 py-4 whitespace-nowrap border Border-white">

                    <div className="d-flex align-items-center justify-content-center space-x-4">
                    <div className="bg-primary rounded hover:primary">
                        <button  className="text-white font-bold py-1 mx-2 bg-primary border rounded border-primary" title="delivered"
                    onClick= {() => { setSelectedCandidateId(Candidate.CandidateID); 
                    console.log (SelectedCandidateId) ; setConfirmStatus(true);}} > <FaCheck /></button>
                      </div>

  
                    <div className="bg-danger rounded hover:bg-danger mx-2">
                      <button  className="text-white font-bold py-1 mx-2  bg-danger border rounded border-danger"  title="delete"
                  onClick= {() => { setSelectedCandidateId(Candidate.CandidateID); setRejectStatus(true);}} > <FaTimes /></button>
                    </div>

  

</div>

                     </td>
                  </tr>
                ))}
              </tbody>
    

          </table>
          </div>
          <div className='d-flex justify-content-center mt-4'>
              <div className='d-flex align-items-center ms-auto'>
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  <FaArrowLeft />Previous
                </button>
                <span className='mx-2'>{`Page ${currentPage} of ${Math.ceil(
                Candidates.length / CandidatesPerPage
              )}`}</span>
                <button
                   onClick={handleNextPage}
                   disabled={
                    currentPage ===
                    Math.ceil(Candidates.length / CandidatesPerPage)
                  }
                >
                  Next<FaArrowRight />
                </button>
              </div>
            </div>

            <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Modal Image"
                    className="modal-content"
                    overlayClassName="modal-overlay"
                  >
                    {/* Close button */}
                    <button className="close-button" onClick={closeModal}>
                      &times;
                    </button>
                    <Photo
        
                            CandidateId={SelectedCandidateId}
                          />
                    
                   
                  </Modal>
                  <style>
        {`
          
          .modal-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 20%;
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
          }

          .modal-overlay {
            background-color: rgba(0, 0, 0, 0.5); 
          }

          .modal-image-container {
            display: flex;
            justify-content: center;
            align-items: center;
            
          }

          .modal-image {
            max-width: 100%;
            max-height: 100%;
          }

          .close-button {
            position: absolute;
            top: 10px;
            right: 10px;
            cursor: pointer;
            font-size: 10px;
          }
        `}
      </style>

          </div>
        </div>
      </div>
     
    
    

      
      );
}

export default Confirmation;


