/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';

const key = 'home';

export function HomePage({
  username,
  loading,
  error,
  repos,
  onSubmitForm,
  onChangeUsername,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  // check inputs : by mxjung (note, I changed .eslintrc.js to allow console.log)
  console.log('username is: ', username);
  console.log('loading is: ', loading);

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    console.log('inside useEffect');
    if (username && username.trim().length > 0) {
      console.log('inside useEffect, onSubmitForm called');
      // mxjung: this is used when going there is already a username state in redux
      // for instance going from one page and going back to home, look at the dependency,
      // it is only called on the first load using []
      onSubmitForm();
    }
  }, []);

  const reposListProps = {
    loading,
    error,
    repos,
  };

  return (
    <article>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      <div>
        <CenteredSection>
          <H2>
            <FormattedMessage {...messages.startProjectHeader} />
          </H2>
          <p>
            <FormattedMessage {...messages.startProjectMessage} />
          </p>
        </CenteredSection>
        <Section>
          <H2>
            <FormattedMessage {...messages.trymeHeader} />
          </H2>
          <Form onSubmit={onSubmitForm}>
            <label htmlFor="username">
              <FormattedMessage {...messages.trymeMessage} />
              <AtPrefix>
                <FormattedMessage {...messages.trymeAtPrefix} />
              </AtPrefix>
              <Input
                id="username"
                type="text"
                placeholder="mxstbr"
                value={username}
                onChange={onChangeUsername}
              />
            </label>
          </Form>
          <ReposList {...reposListProps} />
        </Section>
      </div>
    </article>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};

// In Redux, whenever an action is called anywhere in the application, all mounted & connected components call their mapStateToProps function. This is why Reselect is awesome. It will just return the memoized result if nothing has changed.

// You need to change the standard mapStateToProps to be an anonymous function, that returns a mapStateToProps function (https://medium.com/@parkerdan/react-reselect-and-redux-b34017f8194c)

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: evt => {
      console.log('inside onSubmitForm');
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
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
)(HomePage);
