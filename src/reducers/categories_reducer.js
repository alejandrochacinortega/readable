import {
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORY_SUCCESS,
  GET_POSTS_BY_CATEGORY_SUCCESS,
} from '../actions';

import { Map, List, fromJS } from 'immutable';

const initialState = Map({
  allCategories: List(),
  currentCategory: null,
});

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES_SUCCESS:
      return state.setIn(['allCategories'], fromJS(action.categories));
    case GET_CATEGORY_SUCCESS:
      return state.set('currentCategory', action.category);
    default:
      return state;
  }
}
