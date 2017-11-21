import { Map, List, fromJS } from 'immutable';

export const ADD_NEW_COMMENT = 'ADD_NEW_COMMENT';
export const ADD_NEW_COMMENT_SUCCESS = 'ADD_NEW_COMMENT_SUCCESS';
export const ADD_NEW_COMMENT_FAILED = 'ADD_NEW_COMMENT_FAILED';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS';
export const EDIT_COMMENT_FAILED = 'EDIT_COMMENT_FAILED';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_FAILED = 'DELETE_COMMENT_FAILED';
export const GET_COMMENTS_BY_POST = 'GET_COMMENTS_BY_POST';
export const GET_COMMENTS_BY_POST_SUCCESS = 'GET_COMMENTS_BY_POST_SUCCESS';
export const GET_COMMENTS_BY_POST_FAILED = 'GET_COMMENTS_BY_POST_FAILED';
export const COMMENT_VOTE = 'COMMENT_VOTE';

export function addNewComment(fields, callback) {
  console.log(' dsdds ', fields);
  return {
    type: ADD_NEW_COMMENT,
    fields,
    callback,
  };
}

export function editComment(fields, callback) {
  return {
    type: EDIT_COMMENT,
    fields,
    callback,
  };
}

export function deleteComment(comment, callback) {
  return {
    type: DELETE_COMMENT,
    comment,
    callback,
  };
}

export function getCommentsByPost(postId) {
  return {
    type: GET_COMMENTS_BY_POST,
    postId,
  };
}

export function commentVote(comment, option) {
  return {
    type: COMMENT_VOTE,
    comment,
    option,
  };
}

const initialState = Map({
  commentsOfCurrentPost: List(),
});

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS_BY_POST_SUCCESS:
      return state.setIn(['commentsOfCurrentPost'], fromJS(action.comments));
    default:
      return state;
  }
}
