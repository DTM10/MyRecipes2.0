import { Tag as TagModel } from '../../Models/Tag';
import Frame from '../Frame/Frame';
import styles from './Tag.module.scss';

export default function Tag({ name, displayName, id }: TagModel) {
  const handleTagClick = () => {
    console.log('handleTagClick called with name: ', name);
  };
  return (
    <Frame isHoverable={true}>
      <button className={styles.tag} onClick={handleTagClick}>
        {displayName}
      </button>
    </Frame>
  );
}
