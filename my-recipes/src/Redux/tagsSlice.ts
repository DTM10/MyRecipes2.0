import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { Tag } from '../Models/Tag';

const initialState: Tag[] = [];

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    setTags: (_, action: PayloadAction<Tag[]>) => {
      return action.payload;
    },
  },
});

export const { setTags } = tagsSlice.actions;

export const selectTags = (state: RootState) => state.tags;

export default tagsSlice.reducer;
