import { combineReducers } from 'redux';
import categoriesReducer from './categories_reducer';

const rootReducer = combineReducers({
  categories: categoriesReducer,
  posts: () => [],
});

export default rootReducer;
