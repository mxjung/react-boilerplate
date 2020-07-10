import React from 'react';
import PropTypes from 'prop-types';

import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import InputListItem from 'containers/InputListItem';

function InputsList({ loading, error, inputs }) {
  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem item="Something went wrong, please try again!" />
    );
    return <List component={ErrorComponent} />;
  }

  if (inputs !== false) {
    return <List items={inputs} component={InputListItem} />;
  }

  return null;
}

InputsList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  inputs: PropTypes.any,
};

export default InputsList;
