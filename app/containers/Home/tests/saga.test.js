/**
 * Tests for HomePage sagas
 */

import { put, takeLatest } from 'redux-saga/effects';

import { LOAD_INPUTS } from 'containers/App/constants';
import { inputsLoaded, inputLoadingError } from 'containers/App/actions';

import userInputData, { getInputs } from '../saga';

const input = ['test'];

/* eslint-disable redux-saga/yield-effects */
describe('getInputs Saga', () => {
  let getInputsGenerator;
  let callDescriptor;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getInputsGenerator = getInputs();

    const selectDescriptor = getInputsGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    callDescriptor = getInputsGenerator.next(input).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the inputsLoaded action if it requests the data successfully', () => {
    const response = ['test'];
    expect(callDescriptor).toEqual(put(inputsLoaded(response)));
  });

  it('should call the inputLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getInputsGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(inputLoadingError(response)));
  });
});

describe('userInputDataSaga Saga', () => {
  const userInputDataSaga = userInputData();

  it('should start task to watch for LOAD_REPOS action', () => {
    const takeLatestDescriptor = userInputDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_INPUTS, getInputs));
  });
});
