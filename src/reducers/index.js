import { combineReducers } from 'redux';
import categories from '../dux/categories';
import posts from '../dux/posts';
import comments from '../dux/comments';

const rootReducer = combineReducers({
  categories,
  posts,
  comments,
});

export default rootReducer;
