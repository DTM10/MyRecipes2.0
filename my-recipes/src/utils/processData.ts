import { AxiosResponse } from 'axios';
import { RecipeItem } from '../Models/RecipeModel';
import { TagsResults } from '../Models/TagsResults';
import { TagItem } from '../Models/Tag';
import { FeedsResults } from '../Models/Feeds';
import { ListResults, ResultObj, QueryResults } from '../Models/ListResults';

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
  console.log('data is: ', data);

  if (data) {
    const processedRecipes = data.results
      .filter((recipe) => {
        // Check if the required properties are present and valid
        return (
          recipe.sections &&
          recipe.sections.length > 0 &&
          recipe.sections[0].components &&
          recipe.sections[0].components.length > 0 &&
          recipe.instructions &&
          recipe.instructions.length > 0 &&
          recipe.credits &&
          recipe.credits.length > 0
        );
      })
      .map((recipe) => {
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

// It is just called if we have outer recipes
const getRecipeData = (recipe: ResultObj) => {
  const credits: string[] = [];
  const ingredients: string[] = [];
  const instructions: string[] = [];
  if (recipe.credits) {
    recipe.credits.forEach((author) => {
      credits.push(author.name);
    });
  }
  if (recipe.sections) {
    recipe.sections.forEach((section) => {
      if (section.components) {
        section.components.forEach((component) => {
          ingredients.push(component.raw_text);
        });
      }
    });
  }
  const title = recipe.name;
  const imgURL = recipe.thumbnail_url;
  const description = recipe.description;
  if (recipe.instructions) {
    recipe.instructions.forEach((instruction) => {
      instructions.push(instruction.display_text);
    });
  }
  return {
    id: recipe.id,
    title: title,
    imgURL: imgURL,
    description: description,
    ingredients: ingredients,
    instructions: instructions,
    credits: credits,
    videoURL: recipe.video_url,
  };
};

// It is just called if we have inner recipes
const getInnerRecipes = (resultObj: ResultObj) => {
  const processedInnerRecipes = [];
  const recipes = resultObj.recipes;
  if (recipes) {
    for (const recipe of recipes) {
      processedInnerRecipes.push(getRecipeData(recipe));
    }
  }
  return processedInnerRecipes;
};

export const processQueryData = (rawQueryData: AxiosResponse): RecipeItem[] => {
  const data: QueryResults = rawQueryData.data;
  if (data) {
    console.log('data is: ', data);
    const processedRecipes = [];
    for (const recipe of data.results) {
      if (recipe.type === 'item') {
        // Check if it is a list of recipes
        if (recipe.item.recipes) {
          const innerRecipes = getInnerRecipes(recipe.item); // Passing a resultObj
          processedRecipes.push(...innerRecipes);
        } else {
          processedRecipes.push(getRecipeData(recipe.item));
        }
      }
    }
    console.log('processed recipes are: ', processedRecipes);

    return processedRecipes;
  } else {
    return [];
  }
};
