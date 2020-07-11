import {
  LOAD_INPUTS,
  LOAD_INPUTS_SUCCESS,
  LOAD_INPUTS_ERROR,
} from '../constants';

import { loadInputs, inputsLoaded, inputLoadingError } from '../actions';

describe('App Actions', () => {
  describe('loadInputs', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOAD_INPUTS,
      };

      expect(loadInputs()).toEqual(expectedResult);
    });
  });

  describe('inputsLoaded', () => {
    it('should return the correct type and the passed inputs', () => {
      const fixture = ['Test'];
      const expectedResult = {
        type: LOAD_INPUTS_SUCCESS,
        inputs: fixture,
      };

      expect(inputsLoaded(fixture)).toEqual(expectedResult);
    });
  });

  describe('inputLoadingError', () => {
    it('should return the correct type and the error', () => {
      const fixture = {
        msg: 'Something went wrong!',
      };
      const expectedResult = {
        type: LOAD_INPUTS_ERROR,
        error: fixture,
      };

      expect(inputLoadingError(fixture)).toEqual(expectedResult);
    });
  });
});
