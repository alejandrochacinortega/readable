import { Map, List, fromJS } from 'immutable';

export const GET_POSTS_OF_CURRENT_CATEGORY = 'GET_POSTS_OF_CURRENT_CATEGORY';
export const GET_POSTS_OF_CURRENT_CATEGORY_SUCCESS =
  'GET_POSTS_OF_CURRENT_CATEGORY_SUCCESS';
export const GET_POSTS_OF_CURRENT_CATEGORY_FAILED =
  'GET_POSTS_OF_CURRENT_CATEGORY_FAILED';
export const ADD_NEW_POST = 'ADD_NEW_POST';
export const ADD_NEW_POST_SUCCESS = 'ADD_NEW_POST_SUCCESS';
export const ADD_NEW_POST_FAILED = 'ADD_NEW_POST_FAILED';
export const EDIT_POST = 'EDIT_POST';
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS';
export const EDIT_POST_FAILED = 'EDIT_POST_FAILED';
export const DELETE_POST = 'DELETE_POST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILED = 'DELETE_POST_FAILED';
export const GET_POSTS = 'GET_POSTS';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_FAILED = 'GET_POSTS_FAILED';
export const SET_CURRENT_POST = 'SET_CURRENT_POST';
export const POST_VOTE = 'POST_VOTE';
export const POST_VOTE_SUCCESS = 'POST_VOTE_SUCCESS';
export const POST_VOTE_FAILED = 'POST_VOTE_FAILED';

export function addNewPost(fields, callback) {
  return {
    type: ADD_NEW_POST,
    fields,
    callback,
  };
}

export function editPost(fields, callback) {
  return {
    type: EDIT_POST,
    fields,
    callback,
  };
}

export function deletePost(postId, callback) {
  return {
    type: DELETE_POST,
    postId,
    callback,
  };
}

export function getAllPosts() {
  return {
    type: GET_POSTS,
  };
}

export function getAllPostsOfCurrentCategory() {
  return {
    type: GET_POSTS_OF_CURRENT_CATEGORY,
  };
}

export function setCurrentPost(post) {
  return {
    type: SET_CURRENT_POST,
    post,
  };
}

export function postVote(postId, option, callback) {
  return {
    type: POST_VOTE,
    postId,
    option,
    callback,
  };
}

const initialState = Map({
  postsOfCurrentCategory: List(),
  allPosts: List(),
  currentPost: null,
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
    case SET_CURRENT_POST:
      return state.set('currentPost', fromJS(action.post));
    case EDIT_POST:
      return state.set('currentPost', fromJS(action.post));
    default:
      return state;
  }
}
