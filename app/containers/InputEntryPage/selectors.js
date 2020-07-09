/**
 * InputEntryPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.home || initialState;

const makeSelectInput = () =>
  createSelector(
    selectHome,
    homeState => homeState.input,
  );

export { selectHome, makeSelectInput };
