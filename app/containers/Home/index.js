/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
// import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
// import { select } from 'redux-saga/effects';

import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
  makeSelectUserInputs,
} from 'containers/App/selectors';

// import H2 from 'components/H2';
import InputsList from 'components/InputsList';
// import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
// import Form from './Form';
// import Input from './Input';
// import Section from './Section';
import messages from './messages';

import { makeSelectUsername } from './selectors';
// // mxjung: added: loadInputs
import { loadInputs } from '../App/actions';
// import { makeSelectInputs } from '../Home/selectors';
import reducer from './reducer';
import saga from './saga';

const key = 'home';

export function Home({ inputs, loading, error, dispatchInputs }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    // When component first mounts, load all user inputs through API call
    // console.log('inside useEffect in Home to dispatchInputs');
    dispatchInputs(loadInputs());
  }, []);

  // function* getUserInputs() {
  //   // Select userInput from store
  //   console.log('inside getUserInputs call XX');
  //   const inputs = yield select(makeSelectUserInputs());
  //   console.log('inside useEffect, inputs is: ', inputs);
  // }

  // useEffect(() => getUserInputs());

  const inputsListProps = {
    loading,
    error,
    inputs,
  };

  return (
    <article>
      <div>
        {inputs.length === 0 ? (
          <CenteredSection>
            <p>
              <FormattedMessage {...messages.emptyArray} />
            </p>
          </CenteredSection>
        ) : (
          <InputsList {...inputsListProps} />
        )}
      </div>
    </article>
  );
}

Home.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  inputs: PropTypes.array,
  dispatchInputs: PropTypes.func,
};

// In Redux, whenever an action is called anywhere in the application, all mounted & connected components call their mapStateToProps function. This is why Reselect is awesome. It will just return the memoized result if nothing has changed.

// You need to change the standard mapStateToProps to be an anonymous function, that returns a mapStateToProps function (https://medium.com/@parkerdan/react-reselect-and-redux-b34017f8194c)

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  inputs: makeSelectUserInputs(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatchInputs: () => {
      dispatch(loadInputs());
    },
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
)(Home);
