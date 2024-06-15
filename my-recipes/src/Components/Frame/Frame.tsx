import { ReactNode } from 'react';
import styles from './Frame.module.scss';

interface FrameProps {
  children: ReactNode;
  isBorderDark?: boolean;
  isHoverable?: boolean;
}
export default function Frame({
  children,
  isHoverable,
  isBorderDark,
}: FrameProps) {
  let componentStyle = styles.frame;
  if (isHoverable) {
    componentStyle = `${styles.frame} ${styles.hoverableFrame}`;
  }
  if (isBorderDark) {
    componentStyle = `${styles.frame} ${styles.darkFrame}`;
  }

  return <div className={componentStyle}>{children}</div>;
}
