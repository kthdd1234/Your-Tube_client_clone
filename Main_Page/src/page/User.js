import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import VideoList from './VideoList';
import Settings from './Settings';
import Header from './Header';
import SearchBar from './SearchBar';
// import VideoPlayer from './VideoPlayer';
axios.defaults.withCredentials = true;

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
        this.setState({videos: body.data});
      })
      .catch((err) => {
        console.log(err);
      });
  }
  componentDidUpdate() {
    console.log('componentDidUpdate!');
  }
  handleDarkModeToggle = () => {
    this.setState({isDarkMode: !this.state.isDarkMode});
  };
  handleSettingsToggle = () => {
    this.setState({isSettingsOpen: !this.state.isSettingsOpen});
  };
  handleKeywordUpdate = (value) => {
    this.setState({keyword: value}, () => {
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
    const {videos, isSettingsOpen, isDarkMode} = this.state;

    return (
      <div>
        <Header handleSettingsToggle={this.handleSettingsToggle} />
        <SearchBar handleKeywordUpdate={this.handleKeywordUpdate} />
        <div className='videoList'>
          {videos.length ? <VideoList videos={videos} profile={this.props.profile} /> : null}
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
