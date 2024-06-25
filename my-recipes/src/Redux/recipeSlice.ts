import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { RecipeItem } from '../Models/RecipeModel';

const initialState: RecipeItem = {
  id: 0,
  title: '',
  imgURL: '',
  description: '',
  instructions: [''],
  credits: [''],
  ingredients: [''],
  videoURL: '',
  liked: false,
};

export const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    setShownRecipe: (_, action: PayloadAction<RecipeItem>) => {
      console.log('recipe to set is: ', action.payload);

      return action.payload;
    },
    resetShownRecipe: () => initialState,
  },
});

export const { setShownRecipe, resetShownRecipe } = recipeSlice.actions;

export const selectRecipe = (state: RootState) => state.recipe;

export default recipeSlice.reducer;
