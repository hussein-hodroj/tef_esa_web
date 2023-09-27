import React from 'react';
import canadaFlag from '../assets/canada.jpg';
import logo from '../assets/logo1.png';

function Header() {
  const headerStyle = {
    backgroundImage: `url(${canadaFlag})`,
    backgroundSize: 'cover',
    height: '30vh',
  };

  const logoStyle = {
    maxWidth: '80%',
    height: '25vh',
    maxHeight: '50%',
    marginTop: '130px',
    marginLeft: '85px',
  };

  const grayBackgroundStyle = {
    background: '#7895B2',
    height: '30px',
  };

  return (
    <div>
      <header style={headerStyle}>
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12 col-md-2">
            <a href="/" style={{ textDecoration: 'none' }}>
              <img src={logo} alt="Logo" style={logoStyle} />
              </a>
            </div>
          </div>
        </div>
      </header>
      <div style={grayBackgroundStyle}></div>
    </div>
  );
}

export default Header;
