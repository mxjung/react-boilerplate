/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.components.Header';

export default defineMessages({
  welcome: {
    id: `${scope}.welcome`,
    defaultMessage: 'Welcome!',
  },
  intro: {
    id: `${scope}.intro`,
    defaultMessage:
      'This is a simple React and Express web application that utilizes redux. The purpose of this application is to use react-boilerplate to implement a simple application where users can add strings to an array that is stored in the backend.',
  },
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  features: {
    id: `${scope}.addString`,
    defaultMessage: 'Add String',
  },
});
