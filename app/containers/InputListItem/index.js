/**
 * RepoListItem
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react';
import PropTypes from 'prop-types';
import ListItem from 'components/ListItem';

export function InputListItem({ item }) {
  // Render the content into a list item
  return <ListItem key={`repo-list-item-${item.full_name}`} item={item} />;
}

InputListItem.propTypes = {
  item: PropTypes.string,
};

export default InputListItem;
