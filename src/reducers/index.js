import { combineReducers } from 'redux';
import categoriesReducer from './categories_reducer';
import postsReducer from './posts_reducer';

const rootReducer = combineReducers({
  categories: categoriesReducer,
  posts: postsReducer,
});

export default rootReducer;
