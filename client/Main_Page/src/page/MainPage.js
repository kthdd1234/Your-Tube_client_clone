/* eslint-disable jsx-a11y/alt-text */ ////
import React from "react";

import VideoList from "../page/VideoList";
import logo from "../logo.png";
import { searchVideo } from "../SearchVideo";
class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchKeyword: "", // 흰수염
      YouTubeData: "",
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleSearchData = this.handleSearchData.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      YouTubeData: nextProps.YouTubeVideos,
    });
  }

  handleInputValue(e) {
    const { value } = e.target;
    this.setState({
      searchKeyword: value,
    });
  }

  handleSearchData(e) {
    e.preventDefault();
    const { searchKeyword } = this.state;
    const { YouTubeVideos } = this.props;

    searchVideo(searchKeyword, YouTubeVideos, (filterVideos) =>
      this.setState({
        YouTubeData: filterVideos,
      })
    );
  }

  render() {
    const { YouTubeData } = this.state;
    return (
      <div>
        <center>
          <h1>
            <img
              src={logo}
              width="35px"
              style={{
                paddingRight: "5px",
              }}
            />
            YourTube
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              style={{
                width: "400px",
                height: "20px",
                margin: "5px",
                borderRadius: "22px",
                fontSize: "12px",
              }}
              placeholder="찾고 싶은 영상의 제목이나 단어를 입력하세요"
              onChange={this.handleInputValue}
            ></input>
            <button
              style={{
                width: "40px",
                height: "22px",
                padding: "2px",
                borderRadius: "7px",
                backgroundColor: "#f4511e",
                color: "white",
                transition: "0.4s",
              }}
              onClick={this.handleSearchData}
            >
              검색
            </button>
          </form>
        </center>
        <div className="videoList" style={{}}>
          {YouTubeData ? <VideoList YouTubeData={YouTubeData} /> : ""}
        </div>
      </div>
    );
  }
}

export default MainPage;
