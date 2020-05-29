import React from "react";
import "./Video.css";

const Video = ({ video, handleVideoPlayer }) => {
  return (
    <div className="contents">
      <img
        className="thumbnail-img"
        width="250px"
        src={video.thumbnail}
        alt="thumbnail"
        onClick={() => handleVideoPlayer(video)}
      />
      <div className="textdata">
        <h4 className="title" onClick={() => handleVideoPlayer(video)}>
          {video.title}
        </h4>
        <div className="description">{video.description}</div>
      </div>
    </div>
  );
};

export default Video;
