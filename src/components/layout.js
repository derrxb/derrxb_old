import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import ReactModal from 'react-modal';
import Media from './shared/Media';
import Header from './header';

ReactModal.setAppElement(document.body);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  width: 100vw;
  background: rgb(250, 250, 250);
`;

const Body = styled.div`
  margin: 1em 5em;
  display: flex;
  flex-direction: column;

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

const Footer = styled.div`
  padding: 0 5em;
  height: 300px;
  display: flex;
  margin-top: auto;
`;

const Copyright = styled.span`
  font-weight: 700;
  align-self: center;
  margin-right: auto;
  margin-left: auto;
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

        <Footer>
          <Copyright>© Derrick Bol</Copyright>
        </Footer>
      </Wrapper>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
