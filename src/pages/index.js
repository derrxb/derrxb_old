import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { RecentBlogsList } from './photography';

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
          <Link to="/mountain-pine-ridge-forest-reserve">
            A day in the beautiful Mountain Pine Ridge
          </Link>
        </li>

        <li>
          <Link to="/cahal-pech-maya-ruins">Cahal Pech Maya Ruins</Link>
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
