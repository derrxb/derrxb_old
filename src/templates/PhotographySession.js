import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Gallery from 'react-photo-gallery';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Image from '../components/image';

const Header = styled.div`
  color: #333333;
  font-size: 1.7em;
  font-weight: 700;
`;

const About = styled.div`
  p {
    line-height: 28px;
    font-size: 1em;
    margin: 0.5em 0 1em;
  }
`;

const PhotographySession = ({ data }) => {
  const images =
    typeof data.images.nodes[0] !== 'undefined' ? data.images.nodes[0].images : [];
  const imagesFormattedForGallery = images.map(c => {
    const { src, srcSet, width, height, base64 } = c.image.childImageSharp.fixed;

    return {
      src,
      srcSet,
      width,
      height,
      base64,
    };
  });

  return (
    <Layout>
      <SEO
        title={`${data.main.frontmatter.emoji} ${data.main.frontmatter.title}`}
        keywords={[`belize photography`, `explore belize`, data.main.frontmatter.title]}
      />

      <Header>{`${data.main.frontmatter.title} ${data.main.frontmatter.emoji}`}</Header>

      <About dangerouslySetInnerHTML={{ __html: data.main.html }} />

      <Gallery
        photos={imagesFormattedForGallery}
        renderImage={Image}
        onClick={() => {}}
      />
    </Layout>
  );
};

PhotographySession.propTypes = {
  data: PropTypes.shape({
    main: PropTypes.object.isRequired,
    images: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          image: PropTypes.arrayOf(
            PropTypes.shape({
              childImageSharp: PropTypes.object.isRequired,
            })
          ),
        })
      ),
    }).isRequired,
  }).isRequired,
};

export const photographyQuery = graphql`
  query SessionPage($path: String!, $photographySession: String!) {
    main: markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        date
        title
        path
        emoji
      }
    }

    images: allJson(
      filter: { images: { elemMatch: { title: { eq: $photographySession } } } }
    ) {
      nodes {
        images {
          image {
            childImageSharp {
              fixed(quality: 80) {
                ...GatsbyImageSharpFixed
              }
              original {
                width
                height
                src
              }
            }
          }
        }
      }
    }
  }
`;

export default PhotographySession;