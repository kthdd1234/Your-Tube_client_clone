import React, { Component } from "react";
import logo from "../logo.png";
export default class Modal extends Component {
  render() {
    return (
      <div className={this.props.modalOpen ? "modal Open" : "modal"}>
        <div className="sidebar">
          <button
            style={{
              fontSize: "25px",
              float: "right",
              color: "gray",
              background: "none",
              border: "none",
            }}
            onClick={this.props.modalClose}
          >
            &times;
          </button>
          <h3>
            <img
              src={logo}
              width="15px"
              style={{
                paddingRight: "5px",
              }}
            />
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
              <span>다크모드</span>
            </label>
          </fieldset>

          <hr />
          <center>
            <button
              style={{
                paddingTop: "10px",
                paddingBottom: "10px",
                paddingLeft: "30px",
                paddingRight: "30px",
                borderRadius: "7px",
                backgroundColor: "rgb(223, 208, 208)",
                fontWeight: "bolder",
              }}
              onClick={this.props.handleLogout}
            >
              로그아웃
            </button>
          </center>
        </div>
      </div>
    );
  }
}
