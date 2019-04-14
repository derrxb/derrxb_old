import React from 'react';
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
  color: #444;
  margin-right: 1em;
  &:hover {
    border-bottom: 2px solid #111;
    color: #111;
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

const NavLaptop = () => (
  <NavMenu>
    <NavOption to="/">Home</NavOption>
    <NavOption to="/blog">Blog</NavOption>
    <NavOption to="/photography">Photography</NavOption>
    <NavOption to="/book">Book</NavOption>
    <NavOption to="/about">About</NavOption>
  </NavMenu>
);

export default NavLaptop;
