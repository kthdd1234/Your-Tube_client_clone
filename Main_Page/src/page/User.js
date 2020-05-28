import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import VideoList from './VideoList';
import Settings from './Settings';
import Header from './Header';
import SearchBar from './SearchBar';
// import VideoPlayer from './VideoPlayer';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      keyword: '',
      currentVideo: {},
      isSettingsOpen: false,
      isDarkMode: false,
    };
  }
  componentDidMount() {
    axios
      .get('http://localhost:4611/resource')
      .then((body) => {
        console.log(body);
        this.setState({ videos: body.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  componentDidUpdate() {
    console.log('componentDidUpdate!');
  }
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
    });
  };

  render() {
    const { videos, isSettingsOpen, isDarkMode } = this.state;

    return (
      <div>
        <Header handleSettingsToggle={this.handleSettingsToggle} />
        <SearchBar handleKeywordUpdate={this.handleKeywordUpdate} />
        <div className="videoList">
          {videos.length ? (
            <VideoList videos={videos} profile={this.props.profile} />
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

// this.handleInputValue = this.handleInputValue.bind(this);
// this.handleSearchData = this.handleSearchData.bind(this);
// this.handleLogout = this.handleLogout.bind(this);
// this.handleModalButtonClick = this.handleModalButtonClick.bind(this);
// this.handleClickDarkMode = this.handleClickDarkMode.bind(this);
// this.hadleClickVideoPlayer = this.hadleClickVideoPlayer.bind(this);
// this.handleRemoveVideo = this.handleRemoveVideo.bind(this);

// handleClickDarkMode() {
//   this.setState((preState) => ({
//     darkMode: !preState.darkMode,
//   }));
// }

// hadleClickVideoPlayer(video) {
//   this.setState({
//     clickVideo: video,
//   });
// }

// handleRemoveVideo() {
//   this.setState({
//     clickVideo: null,
//   });
// }

// handleModalButtonClick() {
//   this.setState((preState) => ({
//     modalOpen: !preState.modalOpen,
//   }));
// }
// handleLogout() {
//   this.props.history.push('/login');
// }
// handleInputValue(e) {
//   e.preventDefault();
//   const {value} = e.target;
//   this.setState({
//     searchKeyword: value,
//   });
// }

// handleSearchData() {
//   const {searchKeyword} = this.state;

//   axios
//     .get(`http://110.14.118.28:9200/rdbms_sync_idx/_search?q=${searchKeyword}`)
//     .then((data) => {
//       console.log(data);
//     });
// }
