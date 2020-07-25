/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Media from '../components/shared/Media';
import { H1, Paragraph } from '../components/shared';
import Photo from '../components/PhotographyItem';

export const RecentBlogsList = styled.ul`
  margin: 0;
  list-style: none;
`;

export const PhotographyItemWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  max-width: 100%;
  width: 100%;
  align-self: center;
  margin-bottom: 4em;

  ${Media.lessThan('tablet')`
    flex-direction: column;
    align-items: center;
    margin-bottom: 2em;
  `};
`;

const IndexPage = ({ data: { posts } }) => (
  <Layout>
    <SEO title="Home" keywords={[`belize photography`, `explore belize`, `belize`]} />

    <H1>PHOTOGRAPHY</H1>

    <Paragraph>
      A collection of my favorite photos from various shenanigans with friends. I hope you
      enjoy these photos as much as I did taking them.
    </Paragraph>

    <PhotographyItemWrapper>
      {posts.nodes.map(post => (
        <Photo
          key={post.frontmatter.title}
          frontmatter={{
            ...post.frontmatter,
            photo: post.frontmatter.previewImage,
            title: `${post.frontmatter.title} ${post.frontmatter.emoji}`,
          }}
        />
      ))}
    </PhotographyItemWrapper>
  </Layout>
);

IndexPage.propTypes = {
  data: PropTypes.shape({
    posts: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          frontmatter: PropTypes.shape({
            title: PropTypes.string,
            emoji: PropTypes.string,
            previewImage: PropTypes.object,
            path: PropTypes.string.isRequired,
          }),
        })
      ),
    }),
  }).isRequired,
};

export const indexQuery = graphql`
  query {
    posts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { type: { eq: "photography-session" } } }
    ) {
      nodes {
        frontmatter {
          title
          emoji
          path
          previewImage {
            childImageSharp {
              fluid(quality: 80) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;

export default IndexPage;
