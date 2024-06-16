import { AxiosResponse } from 'axios';
import { Recipe } from '../Models/RecipeModel';

import { FeedsResults } from '../Models/Feeds';
export const processCarouselData = (rawCarouselData: AxiosResponse) => {
  const data: FeedsResults = rawCarouselData.data;

  if (data) {
    const trendingFiltered = data.results.filter(
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
};
