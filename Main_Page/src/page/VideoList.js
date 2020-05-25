import React, { Component } from 'react';
import Video from '../page/Video';
export default class VideoList extends Component {
  render() {
    if (this.props.YouTubeData.length === 0) {
      return (
        <div
          style={{
            marginTop: '150px',
            marginRight: '400px',
            marginLeft: '400px',
          }}
        >
          검색내용 결과 없음
        </div>
      );
    }
    return (
      <div className="video-list-media">
        {this.props.YouTubeData.map((video) => (
          <Video key={video.id} video={video} />
        ))}
      </div>
    );
  }
}

// import React from "react";
// import Video from "../page/Video";
// const VideoList = (props) => {
//   <div className="video-list media">
//     {props.fakeData.map((video) => {
//       <Video video={video} />;
//     })}
//   </div>;
// };
// export default VideoList;
