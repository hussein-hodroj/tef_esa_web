import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import SidebarAdmin from './SidebarAdmin'; // Import your SidebarAdmin component
import NavbarAdmin from './NavbarAdmin';

function AdminProfileUpdate() {
  const [adminInfo, setAdminInfo] = useState({
    UserID: '',
    Username: '',
    Email: '',
  });
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();
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
        })
        .catch((error) => {
          console.error('Error updating admin profile:', error);
        });
    }
  };

  return (
    <div>
      <NavbarAdmin />
      <div className="container mt-">
        <div className="row">
          <div className="col d-flex justify-start">
            {/* Include the sidebar here */}
            <SidebarAdmin />
          </div>
          <div className="col-md-9 mt-4">
            <h1>Update Admin Profile</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={adminInfo.Username}
                  onChange={(e) =>
                    setAdminInfo({ ...adminInfo, Username: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={adminInfo.Email}
                  onChange={(e) =>
                    setAdminInfo({ ...adminInfo, Email: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">
                  New Password:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Update Profile
              </button>
            </form>
            {message && <p>{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfileUpdate;
