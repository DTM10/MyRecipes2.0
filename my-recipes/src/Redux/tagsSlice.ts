import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { TagItem } from '../Models/Tag';

const initialState: TagItem[] = [];

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    setTags: (_, action: PayloadAction<TagItem[]>) => {
      return action.payload;
    },
  },
});

export const { setTags } = tagsSlice.actions;

export const selectTags = (state: RootState) => state.tags;

export default tagsSlice.reducer;
