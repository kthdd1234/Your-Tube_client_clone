import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import MainPage from './page/MainPage';
import Oauth from './page/LogIn';
// import axios from "axios";

//폴더를 옮기고 npm start를 했을 때, 1. 구글 로그인 버튼이 있는 화면이 처음에 나옴 2. 구글 로그인을 하면 페이크 데이터가 있는 화면으로 전환.
//더 이상의 node_module은 없다. google-ouath도.
class App extends React.Component {
  state = {
    isLogin: false,
  };
  handleSendPropsToLogin() {
    this.setState({
      isLogin: true,
    });
  }
  render() {
    const { isLogin } = this.state;

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
                return <MainPage isLogin={isLogin} />;
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
