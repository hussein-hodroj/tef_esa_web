import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const { userID, resetToken } = useParams();
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match. Please make sure both passwords match.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8000/reset-password/${userID}/${resetToken}`, {
        password,
        confirmPassword,
      });

      if (response.data.message === 'Password reset successful') {
        setMessage('Password updated successfully. You can now login with your new password.');

        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setMessage('Error updating password. Please try again.');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setMessage('Invalid or expired reset token. Please request a new password reset.');
      } else {
        setMessage('Error updating password. Please try again.');
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header ">Reset Password</div>
            <div className="card-body">
              {message && <div className="alert alert-info">{message}</div>}
              <form onSubmit={handleResetPassword}>
                <div className="form-group">
                  <label className='mt-4'>New Password:</label>
                  <input
                    type="password"
                    className="form-control mt-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className='mt-4'>Confirm Password:</label>
                  <input
                    type="password"
                    className="form-control mt-3"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-5">
                  Update Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
