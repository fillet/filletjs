import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@app/config/Redux';

import { Layout, WindowSize } from './Types';

// #region INITIAL STATE
const initialState: Layout = {
  scrollTop: 0,
  windowSize: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
};
// #endregion

//#region REDUCER
export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    changeScrollTop: (state, action: PayloadAction<number>) => {
      state.scrollTop = action.payload;
    },
    changeWindowSize: (state, action: PayloadAction<WindowSize>) => {
      state.windowSize.width = action.payload.width;
      state.windowSize.height = action.payload.height;
    },
  },
});
//#endregion

//#region ACTIONS
export const { changeScrollTop, changeWindowSize } = layoutSlice.actions;
// #endregion

//#region SELECTORS
const reducer = (state: RootState) => state.layout;
export const selectScrollTop = (state: RootState) => reducer(state).scrollTop;
export const selectWindowSize = (state: RootState) => reducer(state).windowSize;
//#endregion

export default layoutSlice.reducer;
