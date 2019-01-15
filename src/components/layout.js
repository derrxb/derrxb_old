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
  margin: 0 auto;
  padding: 0 5rem;
  width: 100%;
`;

const Footer = styled.div`
  width: 100%;
  padding: 0 calc(100% - 90%) 0 calc(100% - 90%);
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
