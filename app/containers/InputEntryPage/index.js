/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
// import { select } from 'redux-saga/effects';

// import ReposList from 'components/ReposList';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Intro from './Intro';
import Section from './Section';
import InvalidInput from './InvalidInput';
import messages from './messages';

// // mxjung: added: loadInputs
import { postInput } from '../App/actions';
import { changeInput, toggleValidInput } from './actions';
// mxjung
import { makeSelectInput, makeSelectValidInput } from './selectors';
import reducer from './reducer';
import saga from './saga';

const key = 'inputEntryPage';

export function InputEntryPage({
  input = '',
  validInput,
  onSubmitForm,
  onChangeInputString,
  toggleValid,
}) {
  useInjectReducer({ key, reducer });

  // Will allow saga to keep track of POST_INPUT action
  useInjectSaga({ key, saga });

  // When component unmounts, toggle validInput to be true
  // This is done so that if user inputs wrong input (empty string),
  // an error msg will pop up. Once the user leaves this page, that
  // error msg component should no longer be there when the user comes
  // back to the page.
  useEffect(() => () => toggleValid(true), []);

  return (
    <article>
      <div>
        <Section>
          <CenteredSection>
            <Intro>
              <FormattedMessage {...messages.instructions} />
            </Intro>
            <Form onSubmit={onSubmitForm}>
              <label htmlFor="input">
                <Input
                  id="input"
                  type="text"
                  placeholder="your input here"
                  value={input}
                  onChange={onChangeInputString}
                />
              </label>
              <button type="submit">Submit</button>
            </Form>
          </CenteredSection>
          {!validInput ? (
            <InvalidInput>
              <FormattedMessage {...messages.invalidInputMsg} />
            </InvalidInput>
          ) : null}
        </Section>
      </div>
    </article>
  );
}

InputEntryPage.propTypes = {
  input: PropTypes.string,
  validInput: PropTypes.bool,
  onSubmitForm: PropTypes.func,
  onChangeInputString: PropTypes.func,
  toggleValid: PropTypes.func,
};

// In Redux, whenever an action is called anywhere in the application, all mounted & connected components call their mapStateToProps function. This is why Reselect is awesome. It will just return the memoized result if nothing has changed.

// You need to change the standard mapStateToProps to be an anonymous function, that returns a mapStateToProps function (https://medium.com/@parkerdan/react-reselect-and-redux-b34017f8194c)

const mapStateToProps = createStructuredSelector({
  input: makeSelectInput(),
  validInput: makeSelectValidInput(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeInputString: evt => dispatch(changeInput(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      // mxjung
      dispatch(postInput());
    },
    toggleValid: val => dispatch(toggleValidInput(val)),
  };
}

// mxjung: connect function connects a componnent to a redux store
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

// mxjung: compose let you write deeply nested function transformations
// without the rightward drift of the code

// the goal of React.memo is to check if all the new props received by the component are the same as the last props. If any HOC transforms or adds any props to the component - which connect does by mapping the Redux store to the props, React.memo should be aware of it in order to decide wether or not to update the component. (https://stackoverflow.com/questions/52998469/how-to-use-react-memo-with-react-redux-connect)

export default compose(
  withConnect,
  memo,
)(InputEntryPage);
