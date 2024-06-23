import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { Recipe } from '../Models/RecipeModel';

interface ListObj {
  listTag: string;
  listTitle: string;
  list: Recipe[];
}

const initialState: ListObj = {
  listTag: '',
  listTitle: '',
  list: [],
};

export const listSlice = createSlice({
  name: 'listRecipes',
  initialState,
  reducers: {
    setListRecipes: (_, action: PayloadAction<ListObj>) => {
      return {
        listTag: action.payload.listTag,
        listTitle: action.payload.listTitle,
        list: action.payload.list,
      };
    },
  },
});

export const { setListRecipes } = listSlice.actions;

export const selectList = (state: RootState) => state.listRecipes;

export default listSlice.reducer;
