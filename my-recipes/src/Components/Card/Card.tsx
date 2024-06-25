import styles from './Card.module.scss';
import { RecipeItem } from '../../Models/RecipeModel';
import { trimString } from '../../utils/stringUtils';
import Frame from '../Frame/Frame';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { BORDER_VALUES } from '../../Models/Enums';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../Redux/hooks';
import { setShownRecipe } from '../../Redux/recipeSlice';

interface CardType {
  recipe: RecipeItem;
  size?: { width: number; height: number };
  maxDescriptionSize?: number;
  isListCard: boolean;
  isLiked?: boolean;
  border: BORDER_VALUES;
}

export default function Card({
  recipe,
  size,
  maxDescriptionSize,
  isListCard,
  isLiked,
  border,
}: CardType) {
  const { id, title, imgURL, description } = { ...recipe };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCardClick = () => {
    console.log('card clicked with recipe id: ', id, 'and name: ', title);
    dispatch(setShownRecipe(recipe));
    navigate('/recipe');
    // Pass the Recipe here
  };

  const treatedDescription = maxDescriptionSize
    ? trimString(description, maxDescriptionSize)
    : description;

  return (
    <div className={styles.card}>
      <Frame
        isBorderDark={border === BORDER_VALUES.DARK}
        isHoverable={border === BORDER_VALUES.HOVERABLE}
      >
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
              <div className={styles.cardTitleContainer}>
                <h3>{title}</h3>
                {isListCard && <>{isLiked ? <FaHeart /> : <FaRegHeart />}</>}
              </div>
              <p>{treatedDescription}</p>
            </div>
          </div>
        </button>
      </Frame>
    </div>
  );
}
