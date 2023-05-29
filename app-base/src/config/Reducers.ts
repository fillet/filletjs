import { combineReducers } from 'redux';

import { layoutSlice } from '@app/features/layout';

const createRootReducer = () => combineReducers({
  layout: layoutSlice.reducer,
});

export default createRootReducer;