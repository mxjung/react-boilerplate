/*
 * InputEntryPage
 *
 * This is the component that will be rendered when users go to '/inputs' route
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Intro from './Intro';
import Section from './Section';
import InvalidInput from './InvalidInput';
import messages from './messages';

import { postInput } from '../App/actions';
import { changeInput, toggleValidInput, changeErrorMsg } from './actions';
import {
  makeSelectInput,
  makeSelectValidInput,
  makeSelectErrorMsg,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

const key = 'inputEntryPage';

export function InputEntryPage({
  input = '',
  validInput,
  onSubmitForm,
  onChangeInputString,
  toggleValid,
  errorMsg,
  resetErrorMsg,
}) {
  useInjectReducer({ key, reducer });
  // Will allow saga to keep track of POST_INPUT action
  useInjectSaga({ key, saga });

  // When component unmounts, toggle validInput to be true and set errorMsg
  // to be empty. This is done so that if user inputs wrong input (empty string),
  // an error msg will pop up. Once the user leaves this page, that error msg
  // component should no longer be there when the user comes back to the page.
  useEffect(
    () => () => {
      toggleValid(true);
      resetErrorMsg();
    },
    [],
  );

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
          {errorMsg === 'charLimit' ? (
            <InvalidInput>
              <FormattedMessage {...messages.charLimitErrorMsg} />
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
  errorMsg: PropTypes.string,
  resetErrorMsg: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  input: makeSelectInput(),
  validInput: makeSelectValidInput(),
  errorMsg: makeSelectErrorMsg(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeInputString: evt => {
      if (evt.target.value.length > 15) {
        // if the user adds a input string that is greater than 15 characters, don't allow it.
        // an error msg will pop up on screen notifying users to pick a string that is less than
        // 15 characters. This is done mainly to protect the application from the worst case scenario.
        dispatch(changeErrorMsg('charLimit'));
      } else {
        // Once users are below the char limit, remove the error msg on screen
        dispatch(changeErrorMsg(''));
        dispatch(changeInput(evt.target.value));
      }
    },
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(postInput());
    },
    toggleValid: val => dispatch(toggleValidInput(val)),
    resetErrorMsg: () => dispatch(changeErrorMsg('')),
  };
}

// connect function connects a component to a redux store
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(InputEntryPage);
