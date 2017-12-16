import { takeEvery } from 'redux-saga/effects';
import { fork, put, call } from 'redux-saga/effects';

import * as ApiClient from '../ApiClient';
import {
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES,
  GET_CATEGORIES_FAILED,
  GET_CATEGORY,
  GET_CATEGORY_SUCCESS,
  SET_CURRENT_CATEGORY,
} from '../dux/categories.js';

import {
  GET_POSTS_OF_CURRENT_CATEGORY_FAILED,
  GET_POSTS_OF_CURRENT_CATEGORY_SUCCESS,
  POST_VOTE,
} from '../dux/posts';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* getCategories() {
  const categories = yield ApiClient.getCategories();
  try {
    yield put({ type: GET_CATEGORIES_SUCCESS, categories });
  } catch (e) {
    yield put({ type: GET_CATEGORIES_FAILED, message: e.message });
  }
}

function* getCategory({ category }) {
  const postsOfCurrentCategory = yield ApiClient.getPostsByCategory(category);

  try {
    yield put({ type: GET_CATEGORY_SUCCESS, category });
    yield put({
      type: GET_POSTS_OF_CURRENT_CATEGORY_SUCCESS,
      postsOfCurrentCategory,
    });
  } catch (e) {
    yield put({
      type: GET_POSTS_OF_CURRENT_CATEGORY_FAILED,
      message: e.message,
    });
  }
}

function* postVote({ post, option }) {
  const posts = yield call(ApiClient.getPosts);
  const postsOfCurrentCategory = yield ApiClient.getPostsByCategory(
    post.category,
  );
  try {
    yield put({
      type: GET_POSTS_OF_CURRENT_CATEGORY_SUCCESS,
      postsOfCurrentCategory,
    });
  } catch (e) {
    yield put({
      type: GET_POSTS_OF_CURRENT_CATEGORY_FAILED,
      message: e.message,
    });
  }
}

/*
 Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
 Allows concurrent fetches of user.
 */

function* watchGetCategories() {
  yield takeEvery(GET_CATEGORIES, getCategories);
}

function* watchGetCategory() {
  yield takeEvery(SET_CURRENT_CATEGORY, getCategory);
  yield takeEvery(GET_CATEGORY, getCategory);
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
function* mySaga() {
  yield fork(watchGetCategories);
  yield fork(watchGetCategory);
  yield fork(watchPostVote);
}

export default mySaga;
