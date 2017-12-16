import { Map, List, fromJS } from 'immutable';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_FAILED = 'GET_CATEGORIES_FAILED';
export const GET_CATEGORY = 'GET_CATEGORY';
export const GET_CATEGORY_SUCCESS = 'GET_CATEGORY_SUCCESS';
export const GET_CATEGORY_FAILED = 'GET_CATEGORY_FAILED';
export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY';
export const SET_CURRENT_CATEGORY_SUCCESS = 'SET_CURRENT_CATEGORY_SUCCESS';
export const SET_CURRENT_CATEGORY_FAILED = 'SET_CURRENT_CATEGORY_FAILED';

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

export function setCurrentCategory(category) {
  return {
    type: SET_CURRENT_CATEGORY,
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
    case SET_CURRENT_CATEGORY:
      return state.set('currentCategory', fromJS(action.category));
    default:
      return state;
  }
}
