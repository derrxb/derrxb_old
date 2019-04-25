import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/layout';
import SEO from '../components/seo';

export const StyledLink = styled(Link)`
  font-weight: 500;
  font-size: 1.1em;
  color: rgb(0, 32, 66);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const RecentBlogsList = styled.ul`
  margin: 0;
  list-style: none;
`;

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" keywords={[`belize photography`, `explore belize`]} />

    <h1 style={{ marginTop: '0.5em' }}>Recent</h1>

    <RecentBlogsList>
      <li>
        <StyledLink to="/mountain-pine-ridge-forest-reserve">
          A day in the beautiful Mountain Pine Ridge
        </StyledLink>
      </li>

      <li>
        <StyledLink to="/cahal-pech-maya-ruins">Cahal Pech Maya Ruins</StyledLink>
      </li>
    </RecentBlogsList>
  </Layout>
);

IndexPage.defaultProps = {
  data: PropTypes.shape({
    image: PropTypes.object.isRequired,
  }).isRequired,
};

export const indexQuery = graphql`
  query {
    image: file(relativePath: { eq: "cahal-pech-01.jpg" }) {
      childImageSharp {
        fixed(width: 420, height: 600, quality: 90) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;

export default IndexPage;
