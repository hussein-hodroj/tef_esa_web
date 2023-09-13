import React from 'react';

function Footer() {
  const footerStyle = {
    backgroundColor: '#7895B2',
    color: 'white',
    padding: '20px 40px', 
    textAlign: 'center',
    height: '110px',
    fontSize: '14px', 
  };

  const Style1 = {
    float: 'left',
  };

  const esaInfoStyle = {
    float: 'right',
  };

  return (
    <footer style={footerStyle}>
      <div style={Style1}>
      © All Rights Reserved 2018
      </div>
      <div style={esaInfoStyle}>
        ESA Campus, 289 Clemenceau, Beirut, Lebanon
        <br />
        PO Box 113-7318, T +961 1 373373 ext.1125, F. +961 1 373374 on right
      </div>
    </footer>
  );
}

export default Footer;
