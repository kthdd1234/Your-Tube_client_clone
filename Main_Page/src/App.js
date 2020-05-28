import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Login from './page/Login';
import User from './page/User';

class App extends Component {
  state = {
    isLogin: false,
    profile: {},
  };
  handleLoginToggle = () => {
    this.setState({isLogin: !this.state.isLogin});
  };
  handleProfileUpdate = (data) => {
    this.setState({profile: data});
  };
  render() {
    const {isLogin, profile} = this.state;

    return (
      <div>
        <Switch>
          <Route
            exact
            path='/login'
            render={() => (
              <Login
                handleLoginToggle={this.handleLoginToggle}
                handleProfileUpdate={this.handleProfileUpdate}
              />
            )}></Route>
          <Route
            exact
            path='/user'
            render={() => {
              if (isLogin) {
                return <User handleLoginToggle={this.handleLoginToggle} profile={profile} />;
              }
              return <Redirect to='/login' />;
            }}></Route>
          <Route
            path='/'
            render={() => {
              if (isLogin) {
                return <Redirect to='/user' />;
              }
              return <Redirect to='/login' />;
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
