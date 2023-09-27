import React, {useState, useEffect} from 'react'; 
import axios from 'axios';
import SidebarAdmin from './SidebarAdmin.js';
import NavbarAdmin from './NavbarAdmin.js';
import { FaEdit, FaTrash,  FaArrowLeft, FaArrowRight, FaSearch } from 'react-icons/fa/index.esm.js';
import Popup from '../components/Candidateinfo/Popup.js';
import DeleteCandidate from '../components/Candidateinfo/DeleteCandidate.js'; 
import { format, parseISO } from 'date-fns';


function Candidate() {
  
    const [candidates, setCandidates] = useState([]);
    const [show , setShow ] = useState(false);
      const [showDelete , setShowDelete ] = useState(false);
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
            
       const handlePreviousPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };

    const handlePopupEdit=(id)=>{
     setSelectedCandidateId(id)
      setShow(true)
      console.log(selectedCandidateId)
    }

    const handlePopupDelete=(id)=>{
      setSelectedCandidateId(id)
       setShowDelete(true)
       console.log(selectedCandidateId)
     }

      const handleNextPage = () => {
        const totalPages = Math.ceil(filteredCandidates?.length / candidatePerPage);
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
{show && <Popup close={setShow} setCandidates={setCandidates} candidates={candidates} candidateId={selectedCandidateId}/>}
{showDelete && <DeleteCandidate openDelete={setShowDelete} candidateId={selectedCandidateId} setCandidate={setCandidates}/>}

<NavbarAdmin/>
 <div className='d-flex'>
 <SidebarAdmin/>


<div>
<div className="mt-3 mb-3">
  <FaSearch className="search-icon text-black ms-4 mt-2" size={25} />
  <input
    type="text"
    placeholder="Search by name"
    className="ms-4 p-1 rounded border border-black text-black"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />


  <label className="ms-4 me-2">Payment Status:</label>
  <select
    className="border border-black rounded p-1"
    value={selectedPaymentStatus}
    onChange={handlePaymentStatusChange}
  >
    <option value="">All</option>
    <option value="progress">progress</option>
    <option value="Paid">Paid</option>
    
  </select>


  <label className="ms-4 me-2">Book Date:</label>
  <input
    type="date"
    className="border border-black rounded p-1"
    value={selectedBookDate}
    onChange={handleBookDateChange}
  />
</div>

      <div className="m-3">
   <table className="table ">
             
   <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Book Date</th>
                <th scope="col">Exam Title</th>
                <th scope="col">Payment Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
                {currentCandidates?.map((candidate, index) => (
                  <tr key={candidate.CandidateID}  className={index % 2 === 0 ? 'table-row-even' : 'table-row-odd'}>
                           <td className="px-6 py-4 whitespace-nowrap border Border-white">
                           {(currentPage - 1) * candidatePerPage + index + 1}
</td>
                           <td className="px-6 py-4  border Border-white">
{candidate.FirstName}</td>
                           <td className="px-6 py-4  border Border-white">
{candidate.LastName}</td>
                           <td className="px-6 py-4  border Border-white">
{candidate.Email}</td>
                           <td className="px-6 py-4  border Border-white">
{candidate.Phone}</td>
<td className="px-6 py-4  border Border-white">
{format(parseISO(candidate.BookDate), 'yyyy-MM-dd')}
</td>
                           <td className="px-6 py-4   border Border-white ">
                            {candidate.title}
                    </td>
                    <td className="px-6 py-4   border Border-white ">
                            {candidate.PaymentStatus}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border Border-white">

                      
                    <div className="d-flex align-items-center justify-content-center space-x-4 m-2">
  <div className="bg-primary rounded">
    <button  className="bg-primary text-white font-bold m-1 py-1 px-2 border border-primary" type="button" onClick={() => {
    handlePopupEdit(candidate.CandidateID)

                          }} ><FaEdit className="w-5 h-5" /></button>
  </div>
  <div className="bg-danger rounded">
    <button className="bg-danger text-white font-bold m-1 py-1 px-2 border border-danger" type="button"  
 onClick= {() => {handlePopupDelete(candidate.CandidateID)}}> <FaTrash className="w-5 h-5" /></button>


      
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
                  className=' bg-primary text-white rounded-l-lg border border-primary '
                  onClick={handlePreviousPage}
                >
                  <FaArrowLeft />
                </button>
                <p className='text-md text-primary ml-4 mr-4'>
                  Page {currentPage} of {Math.ceil(filteredCandidates.length / candidatePerPage)}
                </p>
                <button
                  className=' bg-primary text-white rounded-r-lg  border border-primary'
                  onClick={handleNextPage}
                >
                  <FaArrowRight />
                </button>
              </div>
            </div>


</div>
 </div>
 </div>
    )
}

export default Candidate;