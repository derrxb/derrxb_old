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
  font-size: 1em;

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

NavOption.propTypes = {
  nature: PropTypes.oneOf(['default', 'fixed']).isRequired,
};

const NavLaptop = ({ links, ...rest }) => (
  <NavMenu>
    {links.map(item => (
      <NavOption key={`${item.name}`} nature="default" {...rest} to={item.to}>
        {item.name}
      </NavOption>
    ))}
  </NavMenu>
);

NavLaptop.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default NavLaptop;
