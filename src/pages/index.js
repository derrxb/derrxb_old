import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { RecentBlogsList, StyledLink } from './photography';

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" keywords={[`belize photography`, `explore belize`]} />

    <div
      style={{
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h2>Hi! I build things and take pictures.</h2>

      <h3>Recent</h3>

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
    </div>
  </Layout>
);

IndexPage.defaultProps = {
  data: PropTypes.shape({
    image: PropTypes.object.isRequired,
  }).isRequired,
};

export default IndexPage;
