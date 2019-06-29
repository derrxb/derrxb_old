/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Image from 'gatsby-image';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { Hero } from '../components/shared/Hero';

const AboutWrapper = styled.div`
  a {
    text-decoration: none;
    color: rgb(0, 32, 66);
    font-weight: 550;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const About = ({ data }) => (
  <Layout>
    <SEO
      title="About Me"
      keywords={['belizean photographer', 'software developer in belize']}
    />

    <Hero
      style={{
        height: 'auto',
        maxHeight: '480px',
        overflow: 'hidden',
        paddingBottom: '1em',
      }}
    >
      <Image fluid={data.about.frontmatter.heroImage.childImageSharp.fluid} />
    </Hero>

    <AboutWrapper dangerouslySetInnerHTML={{ __html: data.about.html }} />
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
