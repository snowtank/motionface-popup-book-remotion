import {Composition} from 'remotion';
import {PopUpBook} from './PopUpBook';

// Measured from the source: 38.2 seconds, 30 fps, full HD.
export const VIDEO_CONFIG = {
  width: 1920,
  height: 1080,
  fps: 30,
  durationInFrames: 1146,
} as const;

export const RemotionRoot = () => (
  <Composition
    id="PopUpBook"
    component={PopUpBook}
    {...VIDEO_CONFIG}
  />
);
