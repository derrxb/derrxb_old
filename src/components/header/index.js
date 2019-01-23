import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const HeaderNav = styled.nav`
  margin: 0;
  background: #00ab8c;
  height: 3em;
  padding: 0 5em;
  display: flex;
`;

const SiteTitle = styled(Link)`
  text-decoration: none;
  color: #002042;
  color: whitesmoke;
  align-self: center;
  font-weight: 700;
  font-size: 1.5em;
`;

const Header = ({ siteTitle }) => (
  <HeaderNav>
    <SiteTitle to="/">{siteTitle}</SiteTitle>
  </HeaderNav>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
