import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import Image from 'gatsby-image';
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

const Session = styled(Link)`
  display: flex;
  flex-direction: column;
  width: auto;
  height: auto;
  padding: 1.5em 1em;
  overflow: hidden;
  word-wrap: break-word;
  align-items: center;
  align-self: center;
  outline: none;
  text-decoration: none;
  background: white;
  border-radius: 5px;
  box-shadow: 0 0 10px 2px rgba(0, 32, 66, 0.01);

  &:visited {
    outline: none;
    color: white;
  }
`;

const Heading = styled.h3`
  margin: 0.5em 0 0;
  font-weight: 500;
  font-size: 1.2em;
`;

const Emoji = styled.span`
  font-size: 1.5em;
  margin: 0.5em;
  align-self: center;
`;

const IndexPage = ({ data: { posts } }) => (
  <Layout>
    <SEO title="Home" keywords={[`belize photography`, `explore belize`, `belize`]} />

    {posts.nodes.map(post => (
      <React.Fragment>
        <Session key={post.frontmatter.title} to={post.frontmatter.path}>
          <Image fixed={post.frontmatter.previewImage.childImageSharp.fixed} />
          <Heading>{post.frontmatter.title}</Heading>
        </Session>

        <Emoji>{post.frontmatter.emoji}</Emoji>
      </React.Fragment>
    ))}
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
      limit: 5
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
              fixed(width: 400, height: 500, quality: 80) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`;

export default IndexPage;
