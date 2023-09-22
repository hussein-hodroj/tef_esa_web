import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
      setSuccessMessage('Password reset email sent successfully. Please check your email.');
    } catch (error) {
      setErrorMessage('Error sending password reset email. Please try again.');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#f5f5f5',
      }}
    >
      <div className="col-md-6" style={{ height: '350px' }}>
        <div className="card" style={{ height: '100%' }}>
          <div className="card-body mt-3">
            <h2 className="card-title text-center mb-5">Forgot Password</h2>
            
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
            <div className="text-center mt-4">
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
  );
};

export default ForgotPassword;
