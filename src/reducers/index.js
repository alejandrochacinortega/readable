import { combineReducers } from 'redux';
import categories from '../dux/categories';
import posts from '../dux/posts';

const rootReducer = combineReducers({
  categories,
  posts,
});

export default rootReducer;
