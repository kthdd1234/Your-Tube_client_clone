import React, { Component } from "react";
import Video from "../page/Video";
export default class VideoList extends Component {
  render() {
    return (
      <div
        className={this.props.darkMode ? "video-list darkMode" : "video-list"}
      >
        <h3> (유튜브 아이디)님의 좋아요 동영상 리스트입니다.</h3>
        <div className="media">
          {this.props.YouTubeData.map((video) => (
            <Video
              key={video.id}
              video={video}
              darkMode={this.props.darkMode}
              hadleClickVideoPlayer={this.props.hadleClickVideoPlayer}
            />
          ))}
        </div>
      </div>
    );
  }
}
