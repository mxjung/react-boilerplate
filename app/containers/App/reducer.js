/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  LOAD_INPUTS,
  LOAD_INPUTS_SUCCESS,
  LOAD_INPUTS_ERROR,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  userInputs: [],
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_INPUTS:
        draft.loading = true;
        draft.error = false;
        draft.userInputs = [];
        break;

      case LOAD_INPUTS_SUCCESS:
        draft.userInputs = action.inputs;
        draft.loading = false;
        break;

      case LOAD_INPUTS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default appReducer;
