import React from 'react';
import logo from '../logo.png';

const Header = ({handleSettingsToggle}) => {
  return (
    <div>
      <div className='YourTube'>
        <img src={logo} alt='YoutubeLogo' className='HeaderLogo' />
        YourTube
      </div>
      <button className='modalButton' onClick={handleSettingsToggle}>
        &#8801; Settings
      </button>
    </div>
  );
};

export default Header;
