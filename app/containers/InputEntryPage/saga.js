/**
 * POsts new form inputs to Express backend
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { POST_INPUT } from 'containers/App/constants';
import { repoLoadingError, addInput } from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectInput } from 'containers/InputEntryPage/selectors';

import { resetInput, toggleValidInput } from './actions';

/**
 * Express backend POST request/response handler
 */
export function* postInput() {
  try {
    // Select user input from store
    const input = yield select(makeSelectInput());
    // backend API
    const requestURL = `http://localhost:3000/api`;

    // if input string is empty, meaning that a user tried to submit
    // input with an empty string, alert user telling them that the
    // submitted input is invalid, and to enter a valid input

    if (input === '') {
      // show warning for 5 sec
      yield put(toggleValidInput(false));
    } else {
      yield put(toggleValidInput(true));

      // make post request to add input string to backend server array
      yield call(request, requestURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input,
        }),
      });

      // reset user input form value to be empty
      yield put(resetInput());

      // Update redux store with new valley
      yield put(addInput(input));
    }
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
