/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { Hero } from '../components/shared/Hero';
import { MarkdownWrapper, H1 } from '../components/shared';

const About = ({ data }) => (
  <Layout>
    <SEO
      title="About Me"
      keywords={['belizean photographer', 'software developer in belize']}
    />

    <Hero>
      <Image fluid={data.about.frontmatter.heroImage.childImageSharp.fluid} />
    </Hero>

    <H1 style={{ marginTop: '1em' }}>
      Hi! I&#39;m Derrick
      <span role="img" aria-label="man using computer and camera">
        👨‍💻📷
      </span>
    </H1>

    <MarkdownWrapper dangerouslySetInnerHTML={{ __html: data.about.html }} />
  </Layout>
);

About.propTypes = {
  data: PropTypes.shape({
    about: PropTypes.object.isRequired,
  }).isRequired,
};

export const aboutMeQuery = graphql`
  query {
    about: markdownRemark(frontmatter: { title: { eq: "about-me" } }) {
      html
      frontmatter {
        heroImage {
          childImageSharp {
            fluid(maxWidth: 2000, quality: 90) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

export default About;
