import { takeEvery } from 'redux-saga/effects';
import { fork, put } from 'redux-saga/effects';

import * as ApiClient from '../ApiClient';

import {
  ADD_NEW_COMMENT,
  ADD_NEW_COMMENT_SUCCESS,
  ADD_NEW_COMMENT_FAILED,
  GET_COMMENTS_BY_POST,
  GET_COMMENTS_BY_POST_FAILED,
  GET_COMMENTS_BY_POST_SUCCESS,
} from '../dux/comments.js';

function* addNewComment({ fields, callback }) {
  const comingData = yield ApiClient.addNewComment(fields);
  console.log('====================================');
  console.log(comingData);
  console.log(fields);
  console.log('====================================');
  // try {
  //   yield put({ type: ADD_NEW_COMMENT_SUCCESS, comingData });
  // } catch (e) {
  //   yield put({ type: ADD_NEW_COMMENT_FAILED, message: e.message });
  // }

  const comments = yield ApiClient.getCommentsByPost(fields.parentId);
  console.log('====================================');
  console.log('comment sanga ', comments);
  console.log('====================================');
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

function* watchAddNewComment() {
  yield takeEvery(ADD_NEW_COMMENT, addNewComment);
}

function* watchGetCommentsByPost() {
  yield takeEvery(GET_COMMENTS_BY_POST, getCommentsByPost);
}

function* postsSaga() {
  yield fork(watchAddNewComment);
  yield fork(watchGetCommentsByPost);
}

export default postsSaga;
