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
import NavbarAdmin from './NavbarAdmin.js';

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
    <NavbarAdmin />
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
            <div onClick={() => navigate('/tables')} className="activeClicked">
              <CDBSidebarMenuItem icon="table" className='bg-black text-white'>Tables</CDBSidebarMenuItem>
            </div>
            <div onClick={() => navigate('/analytics')} className="activeClicked">
              <CDBSidebarMenuItem icon="chart-line" className='bg-black text-white'>Analytics</CDBSidebarMenuItem>
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
