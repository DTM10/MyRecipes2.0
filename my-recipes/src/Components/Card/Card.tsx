import styles from './Card.module.scss';
import { Recipe } from '../../Models/RecipeModel';
import { trimString } from '../../utils/stringUtils';
import Frame from '../Frame/Frame';

interface Card {
  recipe: Recipe;
  size?: { width: number; height: number };
  maxDescriptionSize?: number;
}

export default function Card({ recipe, size, maxDescriptionSize }: Card) {
  const { id, title, imgURL, description } = { ...recipe };
  const handleCardClick = () => {
    console.log('card clicked with recipe id: ', id);
  };

  const treatedDescription = maxDescriptionSize
    ? trimString(description, maxDescriptionSize)
    : description;
  return (
    <div className={styles.card}>
      <Frame isBorderDark={true}>
        <button
          className={styles.cardBtn}
          onClick={handleCardClick}
          style={size ? { width: size.width, height: size.height } : undefined}
        >
          <div className={styles.cardContainer}>
            <div className={styles.imgContainer}>
              <img src={imgURL} alt="card-img" />
            </div>
            <div className={styles.textContainer}>
              <h3>{title}</h3>
              <p>{treatedDescription}</p>
            </div>
          </div>
        </button>
      </Frame>
    </div>
  );
}

/*
 CREATE LAYOUT CONTRAINTS FOR THE CARD:
 - DESCRIPTION SHOULD HAVE A MAXIMUM SIZE
 - CARD SHOULD HAVE A FIXED SIZE
 - IF THERE IS NO DESCRIPTION, PROVIDE THIS INFO
*/
