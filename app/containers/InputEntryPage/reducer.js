/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { CHANGE_INPUT, RESET_INPUT } from './constants';

// The initial state of the App
export const initialState = {
  input: '',
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_INPUT:
        draft.input = action.input;
        break;

      case RESET_INPUT:
        console.log('inside RESET INPUT');
        draft.input = '';
        break;
    }
  });

export default homeReducer;
