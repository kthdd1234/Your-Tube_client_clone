
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import VideoList from "./VideoList";
import Settings from "./Settings";
import Header from "./Header";
import SearchBar from "./SearchBar";
import VideoPlayer from "./VideoPlayer";


axios.defaults.withCredentials = true;

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      keyword: "",
      currentVideo: {},
      isSettingsOpen: false,
      isDarkMode: false,
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4611/resource")
      .then((body) => {
        console.log(body);
        this.props.handleVideosSave(body.data);
        this.setState({ videos: body.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  componentDidUpdate() {
    console.log("componentDidUpdate!");
  }

  handleToggleHeader = () => {
    const { storage } = this.props;
    console.log(storage);
    this.setState({
      videos: storage,
    });
  };

  handleRemoveVideoPlayer = () => {
    this.setState({
      currentVideo: {},
    });
  };

  handleDarkModeToggle = () => {
    this.setState({ isDarkMode: !this.state.isDarkMode });
  };
  handleSettingsToggle = () => {
    this.setState({ isSettingsOpen: !this.state.isSettingsOpen });
  };
  handleKeywordUpdate = (value) => {
    this.setState({ keyword: value }, () => {
      // 키워드가 변경되었습니다. 여기에서 서버로 키워드를 담아 요청을 날리세요.


      console.log('keyword changed');
      axios
        .post('http://localhost:4611/resource/search', {
          keyword: this.state.keyword,
        })
        .then((body) => {
          console.log(body);
          this.setState({videos: body.data});
        })
        .catch((err) => {
          console.log(err);
        });

    });
  };

  render() {
    const { videos, isSettingsOpen, isDarkMode, currentVideo } = this.state;

    return (
      <div>
        <Header
          handleSettingsToggle={this.handleSettingsToggle}
          handleToggleHeader={this.handleToggleHeader}
        />
        <SearchBar handleKeywordUpdate={this.handleKeywordUpdate} />
        {Object.keys(currentVideo).length ? (
          <VideoPlayer
            currentVideo={currentVideo}
            handleRemoveVideoPlayer={this.handleRemoveVideoPlayer}
          />
        ) : (
          ""
        )}
        <div className="videoList">
          {videos.length ? (
            <VideoList
              videos={videos}
              profile={this.props.profile}
              handleVideoPlayer={this.handleVideoPlayer}
            />
          ) : null}
        </div>
        <Settings
          profile={this.props.profile}
          isSettingsOpen={isSettingsOpen}
          isDarkMode={isDarkMode}
          handleLoginToggle={this.props.handleLoginToggle}
          handleSettingsToggle={this.handleSettingsToggle}
          handleDarkModeToggle={this.handleDarkModeToggle}
        />
      </div>
    );
  }
}
export default withRouter(User);
