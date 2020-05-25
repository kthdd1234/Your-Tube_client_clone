import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import MainPage from './page/MainPage';
import axios from 'axios';
import Oauth from './page/LogIn';
// import axios from "axios";

//폴더를 옮기고 npm start를 했을 때, 1. 구글 로그인 버튼이 있는 화면이 처음에 나옴 2. 구글 로그인을 하면 페이크 데이터가 있는 화면으로 전환.

class App extends React.Component {
  state = {
    isLogin: false,
    YouTubeVideos: null,
  };
  handleSendPropsToLogin() {
    this.setState({
      isLogin: true,
    });
  }
  componentDidMount() {
    /*axios
      .post(
        'http://ec2-3-34-48-225.ap-northeast-2.compute.amazonaws.com:4611/signin',
        {
          name: 'Kaido',
        }
      )
      .then((res) => {
        return res.data.token;
      })
      .then((data) => {
        axios
          .get(
            'http://ec2-3-34-48-225.ap-northeast-2.compute.amazonaws.com:4611/list',
            {
              headers: { 'x-api-key': data },
            }
          )
          .then((res) => {
            console.log(res.data);
            let YouTubeVideos = [];
            for (let video of res.data) {
              const { id, title, description, channelId, thumbnail } = video;
              const userData = {
                id: id,
                thumbnail: thumbnail,
                title: title,
                description: description,
                channelId: channelId,
              };
              YouTubeVideos.push(userData);
            }

            this.setState({
              YouTubeVideos: YouTubeVideos,
            });
          });
      });*/
  }
  render() {
    const { isLogin, YouTubeVideos } = this.state;

    return (
      <div>
        <Switch>
          <Route
            exact
            path="/login"
            render={() => (
              <Oauth
                handleSendPropsToLogin={this.handleSendPropsToLogin.bind(this)}
              />
            )}
          ></Route>
          <Route
            exact
            path="/mainPage"
            render={() => {
              if (isLogin) {
                return (
                  <MainPage isLogin={isLogin} YouTubeVideos={YouTubeVideos} />
                );
              }
              return <Redirect to="/login" />;
            }}
          ></Route>
          <Route
            path="/"
            render={() => {
              if (isLogin) {
                return <Redirect to="/mainPage" />;
              }
              return <Redirect to="/login" />;
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
