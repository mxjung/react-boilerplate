/**
 * InputEntryPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.home || initialState;

// Grab input from home state
const makeSelectInput = () =>
  createSelector(
    selectHome,
    homeState => homeState.input,
  );

// Grab valid boolean from home state
const makeSelectValidInput = () =>
  createSelector(
    selectHome,
    homeState => homeState.validInput,
  );

export { selectHome, makeSelectInput, makeSelectValidInput };
