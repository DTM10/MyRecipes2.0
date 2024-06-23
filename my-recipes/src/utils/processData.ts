import { AxiosResponse } from 'axios';
import { Recipe } from '../Models/RecipeModel';
import { TagsResults } from '../Models/TagsResults';
import { Tag } from '../Models/Tag';
import { FeedsResults } from '../Models/Feeds';
import { ListResults } from '../Models/ListResults';

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

export const processTagsData = (rawTagsData: AxiosResponse) => {
  const data: TagsResults = rawTagsData.data;
  if (data) {
    const filteredTags = data.results.filter(
      (item) =>
        item.type !== 'equipment' ||
        item.type !== 'business_tags' ||
        item.type !== 'feature_page' ||
        item.type !== 'appliance'
    );

    const tempTags = filteredTags.map((tag) => {
      return new Tag(tag.display_name, tag.name, tag.id);
    });

    return tempTags;
  }
};

export const processListData = (rawListData: AxiosResponse): Recipe[] => {
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
      return new Recipe(
        recipe.id,
        recipe.name,
        recipe.thumbnail_url,
        recipe.description,
        ingredients,
        instructions,
        credits,
        recipe.video_url
      );
    });
    return processedRecipes;
  }
  return [];
};
