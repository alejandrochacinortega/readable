import { GET_CATEGORIES_SUCCESS } from '../actions';

import { Map, List, fromJS } from 'immutable';

const initialState = Map({
  allCategories: List(),
});

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES_SUCCESS:
      return state.setIn(['allCategories'], fromJS(action.categories));
    default:
      return state;
  }
}
