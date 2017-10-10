import { Map, List, fromJS } from 'immutable';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_FAILED = 'GET_CATEGORIES_FAILED';
export const GET_CATEGORY = 'GET_CATEGORY';
export const GET_CATEGORY_SUCCESS = 'GET_CATEGORY_SUCCESS';
export const GET_CATEGORY_FAILED = 'GET_CATEGORY_FAILED';

export function getAllCategories() {
  return {
    type: GET_CATEGORIES,
  };
}

export function getCategory(category) {
  return {
    type: GET_CATEGORY,
    category,
  };
}

const initialState = Map({
  allCategories: List(),
  currentCategory: null,
});

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES_SUCCESS:
      return state.setIn(['allCategories'], fromJS(action.categories));
    case GET_CATEGORY_SUCCESS:
      return state.set('currentCategory', fromJS(action.category));
    default:
      return state;
  }
}
