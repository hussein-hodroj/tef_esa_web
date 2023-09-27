import React, { useEffect, useState } from 'react';
import {FaSearch, FaTimes, FaCheck, FaArrowLeft, FaArrowRight } from 'react-icons/fa/index.esm.js';
import Reject from '../components/CandidateConfirm/Reject.js';
import Confirm from '../components/CandidateConfirm/Confirm.js';
import axios from 'axios';
import SidebarAdmin from './SidebarAdmin.js';
import NavbarAdmin from './NavbarAdmin.js';

function Confirmation() {
  
  const [Candidates, setCandidates] = useState([]);
  const [RejectStatus , setRejectStatus ] = useState(false);
  const [ConfirmStatus, setConfirmStatus] = useState(false);
  const [SelectedCandidateId, setSelectedCandidateId] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const CandidatesPerPage = 10;
   
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
            <table className="table">
                            <thead>
              <tr>
                <th scope="col" className="px-6 py-3 text-left bold font-medium text-white uppercase tracking-wider border border-black">
#</th>
                                               <th scope="col px-6 py-3 text-left bold font-medium text-white uppercase tracking-wider  border border-black" >
First Name</th>
                                               <th scope="col px-6 py-3 text-left bold font-medium text-white uppercase tracking-wider  border border-black" >
Last Name </th>
                                               <th scope="col px-6 py-3 text-left bold font-medium text-white uppercase tracking-wider  border border-black" >
Email</th>
                                               <th scope="col px-6 py-3 text-left bold font-medium text-white uppercase tracking-wider  border border-black" >
Phone Number</th>
                                               <th scope="col px-6 py-3 text-left bold font-medium text-white uppercase tracking-wider  border border-black" >
Book Date</th>
                                               <th scope="col px-6 py-3 text-left bold font-medium text-white uppercase tracking-wider  border border-black" >
Exam </th>
                                               <th scope="col px-6 py-3 text-left bold font-medium text-white uppercase tracking-wider  border border-black" >
Payment Status</th>
                                               <th scope="col px-6 py-3 text-left bold font-medium text-white uppercase tracking-wider  border border-black" >
Status</th>
                                                <th scope="col px-6 py-3 text-left bold font-medium text-white uppercase tracking-wider  border border-black" >
Action</th>
              </tr>
            </thead>
            <tbody>
            {currentCandidates.map((Candidate, index) => (
                    <tr key={Candidate.CandidateID}  className={index % 2 === 0 ? 'table-row-even' : 'table-row-odd'}>
                                              <td className="px-6 py-4 whitespace-nowrap border Border-white">
                                              {(currentPage - 1) * CandidatesPerPage + index + 1}</td>
                                               <td className="px-6 py-4 whitespace-nowrap border Border-white">
{Candidate.FirstName}</td>
                                               <td className="px-6 py-4 whitespace-nowrap border Border-white">
{Candidate.LastName}</td>
                                               <td className="px-6 py-4 whitespace-nowrap border Border-white">
{Candidate.Email}</td>
                                               <td className="px-6 py-4 whitespace-nowrap border Border-white">
{Candidate.Phone}</td>
                                               <td className="px-6 py-4  whitespace-nowrap border Border-white">
{Candidate.BookDate}</td>
                                               <td className="px-6 py-4 whitespace-nowrap border Border-white">
{Candidate.title}</td>
                                               <td className="px-6 py-4 whitespace-nowrap border Border-white">
{Candidate.PaymentStatus}</td>
                                               <td className="px-6 py-4 whitespace-nowrap border Border-white">
{Candidate.Status}</td>


                                               <td className="px-6 py-4 whitespace-nowrap border Border-white">

                      
                    <div className="d-flex align-items-center justify-content-center space-x-4">
                    <div className="bg-primary rounded hover:primary">
    <button  className="text-white font-bold py-1 px-2 bg-primary border border-primary" title="delivered"
 onClick= {() => { setSelectedCandidateId(Candidate.CandidateID); 
 console.log (SelectedCandidateId) ; setConfirmStatus(true);}} > <FaCheck /></button>
  </div>

  
  <div className="bg-danger rounded hover:bg-danger">
    <button  className="text-white font-bold py-1 px-2 bg-danger border border-danger"  title="delete"
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
              <div className='d-flex items-center ml-auto'>
                <button
                  className='px-4 py-2 bg-primary text-white rounded-l-lg hover:primary'
                  onClick={handlePreviousPage}
                >
                  <FaArrowLeft />
                </button>
                <p className='text-md text-primary ml-4 mr-4'>
                  Page {currentPage} of {Math.ceil(filteredCandidates.length / CandidatesPerPage)}
                </p>
                <button
                  className='px-4 py-2 bg-primary text-white rounded-r-lg hover:primary'
                  onClick={handleNextPage}
                >
                  <FaArrowRight />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
     
    
    

      
      );
}

export default Confirmation;





