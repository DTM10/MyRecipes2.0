import { useEffect } from 'react';
import Carousel from '../../Components/Carousel/Carousel';
import Tag from '../../Components/Tag/Tag';
import styles from './Home.module.scss';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { setCarouselRecipes } from '../../Redux/carouselSlice';
import { setTags } from '../../Redux/tagsSlice';
import { processCarouselData, processTagsData } from '../../utils/processData';
import { useAppSelector, useAppDispatch } from '../../Redux/hooks';

export default function Home() {
  const tags = useAppSelector((state) => state.tags);
  const dispatch = useAppDispatch();

  useEffect(() => {
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
    axios
      .get('https://tasty.p.rapidapi.com/tags/list', { headers })
      .then((res: AxiosResponse) => {
        console.log(res);
        const fetchedTags = processTagsData(res);
        if (fetchedTags) {
          dispatch(setTags(fetchedTags));
        }
      })
      .catch((e: AxiosError) => {
        console.log('Error trying to retrive the tag cards data: ', e);
      });
  }, []);

  return (
    <div className={styles.home}>
      <Carousel />
      <h2>What kind of recipe are you looking for?</h2>
      <div className={styles.tagsContainer}>
        {tags.map((tag) => (
          <Tag {...tag} key={tag.id} />
        ))}
      </div>
    </div>
  );
}
