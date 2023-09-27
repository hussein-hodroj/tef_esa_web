import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Popup.css';
import { format, parseISO } from 'date-fns';


function Popup ({ close, candidateId, setCandidates, candidates }) {

  
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [BookDate, setBookDate] = useState('');
  const [PaymentStatus, setPaymentStatus] = useState(null);
  const [examId, setexamId] = useState([]);
  const [title,setTitle]=useState(null)
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const validateForm = () => {
    
    const newErrors = {};

    if (!FirstName) newErrors.FirstName = 'First Name is required';
    if (!LastName) newErrors.LastName = 'Last Name is required';
    if (!Email) newErrors.Email = 'Email is required';
    if (!Phone) newErrors.Phone = 'Phone Number is required';
    if (!BookDate) newErrors.BookDate = 'BookDate is required';
    if (!PaymentStatus) newErrors.PaymentStatus = 'Payment Status is required';
    if (!examId) newErrors.examId = 'examId is required';



    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  }

  
  useEffect(() => {
    console.log(candidateId)
    axios
      .get(`http://localhost:8000/register/getid/${candidateId}}`)
      .then(response =>{console.log(response)
        
        setFirstName(response.data.FirstName)
        setLastName(response.data.LastName)
        setEmail(response.data.Email)
        setPhone(response.data.Phone)
        setBookDate(new Date(response.data.BookDate).toISOString().substring(0, 10))
        setPaymentStatus(response.data.PaymentStatus)
        setexamId(response.data.examId)
        
    })
    .catch((error) => console.log(error));
}, [candidateId]);

 useEffect(() => {
    axios
      .get('http://localhost:8000/info/gettitle')
      .then((response) => setTitle(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm();

    if (isValid) {
      const formData = new FormData();
      formData.append('FirstName', FirstName);
      formData.append('LastName', LastName);
      formData.append('Email', Email);
      formData.append('Phone', Phone);
      formData.append('BookDate', BookDate);
      formData.append('PaymentStatus', PaymentStatus);
      formData.append('examId', examId);
      
  

      axios
      .put(`http://localhost:8000/register/update/${candidateId}`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        const updatedCandidate = response.data;
        const updatedCandidates = candidates.map((candidate) =>
          candidate.CandidateID === updatedCandidate.CandidateID ? updatedCandidate : candidate
        );
        setCandidates(updatedCandidates);

       
        close(false);
        window.location.reload()
      })
      .catch((error) => {
        console.log('Error while submitting the form:', error);
      });
    
    }
  };
  return (
    <div className = "modalBackground">
<form onSubmit={(e)=>handleSubmit(e)}>
        <div className= "modalContainer">
        <div className = "titleCloseBtn d-flex justify-content-between mb-4 mt-4">
  <h1 className="text-white font-bold d-flex justify-content-start align-items-start"
   style ={{ display: "inline-block",
   textAlign: "start",
   width: "350px",
   fontSize: "x-large"}}> Edit Candidate Profile: </h1>

        <button onClick = {() => close(false) } className="text-white">  X  </button>
        </div>
     
        <div className = "body">

   <div className="d-flex justify-content-between">
        <div className="mb-2">
      <label
              className="block text-white text-sm form-label font-bold mb-2"
              htmlFor="FirstName"> First Name </label>
            <input
              className="shadow form-control w-64 mb-2 border rounded py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              id="FirstName"
              type="text"
              name="FirstName"
              value={FirstName}
              onChange={(e) => setFirstName(e.target.value)}
              /> 
              {errors.FirstName && <p className="text-danger text-sm">{errors.FirstName}</p>}
              </div>
              <div className="mb-2">
             <label
              className="block text-white text-sm form-label font-bold mb-2"
              htmlFor="LastName">Last Name </label>
            <input
              className="shadow form-control w-64 mb-2 border rounded  py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              id="LastName"
              type="text"
              name="LastName"
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
              /> 
              {errors.LastName&& <p className="text-danger text-sm">{errors.LastName}</p>}

              </div>          
              </div>
              <div className="d-flex justify-content-between">
            
               <div className="mb-2">
                  <label className="block text-white text-sm font-bold mb-2 form-label" htmlFor="Email">
            Email
          </label>
          <input
            className="shadow form-control border w-64 rounded py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            id="Email"
            type="text"
            name="Email"
             value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />  
             

              </div>        
                
              
              <div className="mb-2">
              <label
              className="block text-white text-sm font-bold mb-2 form-label"
              htmlFor="Phone"> Phone </label>
            <input
              className="shadow form-control w-full mb-2 border rounded  py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              id="Phone"
              type="text"
              name="Phone"
              value={Phone}
              onChange={(e) => setPhone(e.target.value)}
              />   
            {errors.Phone && <p className="text-danger text-sm">{errors.Phone}</p>}

        </div>
        </div>
        <div className= 'd-flex justify-content-between'>
        <div className="mb-2">
                <label className="block text-black text-sm font-bold mb-2 form-label" htmlFor="BookDate">
            Book Date
          </label>
          <input
            className="shadow form-control border w-64 rounded py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            id="BookDate"
            type="date"
            value={BookDate}
            name="BookDate"
            onChange={(e) => setBookDate(e.target.value)}
          />  
             
              </div> 
              <div className="mb-2">
                <label className="block text-black text-sm font-bold mb-2 form-label" htmlFor="PaymentStatus">
            Payment Status
          </label>
          <input
            className="shadow form-control border w-64 rounded py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            id="PaymentStatus"
            type="input"
            value={PaymentStatus}
            name="PaymentStatus"
            onChange={(e) => setPaymentStatus(e.target.value)}
          />  
             
              </div>
              </div>   
              <div className="mb-2">
        <label
              className="block text-white text-sm font-bold mb-2 form-label"
              htmlFor="Title"> Title </label>
            <select
  className="shadow form-control w-full mb-2 border rounded py-2 px-2 text-black leading-tight focus:outline-none focus:shadow-outline"
  id="Title"
  type="text"
  name="Title"
  value={examId}
  onChange={(e) => setexamId(e.target.value)}
>


                 {title?.map((t) => (
        <option key={t.infoid} value={t.infoid}>
          {t.title}
        </option>
      ))}       
              </select>
              {errors.examId && <p className="text-danger text-sm">{errors.examId}</p>}

               </div>      
              </div>
             
        
          <div className = "footer">
            <button onClick = {() => close(false) } id="cancelBtn"> Cancel </button>
            <button type = "submit"> Save </button>

          </div>

      </div>
      </form>

    </div>
  );
};

export default Popup;

