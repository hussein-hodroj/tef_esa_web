import React from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom'; 

function NavbarAdmin() {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Navbar className="bg-black">
      <Container>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end ">
          <Button variant="secondary" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right"></i> Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarAdmin;
