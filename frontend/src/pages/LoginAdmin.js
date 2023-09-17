import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import Link from react-router-dom

const LoginAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate(); 

  const handleLogin = async () => {
    setEmailError('');
    setPasswordError('');

    try {
      const response = await axios.post('http://localhost:8000/login', { email, password });
      const { token } = response.data;

      localStorage.setItem('token', token);
     
      navigate('/dashboard');
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setEmailError('Incorrect email. Please try again.');
        } else if (error.response.status === 400) {
          setPasswordError('Incorrect password. Please try again.');
        }
      } else {
        console.error('Login failed:', error);
      }

      setTimeout(() => {
        setEmailError('');
        setPasswordError('');
      }, 3000);
    }
  };
  
  return (
    <div className="container">
      <div className="row justify-center p-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Admin Login</h2>
              {emailError && <div className="alert alert-danger">{emailError}</div>}
              <div className={`form-group mb-3 ${emailError ? 'has-error' : ''}`}>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {passwordError && <div className="alert alert-danger">{passwordError}</div>}
              <div className={`form-group mb-3 ${passwordError ? 'has-error' : ''}`}>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="text-center mt-3">
                <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                {/* Link to the Forgot Password page */}
                <Link to="/forgotpassword" className="btn btn-link">Forgot Password</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
