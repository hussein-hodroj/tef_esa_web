import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { useNavigate } from 'react-router-dom';

const SidebarAdmin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.user.Role !== 'admin') {
          navigate('/login');
        } else {
          setUsername(decoded.user.Username);
        }
      } catch (error) {
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <div style={{ display: 'flex', height: '1450px', overflow: 'scroll initial' }}>
        <CDBSidebar textColor="#fff" backgroundColor="#000">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
              {username} 
            </a>
          </CDBSidebarHeader>

          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <div onClick={() => navigate('/')} className="activeClicked">
                <CDBSidebarMenuItem icon="columns" className='bg-black text-white'>Dashboard</CDBSidebarMenuItem>
              </div>
              <div onClick={() => navigate('/updatehome')} className="activeClicked">
                <CDBSidebarMenuItem icon="table" className='bg-black text-white'>Home Update</CDBSidebarMenuItem>
              </div>
              <div onClick={() => navigate('/updateexam')} className="activeClicked">
                <CDBSidebarMenuItem icon="chart-line" className='bg-black text-white'>Exam update</CDBSidebarMenuItem>
              </div>
              <div onClick={() => navigate('/updatecourse')} className="activeClicked">
                <CDBSidebarMenuItem icon="chart-line" className='bg-black text-white'>Course update</CDBSidebarMenuItem>
              </div>
              <div onClick={() => navigate('/status')} className="activeClicked">
                <CDBSidebarMenuItem icon="calendar" className='bg-black text-white'>Update lockdates</CDBSidebarMenuItem>
              </div>
              <div onClick={() => navigate('/profile')} className="activeClicked">
                <CDBSidebarMenuItem icon="user" className='bg-black text-white'>Update Admin Profile</CDBSidebarMenuItem>
              </div>
              <div onClick={() => navigate('/bigcalendar')} className="activeClicked">
                <CDBSidebarMenuItem icon="calendar" className='bg-black text-white'>Calendar</CDBSidebarMenuItem>
              </div>
              
            </CDBSidebarMenu>
          </CDBSidebarContent>

          <CDBSidebarFooter>
            <div
              style={{
                display: 'flex',
                justifyContent: 'end',
                alignItems: 'center',
                height: '60px',
                position: 'fixed',
                bottom: '0',
                width: '100%',
                backgroundColor: 'transparent',
                zIndex: '1000',
              }}
            >
              <button
                className="btn btn-light rounded-circle m-5"
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  });
                }}
              >
                <i className="fa fa-arrow-up"></i>
              </button>
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
    </div>
  );
};

export default SidebarAdmin;
