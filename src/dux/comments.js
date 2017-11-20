import { Map, List, fromJS } from 'immutable';

export const ADD_NEW_COMMENT = 'ADD_NEW_COMMENT';
export const ADD_NEW_COMMENT_SUCCESS = 'ADD_NEW_COMMENT_SUCCESS';
export const ADD_NEW_COMMENT_FAILED = 'ADD_NEW_COMMENT_FAILED';
export const GET_COMMENTS_BY_POST = 'GET_COMMENTS_BY_POST';
export const GET_COMMENTS_BY_POST_SUCCESS = 'GET_COMMENTS_BY_POST_SUCCESS';
export const GET_COMMENTS_BY_POST_FAILED = 'GET_COMMENTS_BY_POST_FAILED';

export function addNewComment(fields, callback) {
  return {
    type: ADD_NEW_COMMENT,
    fields,
    callback,
  };
}

export function getCommentsByPost(postId) {
  return {
    type: GET_COMMENTS_BY_POST,
    postId,
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
