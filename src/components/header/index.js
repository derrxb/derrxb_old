import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Media from '../shared/Media';
import NavMobile from './NavMobile';
import NavLaptop from './NavLaptop';

const HeaderNav = styled.nav`
  position: ${({ nature }) => (nature === 'default' ? 'relative' : 'fixed')};
  margin: 0;
  background: ${({ nature }) => (nature === 'default' ? 'white' : 'transparent')};
  height: 4.5em;
  padding: 0 5em;
  display: flex;
  align-items: center;
  z-index: 50;
  width: 100%;

  ${Media.lessThan('laptop')`
    padding: 0 1em;
  `};
`;

const SiteTitle = styled(Link)`
  text-decoration: none;
  color: ${({ nature }) => (nature === 'default' ? '#444' : 'white')};
  align-self: center;
  font-weight: 700;
  font-size: 1.2em;
  margin-right: auto;
`;

const Header = ({ siteTitle, nature }) => (
  <HeaderNav nature={nature}>
    <SiteTitle nature={nature} to="/">
      {siteTitle}
    </SiteTitle>

    <NavMobile nature={nature} />
    <NavLaptop nature={nature} />
  </HeaderNav>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
  nature: PropTypes.oneOf(['default', 'fixed']),
};

Header.defaultProps = {
  siteTitle: ``,
  nature: 'default',
};

export default Header;
