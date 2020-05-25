import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

// To allow receiving & sending cookies by a CORS request successfully.
axios.defaults.withCredentials = true;

export default class App extends Component {
  handleAuthSuccess = async (googleResponse) => {
    console.log(googleResponse);
    const {code} = googleResponse;
    // Send request to server with auth_code into body
    axios
      .post('http://localhost:8080/auth', {authCode: code})
      .then((res) => {
        console.log(res);
        return window.location.href('/'); // 리액트 라우터 구현 후, this.props.history.push('/유저페이지')로 변경하세요
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  };
  handleAuthFailure = (googleResponse) => {
    console.log(googleResponse.error); // log error code (https://www.npmjs.com/package/react-google-login#onfailure-callback)
    return window.location.href('/'); // 리액트 라우터 구현 후, this.props.history.push('/요청실패페이지')를 넣어주세요.
  };
  render() {
    return (
      <div>
        <GoogleLogin
          type='button'
          buttonText='Login'
          clientId='378242754412-19sv1la59k4s4krsq3koggliu94lkk84.apps.googleusercontent.com' // your client ID
          onSuccess={this.handleAuthSuccess}
          onFailure={this.handleAuthFailure}
          cookiePolicy={'single_host_origin'}
          scope='https://www.googleapis.com/auth/youtube'
          prompt='consent' // 첫 로그인이 아니더라도 강제로 refresh 토큰을 발행하게 함 - https://github.com/anthonyjgrove/react-google-login/issues/144
          responseType='code' // get auth_code (Default value 'permission' is to get access_token directly)
          accessType='offline' // to get access_token & refresh_token together
          // isSignedIn? // if you needed
        />
      </div>
    );
  }
}
