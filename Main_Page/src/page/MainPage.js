
import React from "react";
import VideoList from "../page/VideoList";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Modal from "../page/Modal";
import Header from "./Header";
import VideoPlayer from "./VideoPlayer";

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchKeyword: '',
      YouTubeData: '',
      modalOpen: false,
      darkMode: false,
      clickVideo: null,
    };

    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleSearchData = this.handleSearchData.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleModalButtonClick = this.handleModalButtonClick.bind(this);
    this.handleClickDarkMode = this.handleClickDarkMode.bind(this);
    this.hadleClickVideoPlayer = this.hadleClickVideoPlayer.bind(this);
  }
  componentDidMount() {
    axios
      .post(

        "http://ec2-3-34-122-219.ap-northeast-2.compute.amazonaws.com:4611/signin",

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

            "http://ec2-3-34-122-219.ap-northeast-2.compute.amazonaws.com:4611/list",

            {
              headers: { 'x-api-key': data },
            }
          )
          .then((res) => {
            console.log(res.data);
            this.setState({
              YouTubeData: res.data,
            });
          });
      });
  }

  handleClickDarkMode() {
    this.setState((preState) => ({
      darkMode: !preState.darkMode,
    }));
  }

  hadleClickVideoPlayer(video) {
    this.setState({
      clickVideo: video,
    });
  }

  handleModalButtonClick() {
    this.setState((preState) => ({
      modalOpen: !preState.modalOpen,
    }));
  }
  handleLogout() {
    this.props.history.push('/login');
  }
  handleInputValue(e) {
    e.preventDefault();
    const { value } = e.target;
    this.setState({
      searchKeyword: value,
    });
  }

  handleSearchData(e) {
    // const { searchKeyword } = this.state;
  }

  render() {
    const { YouTubeData, modalOpen, darkMode, clickVideo } = this.state;

    console.log('Receive Server Data: ', YouTubeData);
    return (
      <div className={darkMode ? 'mainPage dark' : 'mainPage light'}>
        <center>
          <Header
            handleModalButtonClick={this.handleModalButtonClick}
            darkMode={darkMode}
          />
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              className={darkMode ? "SearchtBar darkMode" : "SearchtBar"}
              placeholder="찾고 싶은 영상의 제목이나 단어를 입력하세요"
              onChange={this.handleInputValue}
            ></input>
            <button
              className={darkMode ? "SearchtButton darkMode" : "SearchtButton"}
              onClick={this.handleSearchData}
            >
              검색
            </button>
          </form>

          {clickVideo ? (
            <VideoPlayer clickVideo={clickVideo} darkMode={darkMode} />
          ) : (
            ""
          )}
        </center>
        <div className="videoList">
          {YouTubeData ? (
            <VideoList
              YouTubeData={YouTubeData}
              darkMode={darkMode}
              hadleClickVideoPlayer={this.hadleClickVideoPlayer}
            />
          ) : (
            ""
          )}
        </div>
        <Modal
          modalOpen={modalOpen}
          handleLogout={this.handleLogout}
          modalClose={this.handleModalButtonClick}
          handleDarkMode={this.handleClickDarkMode}
          darkMode={darkMode}
        />
      </div>
    );
  }
}
export default withRouter(MainPage);
