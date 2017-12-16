import { takeEvery } from 'redux-saga/effects';
import { fork, put, call } from 'redux-saga/effects';

import * as ApiClient from '../ApiClient';

import {
  ADD_NEW_COMMENT,
  GET_COMMENTS_BY_POST,
  GET_COMMENTS_BY_POST_FAILED,
  GET_COMMENTS_BY_POST_SUCCESS,
  EDIT_COMMENT,
  DELETE_COMMENT,
  COMMENT_VOTE,
} from '../dux/comments.js';

function* addNewComment({ fields, callback }) {
  yield ApiClient.addNewComment(fields);
  const comments = yield ApiClient.getCommentsByPost(fields.parentId);
  try {
    yield put({ type: GET_COMMENTS_BY_POST_SUCCESS, comments });
  } catch (e) {
    yield put({ type: GET_COMMENTS_BY_POST_FAILED, message: e.message });
  }
  callback();
}

function* editComment({ fields, callback }) {
  const edit = yield ApiClient.editComment(fields);
  const comments = yield ApiClient.getCommentsByPost(fields.parentId);
  try {
    yield put({ type: GET_COMMENTS_BY_POST_SUCCESS, comments });
  } catch (e) {
    yield put({ type: GET_COMMENTS_BY_POST_FAILED, message: e.message });
  }
  callback();
}

function* deleteComment({ comment, callback }) {
  yield ApiClient.deleteComment(comment.get('id'));
  const comments = yield call(ApiClient.getCommentsByPost, {
    postId: comment.get('parentId'),
  });
  console.log('New comments ', comments);
  try {
    yield put({ type: GET_COMMENTS_BY_POST_SUCCESS, comments });
  } catch (e) {
    yield put({ type: GET_COMMENTS_BY_POST_FAILED, message: e.message });
  }
  callback();
}

function* getCommentsByPost({ postId }) {
  const comments = yield ApiClient.getCommentsByPost(postId);
  try {
    yield put({ type: GET_COMMENTS_BY_POST_SUCCESS, comments });
  } catch (e) {
    yield put({ type: GET_COMMENTS_BY_POST_FAILED, message: e.message });
  }
}

function* commentVote({ comment, option }) {
  const res = yield call(ApiClient.commentVote, {
    commentId: comment.get('id'),
    option,
  });
  const comments = yield ApiClient.getCommentsByPost(comment.get('parentId'));

  try {
    yield put({ type: GET_COMMENTS_BY_POST_SUCCESS, comments });
  } catch (e) {
    yield put({ type: GET_COMMENTS_BY_POST_FAILED, message: e.message });
  }
}

function* watchAddNewComment() {
  yield takeEvery(ADD_NEW_COMMENT, addNewComment);
}

function* watchGetCommentsByPost() {
  yield takeEvery(GET_COMMENTS_BY_POST, getCommentsByPost);
}

function* watchEditComment() {
  yield takeEvery(EDIT_COMMENT, editComment);
}

function* watchDeleteComment() {
  yield takeEvery(DELETE_COMMENT, deleteComment);
}

function* watchCommentVote() {
  yield takeEvery(COMMENT_VOTE, commentVote);
}

function* postsSaga() {
  yield fork(watchAddNewComment);
  yield fork(watchGetCommentsByPost);
  yield fork(watchEditComment);
  yield fork(watchDeleteComment);
  yield fork(watchCommentVote);
}

export default postsSaga;
