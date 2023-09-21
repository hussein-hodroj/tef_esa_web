import React, { useEffect } from 'react';
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

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.user.Role !== 'admin') {
         
          navigate('/login');
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
    
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#000">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Admin
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
            <div onClick={() => navigate('/profile')} className="activeClicked">
                <CDBSidebarMenuItem icon="user" className='bg-black text-white'>Update Admin Profile</CDBSidebarMenuItem>
              </div>

          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter>
          {/* Add your footer content here */}
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  </div>
);
};

export default SidebarAdmin;
