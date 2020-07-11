import React from 'react';
import { FormattedMessage } from 'react-intl';

import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import messages from './messages';
import Banner from './Banner';

/**
 * Header component utilizes a styled component called banner that takes in
 * props that are used for conditional rendering
 */

function Header() {
  return (
    <div>
      <Banner fontSize="25px">
        <FormattedMessage {...messages.welcome} />
      </Banner>
      <Banner
        fontSize="15px"
        border="1px solid grey"
        borderRadius="8px"
        margin="10px auto"
        padding="15px 20px"
        maxWidth="80%"
      >
        <FormattedMessage {...messages.intro} />
      </Banner>
      <NavBar>
        <HeaderLink to="/">
          <FormattedMessage {...messages.home} />
        </HeaderLink>
        <HeaderLink to="/inputs">
          <FormattedMessage {...messages.addString} />
        </HeaderLink>
      </NavBar>
    </div>
  );
}

export default Header;
