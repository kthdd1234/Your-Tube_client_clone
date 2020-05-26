import React, { Component } from "react";
import logo from "../logo.png";
export default class Header extends Component {
  render() {
    return (
      <div>
        <button
          // className={}
          onClick={this.props.handleModalButtonClick}
          style={{
            width: "100px",
            height: "30px",
            float: "right",

            background: "rgb(252, 246, 246)",
            borderRadius: "7px",
            fontSize: "15px",
            fontWeight: "bolder",
          }}
        >
          유저 정보
        </button>
        <center>
          <div
            style={{
              textAlign: "center",
              fontSize: "30px",
              margin: "18px",
            }}
          >
            <img
              src={logo}
              width="35px"
              style={{
                paddingRight: "5px",
              }}
            />
            YourTube
          </div>
        </center>
      </div>
    );
  }
}
