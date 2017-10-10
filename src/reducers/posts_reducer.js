import { GET_POSTS_OF_CURRENT_CATEGORY_SUCCESS } from '../actions';

import { Map, List, fromJS } from 'immutable';

const initialState = Map({
  postsOfCurrentCategory: List(),
});

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS_OF_CURRENT_CATEGORY_SUCCESS:
      return state.setIn(
        ['postsOfCurrentCategory'],
        fromJS(action.postsOfCurrentCategory),
      );
    default:
      return state;
  }
}
