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

const templates = {
  'photography-session': 'PhotographySession.js',
};

const getTemplatePath = item => {
  const { template } = item.frontmatter;
  const templatePath = './src/templates';

  if (template) {
    const templateName = templates[template];

    if (templateName) {
      return `${templatePath}/${templateName}`;
    }

    throw new Error(
      `Could not find template for \`${template}\`. Expected \`./src/templates\` to define it.`
    );
  }

  return '';
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // **Note:** The graphql function call returns a Promise
  await graphql(`
    {
      allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___date] }) {
        edges {
          node {
            frontmatter {
              path
              template
              title
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    const stories = result.data.allMarkdownRemark.edges.filter(
      ({ node }) =>
        node.frontmatter.path && node.frontmatter.template === 'photography-session'
    );

    const others = result.data.allMarkdownRemark.edges.filter(
      ({ node }) =>
        node.frontmatter.path && node.frontmatter.template !== 'photography-session'
    );

    stories.forEach(({ node }, index) => {
      createPage({
        path: node.frontmatter.path,
        component: path.resolve(getTemplatePath(node)),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.fields.slug,
          photographySession: getPhotographySessionName(node),
          prev: index === 0 ? null : stories[index - 1].node,
          next: index === stories.length - 1 ? null : stories[index + 1].node,
        },
      });
    });

    others.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: path.resolve(getTemplatePath(node)),
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
