import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

const initialState: {
  searchParam: string;
  //   searchResults: {};
  isSearching: boolean;
} = { searchParam: '', isSearching: false };

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchParam: (state, action: PayloadAction<string>) => {
      return { ...state, searchParam: action.payload };
    },

    setIsSeaching: (state, action: PayloadAction<boolean>) => {
      return { ...state, isSeaching: action.payload };
    },
  },
});

export const { setSearchParam, setIsSeaching } = searchSlice.actions;
export const selectSearch = (state: RootState) => state.search;
export default searchSlice.reducer;
