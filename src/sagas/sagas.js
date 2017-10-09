import { takeEvery } from 'redux-saga/effects';
import { fork, put } from 'redux-saga/effects';

import * as ApiClient from '../ApiClient';
import {
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES,
  GET_CATEGORIES_FAILED,
  GET_CATEGORY,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAILED,
  GET_POSTS_BY_CATEGORY_SUCCESS,
} from '../actions';

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
  const postsByCategory = yield ApiClient.getPostsByCategory(category);
  try {
    yield put({ type: GET_CATEGORY_SUCCESS, category });
    yield put({ type: GET_POSTS_BY_CATEGORY_SUCCESS, postsByCategory });
  } catch (e) {
    yield put({ type: GET_CATEGORY_FAILED, message: e.message });
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
  yield takeEvery(GET_CATEGORY, getCategory);
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
}

export default mySaga;
