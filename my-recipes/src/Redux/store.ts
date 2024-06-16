import { configureStore } from '@reduxjs/toolkit';
import carouselReducer from './carouselSlice';

export const store = configureStore({
  reducer: {
    carouselRecipes: carouselReducer,
    // favoriteRecipes: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
