import React from 'react';
import './Video.css';

const Video = ({video}) => {
  return (
    <li className='contents'>
      <img className='thumbnail-img' width='250px' src={video.thumbnail} alt='thumbnail' />
      <div className='textdata'>
        <h4 className='title'>제목: {video.title}</h4>
        <div className='channelId'>채널: {video.channelId}</div>
        <div className='description'>설명: {video.description}</div>
      </div>
    </li>
  );
};

export default Video;
