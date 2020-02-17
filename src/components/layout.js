import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { StaticQuery, graphql } from 'gatsby';
import Media from './shared/Media';
import Header from './header';
import Footer from './Footer';

typeof window !== 'undefined' &&
  ReactModal.setAppElement(document.getElementById('___gatsby'));

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  width: 100vw;
  min-height: 100vh;
  background: rgb(256, 256, 256);
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${({ margin }) => (margin ? '0 3em 1em' : '0 !important')};
  flex-grow: 2;

  ${Media.lessThan('laptop')`
    margin: 1em 2.5em;
  `};

  ${Media.lessThan('tablet')`
    margin: 1em;
  `};

  ${Media.lessThan('mobile')`
    margin: 1em 0.5em;
  `};
`;

const links = [
  {
    name: 'Photography',
    to: '/photography',
  },
  {
    name: 'Software',
    to: '/dev',
  },
  {
    name: 'About',
    to: '/about',
  },
  {
    name: 'Contact',
    to: '/book',
  },
];

const Layout = ({ children, margin, footer, header }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <Wrapper>
        <Header siteTitle={data.site.siteMetadata.title} nature={header} links={links} />

        <Body margin={margin}>{children}</Body>

        {footer && <Footer />}
      </Wrapper>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  margin: PropTypes.bool,
  header: PropTypes.oneOf(['default', 'fixed']),
  footer: PropTypes.bool,
};

Layout.defaultProps = {
  margin: true,
  footer: true,
  header: 'default',
};

export default Layout;
