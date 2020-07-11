/**
 * InputEntryPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectInputEntryPage = state => state.inputEntryPage || initialState;

// Grab input from home state
const makeSelectInput = () =>
  createSelector(
    selectInputEntryPage,
    homeState => homeState.input,
  );

// Grab valid boolean from home state
const makeSelectValidInput = () =>
  createSelector(
    selectInputEntryPage,
    homeState => homeState.validInput,
  );

// Grab valid boolean from home state
const makeSelectErrorMsg = () =>
  createSelector(
    selectInputEntryPage,
    homeState => homeState.errorMsg,
  );

export {
  selectInputEntryPage,
  makeSelectInput,
  makeSelectValidInput,
  makeSelectErrorMsg,
};
