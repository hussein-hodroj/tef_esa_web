import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
function NavbarAdmin() {
  return (
    <Navbar className="bg-dark">
      <Container>
        
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end ">
        <Button variant="secondary"><i class="bi bi-box-arrow-right"></i></Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarAdmin;