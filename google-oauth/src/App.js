import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import https from 'https';

export class App extends Component {
  responseGoogle = async (response) => {
    console.log(response);
    //const profile = response.profileObj;
    const mychanneldata = await this.getYoutubeData(response.accessToken);
    console.log(mychanneldata);
  };
  getYoutubeData = async (token) => {
    var options = {
      method: 'GET',
      hostname: 'www.googleapis.com',
      port: null,
      path: '/youtube/v3/channels?part=contentDetails&mine=true',
      headers: {
        authorization: `Bearer ${token}`,
        'cache-control': 'no-cache',
      },
    };
    var req = https.request(options, function (res) {
      var chunks = [];
      res.on('data', function (chunk) {
        chunks.push(chunk);
      });
      res.on('end', function () {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
      });
    });
    req.end();
  };

  render() {
    return (
      <div>
        <GoogleLogin
          clientId="396916863595-7g6vt4t2sscr1vbppmt0sr43pst8jjcj.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={'single_host_origin'}
          scope={'https://www.googleapis.com/auth/youtube'}
          accessType={'offline'}
        />
      </div>
    );
  }
}

export default App;
