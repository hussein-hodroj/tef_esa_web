import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/logo1.png';
const LoginAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('Email is required.');
      setTimeout(() => setEmailError(''), 3000);
      return;
    }

    if (!password) {
      setPasswordError('Password is required.');
      setTimeout(() => setPasswordError(''), 3000);
      return;
    }

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
      
      <div className="col-md-4 ">
        <div className="card" style={{
            background: 'rgba(255, 255, 255, 0.7)', 
          }}>
        
          <div className="card-body ">
            <h2 className="card-title text-start mb-4"><img
                src={logo} 
                alt="Logo"
                style={{ width: '60px', height: 'auto' }}
                className='m-5'
              />Admin Login</h2>
            {emailError && <div className="alert alert-danger mb-3">{emailError}</div>}
            <div className={`form-group mb-3 ${emailError ? 'has-error' : ''}`}>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {passwordError && <div className="alert alert-danger mb-3">{passwordError}</div>}
            <div className={`form-group mb-4 ${passwordError ? 'has-error' : ''}`}>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="text-center mt-3">
              <button className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>
              <div className="mt-2">
                <Link to="/forgotpassword">Forgot Password</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LoginAdmin;
