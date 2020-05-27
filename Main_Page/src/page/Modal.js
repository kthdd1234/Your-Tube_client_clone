import React, { Component } from "react";
import logo from "../logo.png";
export default class Modal extends Component {
  render() {
    return (
      <div className={this.props.modalOpen ? "modal Open" : "modal"}>
        <div className="modal-Close" onClick={this.props.modalClose}></div>
        <div className={this.props.darkMode ? "sidebar darkMode" : "sidebar"}>
          <button
            className={this.props.darkMode ? "buttonX darkMode" : "buttonX"}
            onClick={this.props.modalClose}
          >
            &times; {/*  &times; === x  */}
          </button>
          <h3>
            <img src={logo} alt="YoutubeLogo" className="ModalLogo" />
            YourTube
          </h3>

          <hr />
          <div>유튜브 계정 썸네일</div>
          <div>유튜브 계정 아이디</div>
          <div>유저 Email</div>

          <hr />
          <fieldset>
            <legend>모드</legend>
            <label>
              <input
                type="checkbox"
                onChange={this.props.handleDarkMode}
              ></input>
              <span>어두운 테마 사용</span>
            </label>
          </fieldset>

          <hr />
          <center>
            <button className="LogoutButton" onClick={this.props.handleLogout}>
              로그아웃
            </button>
          </center>
        </div>
      </div>
    );
  }
}
