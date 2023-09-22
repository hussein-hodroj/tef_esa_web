import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import SidebarAdmin from './SidebarAdmin'; 
import NavbarAdmin from './NavbarAdmin';

function AdminProfileUpdate() {
  const [adminInfo, setAdminInfo] = useState({
    UserID: '',
    Username: '',
    Email: '',
  });
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [passwordStructureError, setPasswordStructureError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      const adminID = decoded.user.UserID;

      axios
        .get(`http://localhost:8000/profile/${adminID}`)
        .then((response) => {
          const adminInfoData = response.data.adminInfo;
          setAdminInfo(adminInfoData);
        })
        .catch((error) => {
          console.error('Error fetching admin information:', error);
        });
    }
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordMatchError('');
    setPasswordStructureError('');

    if (!validateEmail(adminInfo.Email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMatchError('Passwords do not match.');
      return;
    }

    if (!validatePassword(newPassword)) {
      setPasswordStructureError(
        'Password must be at least 8 characters long, contain both letters and digits, and have at least one capital letter.'
      );
      return;
    }

    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      const adminID = decoded.user.UserID;

      axios
        .put(`http://localhost:8000/profile/${adminID}`, {
          username: adminInfo.Username,
          email: adminInfo.Email,
          newPassword,
        })
        .then((response) => {
          setMessage(response.data.message);
          setTimeout(() => {
            setMessage('');
          }, 3000);
        })
        .catch((error) => {
          console.error('Error updating admin profile:', error);
          setMessage(error.message || 'An error occurred.');
        });
    }
  };

  return (
    <div className="bg-light">
      <NavbarAdmin />
      <div className="d-flex">
        <div className="col-md-3">
          <SidebarAdmin />
        </div>
        <div className="container ">
          <div className="row">
            <div className="col-md-9 mt-5">
              <h1>Update Admin Profile</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label mt-5">
                    Username:
                  </label>
                  <input
                    type="text"
                    className="form-control  mt-2"
                    id="username"
                    value={adminInfo.Username}
                    onChange={(e) =>
                      setAdminInfo({ ...adminInfo, Username: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label  mt-2">
                    Email:
                  </label>
                  <input
                    type="email"
                    className={`form-control  mt-2 ${emailError ? 'is-invalid' : ''}`}
                    id="email"
                    value={adminInfo.Email}
                    onChange={(e) =>
                      setAdminInfo({ ...adminInfo, Email: e.target.value })
                    }
                  />
                  {emailError && (
                    <div className="invalid-feedback">{emailError}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label  mt-2">
                    New Password:
                  </label>
                  <input
                    type="password"
                    className={`form-control  mt-2 ${
                      passwordStructureError ? 'is-invalid' : ''
                    }`}
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  {passwordStructureError && (
                    <div className="invalid-feedback">
                      {passwordStructureError}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label  mt-2">
                    Confirm New Password:
                  </label>
                  <input
                    type="password"
                    className={`form-control  mt-2 ${
                      passwordMatchError ? 'is-invalid' : ''
                    }`}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {passwordMatchError && (
                    <div className="invalid-feedback">
                      {passwordMatchError}
                    </div>
                  )}
                </div>
                <div className="d-flex justify-content-end  mt-4">
                  <button type="submit" className="btn btn-primary">
                    Update Profile
                  </button>
                </div>
              </form>
              {message && (
                <div className="mt-3">
                  <div
                    className={`alert ${
                      message.includes('Error') ? 'alert-danger' : 'alert-success'
                    }`}
                  >
                    {message}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfileUpdate;
