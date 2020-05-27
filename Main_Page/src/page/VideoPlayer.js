import React, { Component } from "react"; //

export default class VideoPlayer extends Component {
  render() {
    const {
      videoId,
      title,
      description,
      thumbnail,
      channelId,
    } = this.props.clickVideo;

    return (
      <div
        className={this.props.darkMdoe ? "VideoPlayer darkMode" : "VideoPlayer"}
      >
        <div className="">
          {/* <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            allowFullScreen
          ></iframe> */}
          <img className="thumbnails" src={thumbnail} alt="thumbnails"></img>
          <h2>제목: {title}</h2>
          <div>채널: {channelId}</div>
          <div>설명: {description}</div>
        </div>
      </div>
    );
  }
}
