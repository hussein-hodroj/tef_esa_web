import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const { userID, resetToken } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (message) {
      timer = setTimeout(() => {
        setMessage('');
      }, 5000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match. Please make sure both passwords match.');
      return;
    }

    if (!validatePassword(password)) {
      setMessage(
        'Password should be at least 8 characters long, contain at least one capital letter, and consist of letters and digits.'
      );
      return;
    }

    try {
      await axios.post(`http://localhost:8000/reset-password/${userID}/${resetToken}`, {
        password,
        confirmPassword,
      });

      navigate('/login');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setMessage('Invalid or expired reset token. Please request a new password reset.');
      } else {
        setMessage('Error updating password. Please try again.');
      }
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
      <div className="col-md-4">
        <div className="card">
          <div className="card-header">Reset Password</div>
          <div className="card-body">
            {message && (
              <div
                style={{
                  color: 'red',
                }}
              >
                {message}
              </div>
            )}
            <form onSubmit={handleResetPassword}>
              <div className="form-group">
                <label className="mt-4">New Password:</label>
                <input
                  type="password"
                  className="form-control mt-3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="mt-4">Confirm Password:</label>
                <input
                  type="password"
                  className="form-control mt-3"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="text-right d-flex justify-content-end mt-4">
                <button type="submit" className="btn btn-primary">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
