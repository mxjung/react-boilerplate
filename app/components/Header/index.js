import React from 'react';
import { FormattedMessage } from 'react-intl';

// import A from './A';
// import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
// import Banner from './banner.jpg';
import messages from './messages';
import Banner from './Banner';
import Intro from './Intro';

function Header() {
  return (
    <div>
      {/* <A href="https://www.reactboilerplate.com/">
        <Img src={Banner} alt="react-boilerplate - Logo" />
      </A> */}
      <Banner>
        <FormattedMessage {...messages.welcome} />
      </Banner>
      <Intro>
        <FormattedMessage {...messages.intro} />
      </Intro>
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
