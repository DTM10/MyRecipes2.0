import styles from './Card.module.scss';
import { Recipe } from '../../Models/RecipeModel';

interface Card {
  recipe: Recipe;
}

export default function Card({ recipe }: Card) {
  const { id, title, imgURL, description } = { ...recipe };
  const handleCardClick = () => {
    console.log('card clicked with recipe id: ', id);
  };
  return (
    <button className={styles.card} onClick={handleCardClick}>
      <div className={styles.cardContainer}>
        <div className={styles.imgContainer}>
          <img src={imgURL} alt="card-img" />
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </button>
  );
}
