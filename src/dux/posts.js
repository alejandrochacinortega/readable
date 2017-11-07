import { Map, List, fromJS } from 'immutable';

export const GET_POSTS_OF_CURRENT_CATEGORY = 'GET_POSTS_OF_CURRENT_CATEGORY';
export const GET_POSTS_OF_CURRENT_CATEGORY_SUCCESS =
  'GET_POSTS_OF_CURRENT_CATEGORY_SUCCESS';
export const GET_POSTS_OF_CURRENT_CATEGORY_FAILED =
  'GET_POSTS_OF_CURRENT_CATEGORY_FAILED';
export const ADD_NEW_POST = 'ADD_NEW_POST';
export const ADD_NEW_POST_SUCCESS = 'ADD_NEW_POST_SUCCESS';
export const ADD_NEW_POST_FAILED = 'ADD_NEW_POST_FAILED';
export const GET_POSTS = 'GET_POSTS';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_FAILED = 'GET_POSTS_FAILED';

export function addNewPost(fields, callback) {
  return {
    type: ADD_NEW_POST,
    fields,
    callback,
  };
}

export function getAllPosts() {
  return {
    type: GET_POSTS,
  };
}
GET_POSTS_SUCCESS;

const initialState = Map({
  postsOfCurrentCategory: List(),
  allPosts: List(),
});

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS_OF_CURRENT_CATEGORY_SUCCESS:
      return state.setIn(
        ['postsOfCurrentCategory'],
        fromJS(action.postsOfCurrentCategory),
      );

    case GET_POSTS_SUCCESS:
      return state.setIn(['allPosts'], fromJS(action.posts));
    default:
      return state;
  }
}
