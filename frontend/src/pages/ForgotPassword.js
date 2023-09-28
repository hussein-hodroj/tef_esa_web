import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../assets/logo1.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const errorTimeout = setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    const successTimeout = setTimeout(() => {
      setSuccessMessage('');
    }, 3000);

    return () => {
      clearTimeout(errorTimeout);
      clearTimeout(successTimeout);
    };
  }, [errorMessage, successMessage]);

  const handleForgotPassword = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (!email) {
      setErrorMessage('Email is required.');
      return;
    }

    try {
      await axios.post('http://localhost:8000/forget-password', { email });
      setSuccessMessage('Reset email sent successfully. Please check your email.');
    } catch (error) {
      setErrorMessage('Error sending password reset email. Please try again.');
    }
  };

  return (
    <div className="home-container bg-light" 
      style={{
        background: `url('https://www.esa.edu.lb/azure/files/ContentFiles/14WelcomeImage.jpg')`,
        backgroundSize: 'cover'
    }}
    >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',  
      }}
    >
      <div className="col-md-4" style={{ height: '350px' }}>
        <div className="card" style={{ 
           background: 'rgba(255, 255, 255, 0.7)', }}>
          <div className="card-body mt-3">
            <h2 className="card-title text-start "><img
                src={logo} 
                alt="Logo"
                style={{ width: '60px', height: 'auto' }}
                className='m-4'
              />Forgot Password</h2>
            {errorMessage && (
              <div className="alert alert-danger mt-2" role="alert">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="alert alert-success mt-2" role="alert">
                {successMessage}
              </div>
            )}
            
            <div className="form-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="text-center mt-5">
              <button className="btn btn-primary" onClick={handleForgotPassword}>
                Send Reset Email
              </button>
            </div>
            <div className="text-center mt-2">
              <Link to="/login">Back to Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ForgotPassword;
