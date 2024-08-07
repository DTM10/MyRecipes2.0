import styles from './Recipe.module.scss';
import { RecipeItem } from '../../Models/RecipeModel';
import { useState } from 'react';
// import { useAppDispatch } from '../../Redux/hooks';
// import { resetShownRecipe } from '../../Redux/recipeSlice';
import { useAppSelector } from '../../Redux/hooks';
import { FaHeart, FaRegHeart /*FaRegPlayCircle */ } from 'react-icons/fa';
import Frame from '../../Components/Frame/Frame';
// import ReactPlayer from 'react-player';
// import ReactHlsPlayer from 'react-hls-player';
// import videojs from 'video.js';
// import type { VideoJsPlayer } from "@types/video.js";
// import VideoPlayer from '../../Components/VideoPlayer';
import 'video.js/dist/video-js.css';

/* 

  FIND A WAY TO PLAY THE VIDEO WITHOUT HAVING TROUBLE WITH CORS
  
*/

export default function Recipe() {
  // const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const recipe: RecipeItem = useAppSelector((state) => state.recipe);
  const {
    // id,
    title,
    imgURL,
    description,
    instructions,
    credits,
    ingredients,
    // videoURL,
    liked,
  } = recipe;

  const handleToggleLike = () => {
    setIsLiked(!isLiked);
  };

  // const handleToggleIsPlaying = () => {
  //   console.log('handleToggleIsPlaying');
  //   setIsPlaying(!isPlaying);
  // };

  //   const openVideoInNewTab = (url: string) => {
  //     window.open(url, '_blank', 'noopener, noreferrer');
  //   };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  if (!recipe.title) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.recipe}>
      <Frame isBorderDark={true}>
        <div className={styles.recipeContainer}>
          <div className={styles.recipeHeaderContainer}>
            <div className={styles.titleContainer}>
              <h2>{title}</h2>
              <div className={styles.btnsContainer}>
                {/* <button onClick={handleToggleIsPlaying}>
                  <FaRegPlayCircle />
                </button> */}
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
              {/* {isPlaying && videoURL ? (
                // <video src={videoURL} autoPlay />
                <VideoPlayer src={videoURL} />
              ) : (
                <img src={imgURL} alt={`${title} image`} />
              )} */}
              <img src={imgURL} alt={`${title} image`} />
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
