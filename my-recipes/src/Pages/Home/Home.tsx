import { useState, useEffect, useMemo } from 'react';
import Frame from '../../Components/Frame/Frame';
import Card from '../../Components/Card/Card';
import { Recipe } from '../../Models/RecipeModel';
import styles from './Home.module.scss';
import axios, { AxiosError, AxiosResponse } from 'axios';

export default function Home() {
  // interface Tag {
  //   displayName: string;
  //   name: string;
  //   id: number;
  // }
  // const [tags, setTags] = useState<Tag[]>([]);
  type FeedsResults = {
    results: {
      category: string;
      items: {
        id: number;
        thumbnail_url: string;
        name: string;
        description: string;
        sections: { components: { raw_text: string }[] }[];
        instructions: { display_text: string }[];
        credits: { name: string }[];
        video_url: string;
      }[];
    }[];
  };
  const [rawCardsData, setRawCardsData] = useState<FeedsResults>();

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
        setRawCardsData(res.data);
      })
      .catch((e: AxiosError) => {
        console.log('Error trying to retrieve the carousel cards data: ', e);
        throw new Error(e.message);
      });
  }, []);

  const cardsData = useMemo(() => {
    if (rawCardsData) {
      const trendingFiltered = rawCardsData.results.filter(
        (item) => item.category === 'Trending'
      );
      const trendingArray = trendingFiltered[0].items;
      const tempData: Recipe[] = trendingArray.map((cardItem) => {
        const ingredients = cardItem.sections[0].components.map(
          (comp) => comp.raw_text
        );
        const instructions = cardItem.instructions.map(
          (instr) => instr.display_text
        );
        const credits = cardItem.credits.map((item) => item.name);
        const recipeInstance = new Recipe(
          cardItem.id,
          cardItem.name,
          cardItem.thumbnail_url,
          cardItem.description,
          ingredients,
          instructions,
          credits,
          cardItem.video_url
        );
        console.log(recipeInstance);
        return recipeInstance;
      });

      return tempData;
    }
  }, [rawCardsData]);

  return (
    <div className={styles.home}>
      {cardsData && (
        <Frame isBorderDark={true}>
          <Card recipe={cardsData[0]} />
        </Frame>
      )}
    </div>
  );
}
