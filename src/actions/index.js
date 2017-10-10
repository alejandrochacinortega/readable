import { fromJS } from 'immutable';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_FAILED = 'GET_CATEGORIES_FAILED';
export const GET_CATEGORY = 'GET_CATEGORY';
export const GET_CATEGORY_SUCCESS = 'GET_CATEGORY_SUCCESS';
export const GET_CATEGORY_FAILED = 'GET_CATEGORY_FAILED';
export const GET_POSTS_OF_CURRENT_CATEGORY = 'GET_POSTS_OF_CURRENT_CATEGORY';
export const GET_POSTS_OF_CURRENT_CATEGORY_SUCCESS =
  'GET_POSTS_OF_CURRENT_CATEGORY_SUCCESS';
export const GET_POSTS_OF_CURRENT_CATEGORY_FAILED =
  'GET_POSTS_OF_CURRENT_CATEGORY_FAILED';

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
