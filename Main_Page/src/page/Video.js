import React from 'react';
import './Video.css';

const Video = ({ video }) => {
  return (
    <div className="contents">
      <img
        className="thumbnail-img"
        width="250px"
        src={video.thumbnail}
        alt="thumbnail"
      />
      <div className="textdata">
        <h4 className="title">{video.title}</h4>
        <div className="description">{video.description}</div>
      </div>
    </div>
  );
};

export default Video;
