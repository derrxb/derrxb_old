import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import Header from './header';

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  width: 100vw;
`;

const Body = styled.div`
  margin: 1em 5em;
  display: flex;
  flex-direction: column;
`;

const Footer = styled.div`
  padding: 0 5em;
`;

const Layout = ({ children }) => (
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
        <Header siteTitle={data.site.siteMetadata.title} />

        <Body>{children}</Body>

        <Footer>© 2018 Derrick Bol</Footer>
      </Wrapper>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
