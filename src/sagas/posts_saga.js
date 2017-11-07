import { takeEvery } from 'redux-saga/effects';
import { fork, put } from 'redux-saga/effects';

import * as ApiClient from '../ApiClient';

import {
  GET_POSTS,
  GET_POSTS_FAILED,
  GET_POSTS_SUCCESS,
  ADD_NEW_POST,
  ADD_NEW_POST_SUCCESS,
  ADD_NEW_POST_FAILED,
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
  console.log('====================================');
  console.log('Fields saga ', fields);
  console.log('====================================');
  const comingData = yield ApiClient.addNewPost(fields);
  console.log('====================================');
  console.log('Coming data ', comingData);
  console.log('====================================');
  callback();
  // try {
  //   yield put({ type: GET_CATEGORIES_SUCCESS, categories });
  // } catch (e) {
  //   yield put({ type: GET_CATEGORIES_FAILED, message: e.message });
  // }
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

/*
 Alternatively you may use takeLatest.
 
 Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
 dispatched while a fetch is already pending, that pending fetch is cancelled
 and only the latest one will be run.
 */
function* postsSaga() {
  yield fork(watchGetPosts);
  yield fork(watchAddNewPost);
}

export default postsSaga;
