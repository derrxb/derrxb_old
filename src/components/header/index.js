import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Media from '../shared/Media';
import NavModal from './NavModal';

const Nav = styled.nav`
  position: ${({ nature }) => (nature === 'default' ? 'relative' : 'absolute')};
  margin: 0;
  background: ${({ nature }) => (nature === 'default' ? 'white' : 'transparent')};
  height: 4.5em;
  padding: 1em 5em;
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

const Links = styled.div`
  margin-left: auto;

  ${Media.lessThan('laptop')`
    display: none;
  `};
`;

export const NavOption = styled(Link)`
  font-size: 1em;
  color: ${({ nature }) => (nature === 'default' ? '#444' : 'white')};
  text-decoration: none;
  margin-right: 1em;

  &:hover {
    border-bottom: 2px solid ${({ nature }) => (nature === 'default' ? '#444' : 'white')};
  }

  ${Media.greaterThan('bigMonitor')`
    font-size: 2em;
  `};

  ${Media.lessThan('laptop')`
    width: 100%;
    height: 100%;
    display: block;
    padding: 0.5em 1em;
    color: #444;
    font-weight: 700;
    text-decoration: none;

    &:focus,
    &:hover {
      border-bottom: none;
      text-decoration: none;
    }
  `};
`;

const Header = ({ siteTitle, nature, links, ...rest }) => (
  <Nav nature={nature}>
    <Title nature={nature} to="/">
      {siteTitle}
    </Title>

    <Links>
      {links.map(item => (
        <NavOption
          {...rest}
          data-testid="nav-link"
          key={`${item.name}`}
          nature={nature}
          to={item.to}
        >
          {item.name}
        </NavOption>
      ))}
    </Links>

    <NavModal nature={nature} links={links} />
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
