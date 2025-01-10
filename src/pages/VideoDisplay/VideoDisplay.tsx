import React from 'react'
import ReactPlayer from 'react-player'

interface VideoDisplayProps {
    url: string;
}
const VideoPlayer: React.FC<VideoDisplayProps> = ({ url }) => {
    return (
      <div>
        <ReactPlayer url={url} controls={true} />
      </div>
    );
  };

  export default VideoPlayer;
