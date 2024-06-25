import { AxiosResponse } from 'axios';
import { RecipeItem } from '../Models/RecipeModel';
import { TagsResults } from '../Models/TagsResults';
import { TagItem } from '../Models/Tag';
import { FeedsResults } from '../Models/Feeds';
import { ListResults } from '../Models/ListResults';

export const processCarouselData = (rawCarouselData: AxiosResponse) => {
  const data: FeedsResults = rawCarouselData.data;

  if (data) {
    const trendingFiltered = data.results.filter(
      (item) => item.category === 'Trending'
    );
    const trendingArray = trendingFiltered[0].items;
    const tempData: RecipeItem[] = trendingArray.map((cardItem) => {
      const ingredients = cardItem.sections[0].components.map(
        (comp) => comp.raw_text
      );
      const instructions = cardItem.instructions.map(
        (instr) => instr.display_text
      );
      const credits = cardItem.credits.map((item) => item.name);
      const recipe: RecipeItem = {
        id: cardItem.id,
        title: cardItem.name,
        imgURL: cardItem.thumbnail_url,
        description: cardItem.description,
        ingredients: ingredients,
        instructions: instructions,
        credits: credits,
        videoURL: cardItem.video_url,
      };

      console.log(recipe);
      return recipe;
    });

    return tempData;
  }
};

export const processTagsData = (rawTagsData: AxiosResponse) => {
  const data: TagsResults = rawTagsData.data;
  if (data) {
    const filteredTags = data.results.filter(
      (item) =>
        item.type !== 'equipment' &&
        item.type !== 'business_tags' &&
        item.type !== 'feature_page' &&
        item.type !== 'appliance'
    );

    const tempTags = filteredTags.map((tag) => {
      const tempTag: TagItem = {
        displayName: tag.display_name,
        name: tag.name,
        id: tag.id,
      };
      return tempTag;
    });

    return tempTags;
  }
};

export const processListData = (rawListData: AxiosResponse): RecipeItem[] => {
  const data: ListResults = rawListData.data;

  if (data) {
    const processedRecipes = data.results.map((recipe) => {
      const ingredients = recipe.sections[0].components.map(
        (ingredient) => ingredient.raw_text
      );
      const instructions = recipe.instructions.map(
        (instruction) => instruction.display_text
      );
      const credits = recipe.credits.map((author) => author.name);
      return {
        id: recipe.id,
        title: recipe.name,
        imgURL: recipe.thumbnail_url,
        description: recipe.description,
        ingredients: ingredients,
        instructions: instructions,
        credits: credits,
        videoURL: recipe.video_url,
      };
    });
    return processedRecipes;
  }
  return [];
};
