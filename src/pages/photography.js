import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import Image from 'gatsby-image';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Media from '../components/shared/Media';
import { H1, Paragraph } from '../components/shared';

export const RecentBlogsList = styled.ul`
  margin: 0;
  list-style: none;
`;

const Post = styled(Link)`
  display: flex;
  flex-direction: column;
  width: auto;
  height: auto;
  overflow: hidden;
  word-wrap: break-word;
  align-items: center;
  align-self: center;
  outline: none;
  text-decoration: none;
  box-shadow: 0 0 10px 2px rgba(0, 32, 66, 0.05);
  transition: box-shadow 0.8s;
  border-radius: 7px;
  padding: 0 0 1em 0;
  margin-bottom: 2em;

  &:visited {
    outline: none;
    color: white;
  }

  &:hover {
    box-shadow: 0 0 10px 4px rgba(0, 32, 66, 0.2);
    transition: box-shadow 0.4s;
  }

  ${Media.lessThan('laptop')`
    width: 360px;
  `};
`;

const Heading = styled.h2`
  margin: 0.5em 0 0;
  font-weight: 700;
  letter-spacing: 0.8;
  font-size: 1.2em;

  ${Media.lessThan('laptop')`
    text-align: center;
  `};
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: center;
  margin: 0 auto 3em;

  ${Media.greaterThan('largeLaptop')`
    width: 1000px;
  `};

  ${Media.lessThan('laptop')`
    width: 100%;
    margin: 0;
  `};

  ${Media.lessThan('tablet')`
    flex-direction: column;
  `}
`;

const IndexPage = ({ data: { posts } }) => (
  <Layout>
    <SEO title="Home" keywords={[`belize photography`, `explore belize`, `belize`]} />

    <H1>PHOTOGRAPHY</H1>

    <Paragraph>
      A collection of my favorite photos from various shenanigans with friends. I hope you
      enjoy these photos as much as I did taking them.
    </Paragraph>

    {posts.nodes.map((post, index) => {
      if (index % 2 === 0) {
        const secondPost = posts.nodes[index + 1];

        return (
          <Wrapper key={post.frontmatter.title}>
            <Post key={post.frontmatter.title} to={post.frontmatter.path}>
              <Image fixed={post.frontmatter.previewImage.childImageSharp.fixed} />
              <Heading>{`${post.frontmatter.title} ${post.frontmatter.emoji}`}</Heading>
            </Post>

            {typeof secondPost !== 'undefined' && (
              <Post key={secondPost.frontmatter.title} to={secondPost.frontmatter.path}>
                <Image
                  fixed={secondPost.frontmatter.previewImage.childImageSharp.fixed}
                />
                <Heading>
                  {`${secondPost.frontmatter.title} ${secondPost.frontmatter.emoji}`}
                </Heading>
              </Post>
            )}
          </Wrapper>
        );
      }

      return null;
    })}
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
      limit: 6
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
              fixed(width: 420, height: 500, quality: 80) {
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
