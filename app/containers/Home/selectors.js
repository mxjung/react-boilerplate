/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.home || initialState;

const makeSelectInputs = () =>
  createSelector(
    selectHome,
    homeState => homeState.inputs,
  );

const makeSelectUsername = () =>
  createSelector(
    selectHome,
    homeState => homeState.username,
  );

export { selectHome, makeSelectInputs, makeSelectUsername };
