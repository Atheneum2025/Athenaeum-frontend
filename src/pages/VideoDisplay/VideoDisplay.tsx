import React from 'react'
import ReactPlayer from 'react-player'

// interface VideoDisplayProps {
//     url: string;
// }
const VideoPlayer= () => {
    return (
      <div>
        <div>video player</div>
        <ReactPlayer url='http://res.cloudinary.com/dcfvkgo4a/video/upload/v1736971962/ldpgylqpvfyilppc5t1y.mp4' 
        width="1080px"
        height="720px"
        controls={true}
        />
      </div>
    );
  };

  export default VideoPlayer;
