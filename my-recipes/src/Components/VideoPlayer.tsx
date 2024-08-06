// import React, { useEffect, useRef } from 'react';
// import videojs from 'video.js';
// import Player from 'video.js/dist/types/player';
// import 'video.js/dist/video-js.css';

// interface VideoPlayerProps {
//   src: string;
// }

// const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
//   const videoNode = useRef<HTMLVideoElement | null>(null);
//   const playerRef = useRef<Player | null>(null);

//   useEffect(() => {
//     if (videoNode.current) {
//       const proxyUrl = `http://localhost:3001/api/proxy?url=${src}`;
//       console.log(`Using proxy URL: ${proxyUrl}`);
//       const options: typeof videojs.options = {
//         controls: true,
//         autoplay: false,
//         preload: 'auto',
//         sources: [{ src: proxyUrl, type: 'application/x-mpegURL' }],
//       };

//       playerRef.current = videojs(videoNode.current, options);

//       return () => {
//         if (playerRef.current) {
//           playerRef.current.dispose();
//         }
//       };
//     }
//   }, [src]);

//   return (
//     <div>
//       <div data-vjs-player>
//         <video ref={videoNode} className="video-js" />
//       </div>
//     </div>
//   );
// };

// export default VideoPlayer;

import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import 'video.js/dist/video-js.css';

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  const videoNode = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (videoNode.current) {
      const proxyUrl = `https://cors-anywhere.herokuapp.com/${src}`;
      console.log(`Using proxy URL: ${proxyUrl}`);
      const options: typeof videojs.options = {
        controls: true,
        autoplay: false,
        preload: 'auto',
        sources: [{ src: proxyUrl, type: 'application/x-mpegURL' }],
      };

      playerRef.current = videojs(videoNode.current, options);

      return () => {
        if (playerRef.current) {
          playerRef.current.dispose();
        }
      };
    }
  }, [src]);

  return (
    <div>
      <div data-vjs-player>
        <video ref={videoNode} className="video-js" />
      </div>
    </div>
  );
};

export default VideoPlayer;
