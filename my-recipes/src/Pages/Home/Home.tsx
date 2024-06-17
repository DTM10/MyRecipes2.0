import { useEffect } from 'react';
import Carousel from '../../Components/Carousel/Carousel';
import styles from './Home.module.scss';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useAppDispatch } from '../../Redux/hooks';
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
      <Carousel />
    </div>
  );
}
