import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarAdmin from './SidebarAdmin.js';
import NavbarAdmin from './NavbarAdmin.js';
import { FaEdit, FaTrash, FaArrowLeft, FaArrowRight, FaSearch } from 'react-icons/fa/index.esm.js';
import Popup from '../components/Candidateinfo/Popup.js';
import DeleteCandidate from '../components/Candidateinfo/DeleteCandidate.js';
import { format, parseISO } from 'date-fns';

function Candidate() {
  const [candidates, setCandidates] = useState([]);
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const candidatePerPage = 10;
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('');
  const [selectedBookDate, setSelectedBookDate] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8000/register/')
      .then((response) => setCandidates(response.data))
      .catch((error) => console.log(error));
  }, []);

  const filteredCandidates = candidates?.filter((candidate) => {
    if (!candidate.FirstName) return false;

    const searchTermLower = searchTerm.toLowerCase();
    const paymentStatusMatch =
      selectedPaymentStatus === '' ||
      candidate.PaymentStatus.toLowerCase() === selectedPaymentStatus.toLowerCase();

    const bookDateMatch =
      selectedBookDate === '' ||
      format(parseISO(candidate.BookDate), 'yyyy-MM-dd') === selectedBookDate;

    return (
      candidate.FirstName.toLowerCase().includes(searchTermLower) &&
      paymentStatusMatch &&
      bookDateMatch
    );
  });

  const handlePaymentStatusChange = (e) => {
    setSelectedPaymentStatus(e.target.value);
  };

  const handleBookDateChange = (e) => {
    setSelectedBookDate(e.target.value);
  };

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
    const totalPages = Math.ceil(filteredCandidates.length / candidatePerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const indexOfLastCandidate = currentPage * candidatePerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatePerPage;
  const currentCandidates = filteredCandidates?.slice(
    indexOfFirstCandidate,
    indexOfLastCandidate
  );

  return (
    <div>
      {show && (
        <Popup
          close={setShow}
          setCandidates={setCandidates}
          candidates={candidates}
          candidateId={selectedCandidateId}
        />
      )}
      {showDelete && (
        <DeleteCandidate
          openDelete={setShowDelete}
          candidateId={selectedCandidateId}
          setCandidate={setCandidates}
        />
      )}

      <NavbarAdmin />
      <div className='d-flex'>
        <SidebarAdmin />

        <div>
          <div className='d-flex justify-content-between mb-3 mt-4'>
            <h2>Candidates</h2>
          </div>
          <div className='mt-3 mb-3'>
            <FaSearch className='search-icon text-black ms-4 mt-2' size={25} />
            <input
              type='text'
              placeholder='Search by name'
              className='ms-4 p-1 rounded border border-black text-black'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <label className='ms-4 me-2'>Payment Status:</label>
            <select
              className='border border-black rounded p-1'
              value={selectedPaymentStatus}
              onChange={handlePaymentStatusChange}
            >
              <option value=''>All</option>
              <option value='progress'>progress</option>
              <option value='Paid'>Paid</option>
            </select>

            <label className='ms-4 me-2'>Book Date:</label>
            <input
              type='date'
              className='border border-black rounded p-1'
              value={selectedBookDate}
              onChange={handleBookDateChange}
            />
          </div>

          <div className='m-3'>
            <table className='table'>
              <thead>
                <tr>
                  <th style={{ width: '120px' }}>#</th>
                  <th style={{ width: '120px' }}>First Name</th>
                  <th style={{ width: '120px' }}>Last Name</th>
                  <th style={{ width: '120px' }}>Email</th>
                  <th style={{ width: '120px' }}>Phone Number</th>
                  <th style={{ width: '120px' }}>Book Date</th>
                  <th style={{ width: '120px' }}>Exam Title</th>
                  <th style={{ width: '120px' }}>Payment Status</th>
                  <th style={{ width: '120px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentCandidates?.map((candidate, index) => (
                  <tr
                    key={candidate.CandidateID}
                    className={
                      index % 2 === 0 ? 'table-row-even' : 'table-row-odd'
                    }
                  >
                    <td className='px-6 py-4 whitespace-nowrap border Border-white'>
                      {(currentPage - 1) * candidatePerPage + index + 1}
                    </td>
                    <td style={{ height: '100px' }}>{candidate.FirstName}</td>
                    <td style={{ height: '100px' }}>
                      {candidate.LastName}
                    </td>
                    <td style={{ height: '100px' }}>{candidate.Email}</td>
                    <td style={{ height: '100px' }}>{candidate.Phone}</td>
                    <td style={{ height: '100px' }}>
                      {format(parseISO(candidate.BookDate), 'yyyy-MM-dd')}
                    </td>
                    <td style={{ height: '100px' }}>{candidate.title}</td>
                    <td style={{ height: '100px' }}>
                      {candidate.PaymentStatus}
                    </td>
                    <td style={{ display: 'flex', alignItems: 'center', height: '120px' }}>
                      <button
                        className='btn btn-primary ml-2'
                        onClick={() => handlePopupEdit(candidate.CandidateID)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className='btn btn-danger mx-2'
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
          <div className='d-flex justify-content-center mt-4'>
            <div className='d-flex align-items-center ms-auto'>
              <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                <FaArrowLeft /> Previous
              </button>
              <span className='mx-2'>{`Page ${currentPage} of ${Math.ceil(
                candidates.length / candidatePerPage
              )}`}</span>
              <button
                onClick={handleNextPage}
                disabled={
                  currentPage ===
                  Math.ceil(candidates.length / candidatePerPage)
                }
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
