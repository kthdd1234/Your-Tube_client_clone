import React, { Component } from "react";

export default class SearchVar extends Component {
  render() {
    return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            className={
              this.props.darkMode ? "SearchtBar darkMode" : "SearchtBar"
            }
            placeholder="찾고 싶은 영상의 제목이나 단어를 입력하세요"
            onChange={this.props.handleInputValue}
          ></input>
          <button
            className={
              this.props.darkMode ? "SearchtButton darkMode" : "SearchtButton"
            }
            onClick={this.props.handleSearchData}
          >
            검색
          </button>
        </form>
      </div>
    );
  }
}
