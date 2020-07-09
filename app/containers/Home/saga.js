/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_INPUTS } from 'containers/App/constants';
import {
  reposLoaded,
  repoLoadingError,
  inputsLoaded,
} from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectUsername } from 'containers/HomePage/selectors';

/**
 * Github repos request/response handler
 */
export function* getRepos() {
  // Select username from store
  const username = yield select(makeSelectUsername());
  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  try {
    // Call our request helper (see 'utils/request')

    // mxjung: "call" Creates an Effect description that instructs the middleware to call the function fn with args as arguments (https://redux-saga.js.org/docs/api/#callfn-args)
    console.log('inside getRepos Call');
    const repos = yield call(request, requestURL);

    yield put(reposLoaded(repos, username));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

/** mxjung
 * Express backend GET request/response handler
 */
export function* getInputs() {
  try {
    // backend API
    const requestURL = `http://localhost:3000/api`;
    // mxjung: let's try posting
    const inputs = yield call(request, requestURL);

    console.log('inside getInputs, inputs is', inputs);
    yield put(inputsLoaded(inputs));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

/**
 * Express backend POST request/response handler
 */
export function* postInput() {
  try {
    // Select username from store
    const username = yield select(makeSelectUsername());

    // backend API
    const requestURL = `http://localhost:3000/api`;
    // mxjung: let's try posting
    const inputs = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
      }),
    });

    console.log('inside postInputs, inputs is', inputs);
    yield put(inputsLoaded(inputs));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  // yield takeLatest(LOAD_REPOS, getRepos);

  // mxjung
  yield takeLatest(LOAD_INPUTS, getInputs);
}
