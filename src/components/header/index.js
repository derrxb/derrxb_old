import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Media from '../shared/Media';
import NavModal from './NavModal';
import NavLaptop from './NavLaptop';

const Nav = styled.nav`
  position: ${({ nature }) => (nature === 'default' ? 'relative' : 'absolute')};
  margin: 0;
  background: ${({ nature }) => (nature === 'default' ? 'white' : 'transparent')};
  height: 4.5em;
  padding: 0 5em;
  display: flex;
  align-items: center;
  z-index: 50;
  width: 100%;

  ${Media.greaterThan('bigMonitor')`
    height: 9em;
  `};

  ${Media.lessThan('laptop')`
    padding: 0 1em;
  `};
`;

const Title = styled(Link)`
  text-decoration: none;
  color: ${({ nature }) => (nature === 'default' ? '#444' : 'white')};
  align-self: center;
  font-weight: 700;
  font-size: 1.2em;
  margin-right: auto;

  ${Media.greaterThan('bigMonitor')`
    font-size: 2em;
  `};
`;

const Header = ({ siteTitle, nature, links }) => (
  <Nav nature={nature}>
    <Title nature={nature} to="/">
      {siteTitle}
    </Title>

    <NavModal nature={nature} links={links} />
    <NavLaptop nature={nature} links={links} />
  </Nav>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
  nature: PropTypes.oneOf(['default', 'fixed']),
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
    })
  ).isRequired,
};

Header.defaultProps = {
  siteTitle: ``,
  nature: 'default',
};

export default Header;
