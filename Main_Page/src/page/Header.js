import React, { Component } from "react";
import logo from "../logo.png";
export default class Header extends Component {
  render() {
    return (
      <div>
        <button
          className={
            this.props.darkMode ? "modalButton darkMode" : "modalButton"
          }
          onClick={this.props.handleModalButtonClick}
        >
          &#8801; 유저 정보 {/* &#8801; === 햄버거 */}
        </button>
        <center>
          <div
            className={this.props.darkMode ? "YourTube darkMode" : "YourTube"}
          >
            <img src={logo} alt="YoutubeLogo" className="HeaderLogo" />
            YourTube
          </div>
        </center>
      </div>
    );
  }
}
