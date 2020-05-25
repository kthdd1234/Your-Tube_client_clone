import React from "react";
import VideoList from "../page/VideoList";
import logo from "../logo.png";
import { searchVideo } from "../SearchVideo";
import { withRouter } from "react-router-dom";

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchKeyword: "",
      YouTubeData: "",
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleSearchData = this.handleSearchData.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      YouTubeData: nextProps.YouTubeVideos,
    });
  }
  handleLogout() {
    this.props.history.push("/login");
  }
  handleInputValue(e) {
    e.preventDefault();
    const { value } = e.target;
    this.setState({
      searchKeyword: value,
    });
  }

  handleSearchData(e) {
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
    console.log("Receive Server Data: ", YouTubeData);
    return (
      <div>
        <button
          style={{
            float: "right",
            padding: "10px",
            margin: "10px",
            borderRadius: "7px",
            backgroundColor: "orange",
          }}
          onClick={this.handleLogout}
        >
          로그아웃
        </button>
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
export default withRouter(MainPage);
