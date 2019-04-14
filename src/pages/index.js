import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import Layout from '../components/layout';
import SEO from '../components/seo';

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
      <h3>Hi, I build things</h3>
      <Image fixed={data.image.childImageSharp.fixed} />
    </div>
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
