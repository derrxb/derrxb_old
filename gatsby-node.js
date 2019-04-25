/* eslint-disable no-console */
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require(`path`);

// You can delete this file if you're not using it
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    if (node.frontmatter.template) {
      const slug = createFilePath({ node, getNode, basePath: `/pages` });

      if (node.frontmatter.template === 'photography-session') {
        console.log(node);
      }

      createNodeField({
        node,
        name: 'slug',
        value: slug,
      });
    }
  }
};

const getPhotographySessionName = node => {
  if (node.frontmatter.template === 'photography-session') {
    // eslint-disable-next-line no-unused-vars
    const [_, ...sessionName] = node.frontmatter.path;
    return sessionName.join('');
  }

  return '';
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // **Note:** The graphql function call returns a Promise
  await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              path
              template
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      if (node.frontmatter.path == null) {
        return;
      }

      let template = './src/templates/';
      if (node.frontmatter.template === 'photography-session') {
        template += 'PhotographySession.js';
      } else {
        template += 'blogPost.js';
      }

      createPage({
        path: node.frontmatter.path,
        component: path.resolve(template),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.fields.slug,
          photographySession: getPhotographySessionName(node),
        },
      });
    });
  });
};
