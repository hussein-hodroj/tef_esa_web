import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarAdmin from './SidebarAdmin';
import NavbarAdmin from './NavbarAdmin';
import { FaEdit, FaTrash, FaArrowLeft, FaArrowRight, FaSearch } from 'react-icons/fa';
import Popup from '../components/Candidateinfo/Popup';
import DeleteCandidate from '../components/Candidateinfo/DeleteCandidate';
import { format, parseISO } from 'date-fns';

function Candidate() {
  const [candidates, setCandidates] = useState([]);
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const candidatesPerPage = 5; 

  useEffect(() => {
    axios
      .get('http://localhost:8000/register/')
      .then((response) => setCandidates(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handlePopupEdit = (id) => {
    setSelectedCandidateId(id);
    setShow(true);
  };

  const handlePopupDelete = (id) => {
    setSelectedCandidateId(id);
    setShowDelete(true);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(candidates.length / candidatesPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  const currentCandidates = candidates.slice(indexOfFirstCandidate, indexOfLastCandidate);

  return (
    <div>
      {show && <Popup close={setShow} setCandidates={setCandidates} candidates={candidates} candidateId={selectedCandidateId} />}
      {showDelete && <DeleteCandidate openDelete={setShowDelete} candidateId={selectedCandidateId} setCandidate={setCandidates} />}

      <NavbarAdmin />
      <div className='d-flex'>
        <SidebarAdmin />

        <div className="container m-3">
          <div className="mt-3 mb-3">
            <div className="d-flex justify-content-between mb-3 ">
              <h2>Candidates</h2>
            </div>

            <div className="table-responsive">
              <table className="table custom-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th style={{ width: '120px' }}>First Name</th>
                    <th style={{ width: '120px' }}>Last Name</th>
                    <th>Email</th>
                    <th  style={{ width: '120px' }}>Phone Number</th>
                    <th style={{ width: '120px' }}>Book Date</th>
                    <th>Exam Title</th>
                    <th>Payment Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCandidates.map((candidate, index) => (
                    <tr key={candidate.CandidateID} className={index % 2 === 0 ? 'table-row-even' : 'table-row-odd'}>
                      <td style={{ height: '100px' }}>{(currentPage - 1) * candidatesPerPage + index + 1}</td>
                      <td style={{ height: '100px' }}>{candidate.FirstName}</td>
                      <td style={{ height: '100px' }}> {candidate.LastName}</td>
                      <td style={{ height: '100px' }}>{candidate.Email}</td>
                      <td style={{ height: '100px' }}>{candidate.Phone}</td>
                      <td style={{ height: '100px' }}>{format(parseISO(candidate.BookDate), 'yyyy-MM-dd')}</td>
                      <td style={{ height: '100px' }}>{candidate.title}</td>
                      <td style={{ height: '100px' }}>{candidate.PaymentStatus}</td>
                      <td style={{ display: 'flex', alignItems: 'center', height: '100px' }}>
                        <button
                          className="btn btn-primary ml-2"
                          onClick={() => handlePopupEdit(candidate.CandidateID)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-danger mx-2"
                          onClick={() => handlePopupDelete(candidate.CandidateID)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pagination justify-content-end">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                <FaArrowLeft /> Previous
              </button>
              <span className="mx-2">{`Page ${currentPage} of ${Math.ceil(candidates.length / candidatesPerPage)}`}</span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === Math.ceil(candidates.length / candidatesPerPage)}
              >
                Next <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Candidate;
