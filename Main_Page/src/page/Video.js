import React, { Component } from 'react';

export default class Video extends Component {
  render() {
    const { title, description, thumbnail, channelId } = this.props.video;
    return (
      <div
        className="video"
        style={{
          marginBottom: '90px',
          marginRight: '400px',
          marginLeft: '400px',
          borderBottom: '2px solid grey',
        }}
      >
        <img className="thumbnail-img" width="200px" src={thumbnail} />
        <h3 className="title">제목: {title}</h3>
        <p className="channelId">채널Id: {channelId}</p>
        <p className="description">설명: {description}</p>
      </div>
    );
  }
}
