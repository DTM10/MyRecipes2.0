import styles from './Corousel.module.scss';
import { useAppSelector } from '../../Redux/hooks';
import { useState, useRef, useEffect, useCallback } from 'react';

import Card from '../Card/Card';

export default function Carousel() {
  const carouselCards = useAppSelector((state) => state.carouselRecipes);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const timeoutRef = useRef<null | number>(null);

  const nextCard = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex < carouselCards.length - 1 ? prevIndex + 1 : 0;
      return newIndex;
    });
  }, [carouselCards]);

  useEffect(() => {
    const clearCurrentTimeout = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    timeoutRef.current = setTimeout(() => {
      clearCurrentTimeout();
      nextCard();
    }, 3000);
    return clearCurrentTimeout;
  }, [currentIndex, nextCard]);

  return (
    <div className={styles.carousel}>
      <Card recipe={carouselCards[currentIndex]} maxDescriptionSize={200} />
      <div className={styles.navController}>
        <div className={styles.navBtnsContainer}>
          {carouselCards.map((_, index) => (
            <button
              key={index}
              className={currentIndex === index ? styles.active : undefined}
              onClick={() => {
                if (timeoutRef.current) {
                  clearTimeout(timeoutRef.current);
                }
                setCurrentIndex(index);
              }}
            >
              &#9679;
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
