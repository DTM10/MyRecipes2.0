import { configureStore } from '@reduxjs/toolkit';
import carouselReducer from './carouselSlice';
import tagsReducer from './tagsSlice';

export const store = configureStore({
  reducer: {
    carouselRecipes: carouselReducer,
    tags: tagsReducer,
    // favoriteRecipes: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
