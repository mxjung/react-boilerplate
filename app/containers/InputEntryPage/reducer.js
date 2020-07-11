/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  CHANGE_INPUT,
  RESET_INPUT,
  VALID_INPUT,
  ERROR_MESSAGE,
} from './constants';

// The initial state of the App
export const initialState = {
  input: '',
  validInput: true,
  errorMsg: '',
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_INPUT:
        draft.input = action.input;
        break;

      case RESET_INPUT:
        draft.input = '';
        break;

      case VALID_INPUT:
        draft.validInput = action.valid;
        break;

      case ERROR_MESSAGE:
        draft.errorMsg = action.errorMsg;
        break;
    }
  });

export default homeReducer;
