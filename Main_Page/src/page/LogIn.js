import React from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import './Login.css';
import s4 from './s4.gif';
// To allow receiving & sending cookies by a CORS request successfully.
axios.defaults.withCredentials = true;

class Oauth extends React.Component {
  constructor(props) {
    super(props);
  }

  handleAuthSuccess(googleResponse) {
    console.log(googleResponse);
    const { code } = googleResponse;
    // Send request to server with auth_code into body
    // axios
    //   .post("http://localhost:3000/auth", { authCode: code })
    //   .then((res) => {
    //     console.log(res);
    //     this.props.handleSendPropsToLogin();
    //     //return window.location.href('/'); // 리액트 라우터 구현 후, this.props.history.push('/유저페이지')로 변경하세요
    //     //맨날 브랜치 만드는거 까먹음. 귀찮음.
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     return;
    //   });
    this.props.handleSendPropsToLogin();
    this.props.history.push('/mainPage');
  }
  handleAuthFailure = (googleResponse) => {
    console.log(googleResponse.error); // log error code (https://www.npmjs.com/package/react-google-login#onfailure-callback)
    return window.location.href('/'); // 리액트 라우터 구현 후, this.props.history.push('/요청실패페이지')를 넣어주세요.
  };
  render() {
    return (
      <div className="container">
        <div className="left-sector">
          <img src={s4} className="s4" />
        </div>
        <div className="right-sector">
          <GoogleLogin
            className="button"
            type="button"
            buttonText="Sign in with Google"
            clientId="378242754412-19sv1la59k4s4krsq3koggliu94lkk84.apps.googleusercontent.com" //client ID는 config.js라는 폴더 안의 동명의 파일 안에 있음.
            onSuccess={this.handleAuthSuccess.bind(this)}
            onFailure={this.handleAuthFailure}
            cookiePolicy={'single_host_origin'}
            scope="https://www.googleapis.com/auth/youtube"
            prompt="consent" // 첫 로그인이 아니더라도 강제로 refresh 토큰을 발행하게 함 - https://github.com/anthonyjgrove/react-google-login/issues/144
            responseType="code" // get auth_code (Default value 'permission' is to get access_token directly)
            accessType="offline" // to get access_token & refresh_token together
            // isSignedIn? // if you needed
          />
          <p className="comment">This is YourTube.</p>
          <p className="comment2">What did you Like recently?</p>
        </div>
      </div>
    );
  }
}

export default withRouter(Oauth);
