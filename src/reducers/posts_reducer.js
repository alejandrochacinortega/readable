import { GET_POSTS_BY_CATEGORY_SUCCESS } from '../actions';

import { Map, List, fromJS } from 'immutable';

const initialState = Map({
  postsByCategory: List(),
});

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS_BY_CATEGORY_SUCCESS:
      return state.setIn(['postsByCategory'], action.postsByCategory);
    default:
      return state;
  }
}
