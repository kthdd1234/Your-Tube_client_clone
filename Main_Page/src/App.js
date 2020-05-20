import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LogIn from "./page/LogIn";
import MainPage from "./page/MainPage";
// import LogOut from "./page/LogOut";
// import axios from "axios";

class App extends React.Component {
  state = {
    isLogin: false,
  };
  render() {
    const { isLogin } = this.state;
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/login"
            render={() => <LogIn isLogin={isLogin} />}
          ></Route>

          <Route
            exact
            path="/mainPage"
            render={() => <MainPage isLogin={isLogin} />}
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
