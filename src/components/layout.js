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
  background: rgb(256, 256, 256);
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${({ margin }) => (margin ? '0 5em 1em' : '0 !important')};

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
    name: 'Dev',
    to: '/dev',
  },
  {
    name: 'Photography',
    to: '/photography',
  },
  {
    name: 'Book Session',
    to: '/contact-us',
  },
  {
    name: 'About',
    to: '/about',
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
