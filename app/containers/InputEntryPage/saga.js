/**
 * POsts new form inputs to Express backend
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { POST_INPUT } from 'containers/App/constants';
import { repoLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectInput } from 'containers/InputEntryPage/selectors';

import { resetInput } from './actions';

/**
 * Express backend POST request/response handler
 */
export function* postInput() {
  try {
    // Select user input from store
    const input = yield select(makeSelectInput());
    // backend API
    const requestURL = `http://localhost:3000/api`;

    yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input,
      }),
    });
    console.log('inside InputEntryPage saga');
    // reset user input form value to be empty string
    yield put(resetInput());
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* userInputData() {
  // Watches for POST_INPUT actions and calls postInput when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount

  // mxjung
  yield takeLatest(POST_INPUT, postInput);
}
