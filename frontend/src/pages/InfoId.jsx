import React, {useState, useEffect} from 'react'; 
import axios from 'axios';
import SidebarAdmin from './SidebarAdmin.js';
import NavbarAdmin from './NavbarAdmin.js';
import { FaEdit, FaTrash,  FaArrowLeft, FaArrowRight, FaSearch } from 'react-icons/fa/index.esm.js';
import Popup from '../components/Candidateinfo/Popup.js';
import DeleteCandidate from '../components/Candidateinfo/DeleteCandidate.js'; 
import { useParams } from 'react-router-dom';
import { format} from 'date-fns';



function Info() {
  
    const [candidates, setCandidates] = useState({});
    const [show , setShow ] = useState(false);
      const [showDelete , setShowDelete ] = useState(false);
    const [selectedCandidateId, setSelectedCandidateId] = useState(null); 
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1); 
    const candidatePerPage = 10;
    const { CandidateID } = useParams();
    useEffect(() => {
        axios
          .get(`http://localhost:8000/register/getid/${CandidateID}`)
          .then((response) => setCandidates(response.data))
          .catch((error) => console.log(error));
      }, [CandidateID]);

      

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

    
    
    

    return (
<div>
{show && <Popup close={setShow} setCandidates={setCandidates} candidates={candidates} candidateId={selectedCandidateId}/>}
{showDelete && <DeleteCandidate openDelete={setShowDelete} candidateId={selectedCandidateId} setCandidate={setCandidates}/>}

<NavbarAdmin/>
 <div className='d-flex'>
 <SidebarAdmin/>


<div>
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
      <div className="m-3">
   <table className="table ">
             
   <thead>
              <tr>
                
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
                
          
        <tr  >
          
          <td className="px-6 py-4  border Border-white">
            {candidates.FirstName}
          </td>
          <td className="px-6 py-4  border Border-white">
            {candidates.LastName}
          </td>
          <td className="px-6 py-4  border Border-white">
            {candidates.Email}
          </td>
          <td className="px-6 py-4  border Border-white">
            {candidates.Phone}
          </td>
          <td className="px-6 py-4  border Border-white">
          {candidates.BookDate}
                    </td>
          <td className="px-6 py-4   border Border-white ">
            {candidates.title}
          </td>
          <td className="px-6 py-4   border Border-white ">
            {candidates.PaymentStatus}
          </td>
          <td className="px-6 py-4 whitespace-nowrap border Border-white">
            <div className="d-flex align-items-center justify-content-center space-x-4 m-2">
              <div className="bg-primary rounded">
                <button className="bg-primary text-white font-bold m-1 py-1 px-2 border border-primary" type="button" onClick={() => {
                  handlePopupEdit(candidates.CandidateID);
                }}>
                  <FaEdit className="w-5 h-5" />
                </button>
              </div>
              <div className="bg-danger rounded">
                <button className="bg-danger text-white font-bold m-1 py-1 px-2 border border-danger" type="button" onClick={() => {
                  handlePopupDelete(candidates.CandidateID);
                }}>
                  <FaTrash className="w-5 h-5" />
                </button>
              </div>
            </div>
          </td>
        </tr>
      
              </tbody>
          </table>
          </div>

</div>
 </div>
 </div>
    )
}

export default Info;