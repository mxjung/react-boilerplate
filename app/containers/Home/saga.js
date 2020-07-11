/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_INPUTS } from 'containers/App/constants';
import { inputLoadingError, inputsLoaded } from 'containers/App/actions';

import request from 'utils/request';

/** mxjung
 * Express backend GET request/response handler
 */
export function* getInputs() {
  try {
    // backend API
    const requestURL = `http://localhost:3000/api`;

    // mxjung: let's make GET request
    const inputs = yield call(request, requestURL);

    yield put(inputsLoaded(inputs));
  } catch (err) {
    yield put(inputLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* userInputData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  // yield takeLatest(LOAD_REPOS, getRepos);

  // mxjung
  yield takeLatest(LOAD_INPUTS, getInputs);
}
