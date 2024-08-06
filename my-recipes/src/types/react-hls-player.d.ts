declare module 'react-hls-player' {
  import React, { MutableRefObject } from 'react';

  interface ReactHlsPlayerProps {
    src: string;
    controls?: boolean; // Include controls in the type definition
    muted?: boolean;
    width?: string | number;
    height?: string | number;
    playerRef?: MutableRefObject<HTMLVideoElement | null>; // Include playerRef for the ref
  }

  const ReactHlsPlayer: React.FC<ReactHlsPlayerProps>;

  export default ReactHlsPlayer;
}
