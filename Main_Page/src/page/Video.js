import React, { Component } from "react";

export default class Video extends Component {
  render() {
    const { title, description, thumbnail, channelId } = this.props.video;
    return (
      <div className={this.props.darkMode ? "video darkMode" : "video"}>
        <img
          className="thumbnail-img"
          width="200px"
          src={thumbnail}
          alt="thumbnail"
          onClick={function () {
            this.props.hadleClickVideoPlayer(this.props.video);
          }.bind(this)}
        />
        <h4 className="title">제목: {title}</h4>
        <div className="channelId">채널: {channelId}</div>
        {/* <div className="description">설명: {description}</div> */}
      </div>
    );
  }
}
