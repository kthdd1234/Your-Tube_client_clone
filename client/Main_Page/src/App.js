import React from "react"; ///
import { Switch, Route, Redirect } from "react-router-dom";
import LogIn from "./page/LogIn";
import MainPage from "./page/MainPage";
import axios from "axios";
// import axios from "axios";

class App extends React.Component {
  state = {
    isLogin: true,
    YouTubeVideos: null,
  };
  componentDidMount() {
    axios
      .post(
        "http://ec2-54-180-117-42.ap-northeast-2.compute.amazonaws.com:4611/signin",
        {
          name: "Kaido",
        }
      )
      .then((res) => {
        return res.data.token;
      })
      .then((data) => {
        axios
          .get(
            "http://ec2-54-180-117-42.ap-northeast-2.compute.amazonaws.com:4611/list",
            {
              headers: { "x-api-key": data },
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
      });
  }
  render() {
    const { isLogin, YouTubeVideos } = this.state;

    return (
      <div>
        <Switch>
          <Route exact path="/login" render={() => <LogIn />}></Route>

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
