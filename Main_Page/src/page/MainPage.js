import React from "react";
import VideoList from "../page/VideoList";
import { searchVideo } from "../SearchVideo";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Modal from "../page/Modal";
import Header from "./Header";
class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchKeyword: "",
      YouTubeData: "",
      modalOpen: false,
      darkMode: false,
    };

    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleSearchData = this.handleSearchData.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleModalButtonClick = this.handleModalButtonClick.bind(this);
    this.handleClickDarkMode = this.handleClickDarkMode.bind(this);
  }
  componentDidMount() {
    axios
      .post(
        "http://ec2-3-34-130-32.ap-northeast-2.compute.amazonaws.com:4611/signin",
        {
          id: 1,
        }
      )
      .then((res) => {
        return res.data.token;
      })
      .then((data) => {
        axios
          .get(
            "http://ec2-3-34-130-32.ap-northeast-2.compute.amazonaws.com:4611/list",
            {
              headers: { "x-api-key": data },
            }
          )
          .then((res) => {
            console.log(res.data);
            let YouTubeData = [];
            for (let video of res.data) {
              const { id, title, description, channelId, thumbnail } = video;
              const userData = {
                id: id,
                thumbnail: thumbnail,
                title: title,
                description: description,
                channelId: channelId,
              };
              YouTubeData.push(userData);
            }

            this.setState({
              YouTubeData: YouTubeData,
            });
          });
      });
  }
  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   console.log(nextProps);
  //   this.setState({
  //     YouTubeData: nextProps.YouTubeVideos,
  //   });
  // }
  handleClickDarkMode() {
    this.setState((preState) => ({
      darkMode: !preState.darkMode,
    }));
  }

  handleModalButtonClick() {
    this.setState((preState) => ({
      modalOpen: !preState.modalOpen,
    }));
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
    const { YouTubeData, modalOpen, darkMode } = this.state;

    console.log("Receive Server Data: ", YouTubeData);
    return (
      <div className={darkMode ? "mainPage dark" : "mainPage light"}>
        <center>
          <Header handleModalButtonClick={this.handleModalButtonClick} />
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
          <div className="videoList" style={{}}>
            {YouTubeData ? <VideoList YouTubeData={YouTubeData} /> : ""}
          </div>
        </center>
        <Modal
          modalOpen={modalOpen}
          handleLogout={this.handleLogout}
          modalClose={this.handleModalButtonClick}
          handleDarkMode={this.handleClickDarkMode}
        />
      </div>
    );
  }
}
export default withRouter(MainPage);
