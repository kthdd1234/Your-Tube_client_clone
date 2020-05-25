import React, { Component } from "react";
import Video from "../page/Video";
export default class VideoList extends Component {
  render() {
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
