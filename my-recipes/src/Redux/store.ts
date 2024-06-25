import { configureStore } from '@reduxjs/toolkit';
import carouselReducer from './carouselSlice';
import tagsReducer from './tagsSlice';
import listReducer from './listSlice';
import recipeReducer from './recipeSlice';

export const store = configureStore({
  reducer: {
    carouselRecipes: carouselReducer,
    tags: tagsReducer,
    listRecipes: listReducer,
    recipe: recipeReducer,

    // favoriteRecipes: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
