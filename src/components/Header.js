import React from 'react';
import headerLogo from '../assets/logo.png'; // Ensure the path to your logo is correct

function Header() {
    return (
        <header style={headerStyle}>
            <img
                src={headerLogo} // Use the imported image
                alt="Company Logo"
                style={logoStyle}
            />
            <h1 style={titleStyle}>5G serviceProvider</h1>
        </header>
    );
}

const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 8px',
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #ddd',
    width: '100%',
    boxSizing: 'border-box',
    position: 'fixed',
    zIndex: 100,
    top: 0,
    left: 0,


};

const logoStyle = {
    width: '160px',
    height: '80px'
};

const titleStyle = {
    marginLeft: '20px',
    fontSize: '28px',
    color: '#333'
};

export default Header;
