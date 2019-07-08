import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Gallery from 'react-photo-gallery';
import GatsbyImage from 'gatsby-image';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Image from '../components/image';
import { H1, MarkdownWrapper } from '../components/shared';
import LightBox from '../components/LightBox';
import { Hero } from '../components/shared/Hero';

/**
 * Formats an Gatsby image object according to React-Gallery's requirements.
 * @param {Object} image - A fixed Gatsby image.
 */
const gatsbyFixedImageForGallery = (image, width = 5, height = 4) => {
  const { src, srcSet, base64 } = image;

  return {
    src,
    srcSet,
    width,
    height,
    base64,
  };
};

/**
 * Formats an Gatsby image object according to the LightBox's requirements.
 * @param {Object} image - A fixed Gatsby image.
 */
const gatsbyFluidImageForLightBox = image => ({
  src: image.src,
  srcSet: image.srcSet,
});

const PhotographySession = ({ data }) => {
  const images =
    typeof data.images.nodes[0] !== 'undefined' ? data.images.nodes[0].images : [];
  const galleryImages = images.map(c =>
    gatsbyFixedImageForGallery(c.image.childImageSharp.fixed)
  );
  const lightBoxImages = images.map(c =>
    gatsbyFluidImageForLightBox(c.image.childImageSharp.fluid)
  );

  const [currentItem, setCurrentItem] = React.useState(0);
  const [showLightShow, setShowLightShow] = React.useState(false);
  const launchLightShow = index => {
    setCurrentItem(index);
    setShowLightShow(true);
  };

  return (
    <Layout margin footer={false}>
      <SEO
        title={`${data.main.frontmatter.emoji} ${data.main.frontmatter.title}`}
        keywords={[`belize photography`, `explore belize`, data.main.frontmatter.title]}
      />

      <Hero
        style={{
          height: 'auto',
          maxHeight: '480px',
          overflow: 'hidden',
          paddingBottom: '1em',
        }}
      >
        <GatsbyImage fluid={data.main.frontmatter.heroImage.childImageSharp.fluid} />
      </Hero>

      <H1 style={{ textTransform: 'uppercase' }}>
        {`${data.main.frontmatter.title} ${data.main.frontmatter.emoji}`}
      </H1>

      <MarkdownWrapper dangerouslySetInnerHTML={{ __html: data.main.html }} />

      <Gallery
        photos={galleryImages}
        renderImage={Image}
        onClick={(_, selectedItem) => launchLightShow(selectedItem.index)}
      />

      <LightBox
        currentImage={currentItem}
        images={lightBoxImages}
        show={showLightShow}
        close={() => setShowLightShow(false)}
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
        heroImage {
          childImageSharp {
            fluid(maxWidth: 2000, quality: 90) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }

    images: allJson(
      filter: { images: { elemMatch: { title: { eq: $photographySession } } } }
    ) {
      nodes {
        images {
          image {
            childImageSharp {
              fixed(quality: 90, height: 400) {
                ...GatsbyImageSharpFixed
              }
              fluid(maxWidth: 2000, quality: 90) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;

export default PhotographySession;
