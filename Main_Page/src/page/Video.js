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
        onClick={function () {
          handleVideoPlayer(video);
        }.bind(this)}
      />
      <div className="textdata">
        <h4
          className="title"
          onClick={function () {
            handleVideoPlayer(video);
          }.bind(this)}
        >
          {video.title}
        </h4>
        <div className="description">{video.description}</div>
      </div>
    </div>
  );
};

export default Video;
