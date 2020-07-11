import produce from 'immer';

import appReducer from '../reducer';
import { loadInputs, inputsLoaded, inputLoadingError } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      loading: false,
      error: false,
      userInputs: [],
    };
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadInputs action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = true;
      draft.error = false;
      draft.userInputs = [];
    });

    expect(appReducer(state, loadInputs())).toEqual(expectedResult);
  });

  it('should handle the inputsLoaded action correctly', () => {
    const fixture = ['test'];
    const expectedResult = produce(state, draft => {
      draft.userInputs = fixture;
      draft.loading = false;
    });

    expect(appReducer(state, inputsLoaded(fixture))).toEqual(expectedResult);
  });

  it('should handle the inputLoadingError action correctly', () => {
    const fixture = {
      msg: 'Not found',
    };
    const expectedResult = produce(state, draft => {
      draft.error = fixture;
      draft.loading = false;
    });

    expect(appReducer(state, inputLoadingError(fixture))).toEqual(
      expectedResult,
    );
  });
});
