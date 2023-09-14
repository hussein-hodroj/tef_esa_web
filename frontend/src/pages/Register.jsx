import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
  });

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedDateParam = queryParams.get('date');
  const totalCostParam = queryParams.get('cost');
  const feesParam = queryParams.get('fees');
  const infoidParam = queryParams.get('infoid');
  const CurrencyParam = queryParams.get('Currency');


  const selectedDate = selectedDateParam
    ? new Date(selectedDateParam).toLocaleDateString()
    : '';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
};
  return (
    <div style={{backgroundColor: 'whitesmoke'}}>
    {/* exemple for taking the date */}

        <div className="row">

        <div className='col-12'> <label>Selected Date: {selectedDateParam}</label></div>
              <div className='col-4'><label> infoidParam: {infoidParam}</label></div>
              <div className='col-4'><label>totalCostParam: {totalCostParam}</label></div>
              <div className='col-4'><label>feesParam: {feesParam}</label></div>
              <div className='col-4'><label>CurrencyParam: {CurrencyParam}</label></div>
             
           
      </div>




      <div className=" d-flex justify-content-start align-items-start m-5">
        <form className="col-xl-7 col-lg-7 col-md-7 col-sm-7" action="" >
            <div className="mb-3 px-2 row ">
          <label className="form-group mb-2" htmlFor="title">
            Title:
            <div className="d-flex justify-content-start m-4">
            <div className="form-check">
  <input type="radio" className="form-check-input" id="titlecheck1" name="firstradio" />
  <label className="form-check-label me-4" htmlFor="titlecheck1">Mister</label>
</div>

<div className="form-check">
  <input type="radio" className="form-check-input" id="titlecheck2" name="firstradio" />
  <label className="form-check-label" htmlFor="titlecheck2">Madam</label>
</div>
</div>
          </label>
            </div>            
            <div className="row mb-3 px-2">
          <label className="form-group mb-2 " htmlFor="passportNumber">
            Passport Number
            <input type="text" className="form-control" name="PassportNumber" id="PassportNumber" placeholder="" />
          </label>
            </div>  


            <div className="mb-3 px-2 d-flex justify-content-between">
  <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5">
    <label htmlFor="firstName" className="form-label mb-2">First Name</label>
    <input
      type="text"
      className="form-control"
      name="firstName"
      id="firstName"
      placeholder="Enter your first name"
    />
  </div>
  <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5">
    <label htmlFor="lastName" className="form-label mb-2">Last Name</label>
    <input
      type="text"
      className="form-control"
      name="lastName"
      id="lastName"
      placeholder="Enter your lastName"
    />
  </div>
</div>


<div className="mb-3 px-2 d-flex justify-content-between">
  <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5">
    <label htmlFor="dateOfBirth" className="form-label mb-2">Date Of Birth</label>
    <input
      type="text"
      className="form-control"
      name="dateOfBirth"
      id="dateOfBirth"
      placeholder="Enter your date of birth"
    />
  </div>
  <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5">
    <label htmlFor="nationality" className="form-label mb-2">Nationality</label>
    <input
      type="text"
      className="form-control"
      name="nationality"
      id="nationality"
      placeholder="Enter your nationality"
    />
  </div>
</div>

<div className="mb-3 px-2 d-flex justify-content-between">
  <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5">
    <label htmlFor="language" className="form-label mb-2">Tongue Language</label>
    <input
      type="text"
      className="form-control"
      name="language"
      id="language"
      placeholder="Enter your tongue language"
    />
  </div>
  <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5">
    <label htmlFor="address" className="form-label mb-2">Address</label>
    <input
      type="text"
      className="form-control"
      name="address"
      id="address"
      placeholder="Enter your address"
    />
  </div>
</div>

<div className="mb-3 px-2 d-flex justify-content-between">
  <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5">
    <label htmlFor="country" className="form-label mb-2">Country</label>
    <input
      type="text"
      className="form-control"
      name="country"
      id="country"
      placeholder="Enter your country"
    />
  </div>
  <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5">
    <label htmlFor="town" className="form-label mb-2">Town</label>
    <input
      type="text"
      className="form-control"
      name="town"
      id="town"
      placeholder="Enter your town"
    />
  </div>
</div>

<div className="mb-3 px-2 d-flex justify-content-between">
  <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5">
    <label htmlFor="email" className="form-label mb-2">Email</label>
    <input
      type="text"
      className="form-control"
      name="email"
      id="email"
      placeholder="Enter your email"
    />
  </div>
  <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5">
    <label htmlFor="phonenumber" className="form-label mb-2">Phone Number</label>
    <input
      type="text"
      className="form-control"
      name="phonenumber"
      id="phonenumber"
      placeholder="Enter your phone number"
    />
  </div>
</div>


<div className="mb-3 px-2 row ">
          <label className="form-group mb-2" htmlFor="motivation">
          Motivation
            <div className="d-flex justify-content-between">
            <div className="form-check">
  <input type="radio" className="form-check-input" id="titlecheck3" name="secondradio" />
  <label className="form-check-label " htmlFor="titlecheck3">Academic</label>
</div>

<div className="form-check">
  <input type="radio" className="form-check-input" id="titlecheck4" name="secondradio" />
  <label className="form-check-label" htmlFor="titlecheck4">Immigration to Quebec</label>
</div>
</div>
<div className="d-flex justify-content-between">
            <div className="form-check">
  <input type="radio" className="form-check-input" id="titlecheck5" name="secondradio" />
  <label className="form-check-label " htmlFor="titlecheck5">Immigration to Canada</label>
</div>

<div className="form-check">
  <input type="radio" className="form-check-input" id="titlecheck6" name="secondradio" />
  <label className="form-check-label" htmlFor="titlecheck6">Individual</label>
</div>
</div>

<div className="d-flex justify-content-between">
            <div className="form-check">
  <input type="radio" className="form-check-input" id="titlecheck7" name="secondradio" />
  <label className="form-check-label " htmlFor="titlecheck7">Studies in France</label>
</div>

<div className="form-check">
  <input type="radio" className="form-check-input" id="titlecheck8" name="secondradio" />
  <label className="form-check-label" htmlFor="titlecheck8">Access to French nationality</label>
</div>
</div>
<div className="d-flex justify-content-between">
            <div className="form-check">
  <input type="radio" className="form-check-input" id="titlecheck9" name="secondradio" />
  <label className="form-check-label " htmlFor="titlecheck9">Professional</label>
</div>
</div>
          </label>
            </div> 
</form>
</div>
    </div>
);
};

export default Register;
