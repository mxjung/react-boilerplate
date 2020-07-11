/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_INPUTS,
  LOAD_INPUTS_SUCCESS,
  LOAD_INPUTS_ERROR,
  POST_INPUT,
} from './constants';

/**
 * Load the user inputs, this action starts the request saga in Home
 *
 * @return {object} An action object with a type of LOAD_INPUTS
 */
export function loadInputs() {
  return {
    type: LOAD_INPUTS,
  };
}

/**
 * post new user input, this action starts the request saga in InputEntryPage
 *
 * @return {object} An action object with a type of POST_INPUT
 */
export function postInput() {
  return {
    type: POST_INPUT,
  };
}

/**
 * Dispatched when the user inputs are loaded by the request saga
 *
 * @param  {array} inputs The array containing user input strings
 *
 * @return {object}      An action object with a type of LOAD_INPUTS_SUCCESS passing the inputs
 */
export function inputsLoaded(inputs) {
  return {
    type: LOAD_INPUTS_SUCCESS,
    inputs,
  };
}

/**
 * Dispatched when loading the inputs fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function inputLoadingError(error) {
  return {
    type: LOAD_INPUTS_ERROR,
    error,
  };
}
