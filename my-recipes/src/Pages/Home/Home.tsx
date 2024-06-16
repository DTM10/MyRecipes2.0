import { useEffect } from 'react';
// import Frame from '../../Components/Frame/Frame';
// import Card from '../../Components/Card/Card';
import Carousel from '../../Components/Carousel/Carousel';
import styles from './Home.module.scss';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useAppSelector, useAppDispatch } from '../../Redux/hooks';
import { setCarouselRecipes } from '../../Redux/carouselSlice';
import { processCarouselData } from '../../utils/processData';

export default function Home() {
  const dispatch = useAppDispatch();
  // interface Tag {
  //   displayName: string;
  //   name: string;
  //   id: number;
  // }
  // const [tags, setTags] = useState<Tag[]>([]);

  // const carouselCards = useAppSelector((state) => state.carouselRecipes);

  useEffect(() => {
    console.log('useEffect');
    const params = {
      from: 0,
      size: 50,
      timezone: '-0400',
      vegeterian: false,
    };
    const headers = {
      'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY,
      'x-rapidapi-host': 'tasty.p.rapidapi.com',
    };
    axios
      .get('https://tasty.p.rapidapi.com/feeds/list', { params, headers })
      .then((res: AxiosResponse) => {
        const carouselRecipes = processCarouselData(res);
        if (carouselRecipes) {
          dispatch(setCarouselRecipes(carouselRecipes));
        }
      })
      .catch((e: AxiosError) => {
        console.log('Error trying to retrieve the carousel cards data: ', e);
        throw new Error(e.message);
      });
  }, []);

  return (
    <div className={styles.home}>
      {/* {carouselCards && (
        <Frame isBorderDark={true}>
          <Card recipe={carouselCards[0]} />
        </Frame>
      )} */}
      <Carousel />
    </div>
  );
}
