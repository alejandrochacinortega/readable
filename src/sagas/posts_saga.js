import { takeEvery } from 'redux-saga/effects';
import { fork, put, call } from 'redux-saga/effects';

import * as ApiClient from '../ApiClient';

import {
  GET_POSTS,
  GET_POSTS_FAILED,
  GET_POSTS_SUCCESS,
  ADD_NEW_POST,
  EDIT_POST,
  DELETE_POST,
  POST_VOTE,
} from '../dux/posts.js';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* getPosts() {
  const posts = yield ApiClient.getPosts();
  try {
    yield put({ type: GET_POSTS_SUCCESS, posts });
  } catch (e) {
    yield put({ type: GET_POSTS_FAILED, message: e.message });
  }
}

function* addNewPost({ fields, callback }) {
  const comingData = yield ApiClient.addNewPost(fields);
  callback();
}

function* editPost({ fields, callback }) {
  yield ApiClient.editPost(fields);
  const posts = yield ApiClient.getPosts();

  try {
    yield put({ type: GET_POSTS_SUCCESS, posts });
    callback();
  } catch (e) {
    yield put({ type: GET_POSTS_FAILED, message: e.message });
  }
}

function* deletePost({ postId, callback }) {
  yield ApiClient.deletePost(postId);
  const posts = yield ApiClient.getPosts();

  try {
    yield put({ type: GET_POSTS_SUCCESS, posts });
  } catch (e) {
    yield put({ type: GET_POSTS_FAILED, message: e.message });
  }
  callback();
}

function* postVote({ post, option }) {
  const res = yield call(ApiClient.postVote, { postId: post.id, option });
  const posts = yield call(ApiClient.getPosts);

  try {
    yield put({ type: GET_POSTS_SUCCESS, posts });
  } catch (e) {
    yield put({ type: GET_POSTS_FAILED, message: e.message });
  }
}

/*
 Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
 Allows concurrent fetches of user.
 */

function* watchGetPosts() {
  yield takeEvery(GET_POSTS, getPosts);
}

function* watchAddNewPost() {
  yield takeEvery(ADD_NEW_POST, addNewPost);
}

function* watchEditPost() {
  yield takeEvery(EDIT_POST, editPost);
}

function* watchDeletePost() {
  yield takeEvery(DELETE_POST, deletePost);
}

function* watchPostVote() {
  yield takeEvery(POST_VOTE, postVote);
}

/*
 Alternatively you may use takeLatest.
 
 Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
 dispatched while a fetch is already pending, that pending fetch is cancelled
 and only the latest one will be run.
 */
function* postsSaga() {
  yield fork(watchGetPosts);
  yield fork(watchAddNewPost);
  yield fork(watchEditPost);
  yield fork(watchDeletePost);
  yield fork(watchPostVote);
}

export default postsSaga;
