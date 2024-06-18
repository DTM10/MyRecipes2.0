import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { Recipe } from '../Models/RecipeModel';

const initialState: Recipe[] = [];

export const carouselSlice = createSlice({
  name: 'carouselRecipes',
  initialState,
  reducers: {
    setCarouselRecipes: (_, action: PayloadAction<Recipe[]>) => {
      return action.payload;
    },
  },
});

export const { setCarouselRecipes } = carouselSlice.actions;

export const selectCarousel = (state: RootState) => state.carouselRecipes;

export default carouselSlice.reducer;
