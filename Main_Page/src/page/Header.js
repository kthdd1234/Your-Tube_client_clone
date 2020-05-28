import React from 'react';
import logo from '../logo.png';
import './Header.css';

const Header = ({ handleSettingsToggle }) => {
  return (
    <div>
      <div className="YourTube">
        <img src={logo} alt="YoutubeLogo" className="HeaderLogo" />
        <h3 className="Logo">YourTube</h3>
      </div>
      <button className="modalButton" onClick={handleSettingsToggle}>
        &#8801; Settings
      </button>
    </div>
  );
};

export default Header;
