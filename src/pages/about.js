/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/layout';
import SEO from '../components/seo';

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
      title="about-me"
      keywords={['belizean photographer', 'software developer in belize']}
    />

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
    }
  }
`;

export default About;
