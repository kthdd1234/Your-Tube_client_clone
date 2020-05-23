import React, {Component} from 'react';
import GoogleLogin from 'react-google-login';
import https from 'https';

// console.log 많아서 줄임
const log = console.log;

export default class App extends Component {
  // [READ.md]
  /*
    ## 서버가 할 일 ##

    - 이번은 테스트용이므로 앞으로 responseGoogle, getMyChannelData 함수에 있는
      로직 및 모델 연동은 서버로 이전할 계획입니다.

    - 여기서 필요한 개인의 유튜브 채널 데이터를 얻었으므로,
      playListItems API를 통해 like 동영상들을 불러오는 컨트롤러를 추가할 계획입니다.

    ## 클라이언트가 할 일 ##
    
    - client ID는 각자 것을 넣으면 됩니다.
      프로젝트 커밋 전에는 dotenv를 활용하여 외부로 노출되지 않게 하시고,
      혹시 recast.ly때 썻던 API key가 있다면 삭제하는게 에러 가능성면에서 좋을 것 같습니다.

    - 서버로 로직이 이전되면, responseGoogle의 인자 response 객체의
      { error, accessToken, profileObj } 프로퍼티 값을
      서버에서 제공할 라우트 주소로 POST 요청하면 될 것 같습니다.

    - 추가로, 리다이렉션 부분은 로그인이 되었을 때 나타나는 컴포넌트로 라우팅하면 될 것 같습니다.
      먼저 리액트 라우터를 구현하고, <GoogleLogin> 컴포넌트의 redirectUrl?(혹은 render?) 속성을 통해
      리다이렉션 구현이 가능해보입니다. (물론 눈으로만 보고 하는 말입니다.)

    - 상태(state)를 주어 로그인-로그아웃 토글도 가능해 보입니다.
      아니면 react-google-login을 참고하면 <GoogleLogout> 컴포넌트도 구현할 수 있습니다.

    - refresh 토큰 발행도 모듈을 살펴보면 가능해 보입니다. 이 부분은 서버쪽에서도 함께 살펴보겠습니다. 

    ## 빅맘과 흰수염이 참고한 것들 ##
    - react-google-login ( https://www.npmjs.com/package/react-google-login )
    - https ( https://nodejs.org/api/https.html ) 
    - how to promisify https ( https://stackoverflow.com/questions/38533580/nodejs-how-to-promisify-http-request-reject-got-called-two-times )
  */
  responseGoogle = async ({error, accessToken, profileObj}) => {
    if (error) {
      log(error);
      return;
    }
    log('profile: ', profileObj);
    const myChannelData = await this.getMyChannelData(accessToken);
    log('myChannelData: ', myChannelData);
    if (myChannelData.items) {
      // 'items' property exists ? request resolved : request rejected
      const {id, contentDetails} = myChannelData.items[0];
      const channelId = id;
      const likePlaylistId = contentDetails.relatedPlaylists.likes;
      log('channelId: ', channelId);
      log('likePlaylistId: ', likePlaylistId);
    }
  };
  getMyChannelData = (token) => {
    const httpsOptions = {
      method: 'GET',
      hostname: 'www.googleapis.com',
      port: 443, // default가 443이므로 port 생략 가능
      path: '/youtube/v3/channels?part=contentDetails&mine=true',
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    // converted https request to Promise to handle errors
    return new Promise((resolve, reject) => {
      const req = https.request(httpsOptions, function (res) {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          return reject(res.statusCode);
        }
        let body = [];
        res
          .on('data', function (chunk) {
            body.push(chunk);
          })
          .on('end', function () {
            body = JSON.parse(Buffer.concat(body).toString());
            resolve(body);
          });
        // reject on request error
        req.on('error', function (err) {
          reject(err);
        });
      });
      req.end();
    });
  };

  render() {
    return (
      <div>
        <GoogleLogin
          type='button'
          buttonText='Login'
          clientId='' // your client ID
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={'single_host_origin'}
          scope='https://www.googleapis.com/auth/youtube'
          accessType='offline'
        />
      </div>
    );
  }
}
