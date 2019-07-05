import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Media from '../shared/Media';

const NavMenu = styled.div`
  margin-left: auto;
  ${Media.lessThan('laptop')`
    display: none;
  `};
`;

export const NavOption = styled(Link)`
  text-decoration: none;
  color: ${({ nature }) => (nature === 'default' ? '#444' : 'white')};
  margin-right: 1em;

  &:hover {
    border-bottom: 2px solid white;
  }

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

NavOption.propTypes = {
  nature: PropTypes.oneOf(['default', 'fixed']).isRequired,
};

const NavLaptop = props => (
  <NavMenu>
    <NavOption to="/" {...props}>
      Home
    </NavOption>

    <NavOption to="/dev" {...props}>
      Dev
    </NavOption>

    <NavOption to="/photography" {...props}>
      Photography
    </NavOption>

    <NavOption to="/book" {...props}>
      Book Session
    </NavOption>

    <NavOption to="/about" {...props}>
      About
    </NavOption>
  </NavMenu>
);

export default NavLaptop;
