/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.HomePage';

export default defineMessages({
  instructions: {
    id: `${scope}.instructions.message`,
    defaultMessage:
      'Please enter a word into the input box below and click your keyboard enter or click the "Submit" button. This will add the word into the store. Once done, please navigate back to the homepage using the "Home" button to see the word you have added to the store',
  },
  invalidInputMsg: {
    id: `${scope}.invalidInputMsg.message`,
    defaultMessage: 'Please enter a valid word (not empty)',
  },
});
