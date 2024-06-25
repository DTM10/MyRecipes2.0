import styles from './Recipe.module.scss';
import { RecipeItem } from '../../Models/RecipeModel';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../Redux/hooks';
import { resetShownRecipe } from '../../Redux/recipeSlice';
import { useAppSelector } from '../../Redux/hooks';
import { FaHeart, FaRegHeart, FaRegPlayCircle } from 'react-icons/fa';
import Frame from '../../Components/Frame/Frame';
import ReactPlayer from 'react-player';

export default function Recipe() {
  const [isPlaying, setIsPlaying] = useState(false);
  const recipe: RecipeItem = useAppSelector((state) => state.recipe);
  const {
    // id,
    title,
    imgURL,
    description,
    instructions,
    credits,
    ingredients,
    videoURL,
    liked,
  } = recipe;
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('Recipe useEffect');

    return () => {
      console.log('Recipe useEffect cleanup');
      dispatch(resetShownRecipe());
    };
  }, [dispatch]);

  const handleToggleIsPlaying = () => {
    console.log('handleToggleIsPlaying');
    setIsPlaying(!isPlaying);
  };

  const handleToggleLike = () => {
    console.log('handleToggleLike');
  };

  return (
    <div className={styles.recipe}>
      <Frame isBorderDark={true}>
        <div className={styles.recipeContainer}>
          <div className={styles.recipeHeaderContainer}>
            <div className={styles.titleContainer}>
              <h2>{title}</h2>
              <div className={styles.btnsContainer}>
                <button onClick={handleToggleIsPlaying}>
                  <FaRegPlayCircle />
                </button>
                <button className={styles.like} onClick={handleToggleLike}>
                  {liked ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>
            </div>
            <p className={styles.credits}>
              {credits.length > 0
                ? `Credits: ${credits.join(', ')}`
                : 'Credits not available'}
            </p>
          </div>
          <div className={styles.group1}>
            <div className={styles.mediaContainer}>
              {isPlaying ? (
                <ReactPlayer
                  url={videoURL}
                  playing={isPlaying}
                  controls
                  muted
                  loop
                  width="100%"
                  height="100%"
                />
              ) : (
                <img src={imgURL} alt={`${title} image`} />
              )}
            </div>
            <h3>Description</h3>
            <p>{description}</p>
          </div>
          <div className={styles.group2}>
            <h3>Ingredients</h3>
            <ul>
              {ingredients.map((item, index) => (
                <li key={`ingredient${index}`}>{item}</li>
              ))}
            </ul>
            <h3>Instructions</h3>
            <ol>
              {instructions.map((item, index) => (
                <li key={`instruction${index}`}>{item}</li>
              ))}
            </ol>
          </div>
        </div>
      </Frame>
    </div>
  );
}
