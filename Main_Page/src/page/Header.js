import React from 'react';
import {withRouter} from 'react-router-dom';
import logo from '../images/yourtube-small.png';

const Header = (props) => {
  return (
    <div>
      <div
        className='YourTube'
        onClick={() => {
          props.history.push('/user');
        }}>
        <img src={logo} alt='logo' className='HeaderLogo' />
        YourTube
      </div>
      <button className='modalButton' onClick={props.handleSettingsToggle}>
        &#8801; Settings
      </button>
    </div>
  );
};

export default withRouter(Header);
