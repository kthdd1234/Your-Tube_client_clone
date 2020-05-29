
import React from 'react';

import "./Header.css";
import {withRouter} from 'react-router-dom';
import logo from '../images/yourtube-small.png';

const Header = ({ handleSettingsToggle, handleToggleHeader }) => {
  return (
    <div onClick={handleToggleHeader}>
      <div className="YourTube">
        <img src={logo} alt="YoutubeLogo" className="HeaderLogo" onClick={() => {
          props.history.push('/user');
        }}/>
        <h3 className="Logo">YourTube</h3>
      </div>
      <button className='modalButton' onClick={props.handleSettingsToggle}>
        &#8801; Settings
      </button>
    </div>
  );
};

export default withRouter(Header);
