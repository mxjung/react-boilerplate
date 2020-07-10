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

// import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
// import { select } from 'redux-saga/effects';

import {
  // makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
  makeSelectUserInputs,
} from 'containers/App/selectors';

import InputsList from 'components/InputsList';
import CenteredSection from './CenteredSection';
import messages from './messages';

// // mxjung: added: loadInputs
import { loadInputs } from '../App/actions';
// import { makeSelectInputs } from '../Home/selectors';
// import reducer from './reducer';
import saga from './saga';

const key = 'home';

export function Home({ inputs, loading, error, dispatchInputs }) {
  // useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    // When component first mounts, load all user inputs through API call
    // console.log('inside useEffect in Home to dispatchInputs');
    dispatchInputs(loadInputs());
  }, []);

  const inputsListProps = {
    loading,
    error,
    inputs,
  };

  // if loading has completed, and the inputs array is still an empty array,
  // that means the backend server array is empty. In the case that inputs
  // is empty, there is a possibility that it's still loading, hence the
  // conditional check to make sure inputs is empty AND loading has completed
  return (
    <article>
      <div>
        {inputs.length === 0 && !loading ? (
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
  inputs: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  dispatchInputs: PropTypes.func,
};

// In Redux, whenever an action is called anywhere in the application, all mounted & connected components call their mapStateToProps function. This is why Reselect is awesome. It will just return the memoized result if nothing has changed.

// You need to change the standard mapStateToProps to be an anonymous function, that returns a mapStateToProps function (https://medium.com/@parkerdan/react-reselect-and-redux-b34017f8194c)

const mapStateToProps = createStructuredSelector({
  inputs: makeSelectUserInputs(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
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
