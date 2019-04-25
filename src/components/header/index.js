import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Media from '../shared/Media';
import NavMobile from './NavMobile';
import NavLaptop from './NavLaptop';

const HeaderNav = styled.nav`
  margin: 0;
  background: white;
  height: 4.5em;
  padding: 0 5em;
  display: flex;
  align-items: center;
  ${Media.lessThan('laptop')`
    padding: 0 1em;
  `};
`;

const SiteTitle = styled(Link)`
  text-decoration: none;
  color: #444;
  align-self: center;
  font-weight: 700;
  font-size: 1.2em;
  margin-right: auto;
`;

const Header = ({ siteTitle }) => (
  <HeaderNav>
    <SiteTitle to="/">{siteTitle}</SiteTitle>

    <NavMobile />
    <NavLaptop />
  </HeaderNav>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
