import styles from './Corousel.module.scss';
import { useAppSelector } from '../../Redux/hooks';
import { useMemo, useState, useRef } from 'react';
import Frame from '../Frame/Frame';
import Card from '../Card/Card';

export default function Carousel() {
  const carouselCards = useAppSelector((state) => state.carouselRecipes);
  const [currentIndex, setCurrentIndex] = useState(0);

  const timeoutRef = useRef<null | number>(null);
  const nextCard = () => {
    const newIndex =
      currentIndex < carouselCards.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
  };

  const _ = useMemo(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      nextCard();
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, 3000);
  }, [currentIndex]);

  return (
    <div className={styles.carousel}>
      <Frame isBorderDark={true}>
        <Card recipe={carouselCards[currentIndex]} />
      </Frame>
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
