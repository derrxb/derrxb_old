/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import Gallery from 'react-photo-gallery';
import GatsbyImage from 'gatsby-image';
import styled from 'styled-components';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Image from '../components/image';
import { H1, MarkdownWrapper } from '../components/shared';
import LightBox from '../components/LightBox';
import { Hero } from '../components/shared/Hero';
import Media from '../components/shared/Media';

const BodyWrapper = styled.div`
  margin: 0 10em;

  ${Media.lessThan('tablet')`
    margin: 0 5em;
  `};

  ${Media.lessThan('mobile')`
    margin: 0 2em;
  `};
`;

const PaginationWrapper = styled.div`
  display: flex;
  margin: 0em 0 1em 0;
`;

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 320px;
`;

const StyledLink = styled(Link)`
  display: flex;
  font-family: 'Oswald' !important;
  font-size: 1.2em;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  border: none;
  background: none;
  color: rgb(136, 136, 136);
  text-decoration: none;
  padding: 1em;

  &:hover {
    color: rgb(2, 2, 2);
  }
`;

/**
 * Formats an Gatsby image object according to React-Gallery's requirements.
 * @param {Object} image - A fixed Gatsby image.
 */
const gatsbyFixedImageForGallery = image => {
  const { src, srcSet, base64, height, width } = image;

  return {
    src,
    srcSet,
    base64,
    width,
    height,
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

const PhotographySession = ({
  data: {
    allYaml: { nodes },
  },
  data,
  pageContext,
}) => {
  const images = typeof nodes[0].images === 'undefined' ? [] : nodes[0].images;
  const galleryImages = images.map(c =>
    gatsbyFixedImageForGallery(c.childImageSharp.fixed)
  );
  const lightBoxImages = images.map(c =>
    gatsbyFluidImageForLightBox(c.childImageSharp.fluid)
  );

  const [currentItem, setCurrentItem] = React.useState(0);
  const [showLightShow, setShowLightShow] = React.useState(false);
  const launchLightShow = index => {
    setCurrentItem(index);
    setShowLightShow(true);
    document.body.classList.add('fixed-for-lightshow');
  };
  const closeLightShow = () => {
    setShowLightShow(false);
    document.body.classList.remove('fixed-for-lightshow');
  };

  return (
    <Layout margin>
      <SEO
        title={`${data.main.frontmatter.emoji} ${data.main.frontmatter.title}`}
        keywords={[`belize photography`, `explore belize`, data.main.frontmatter.title]}
      />

      <Hero>
        <GatsbyImage fluid={data.main.frontmatter.heroImage.childImageSharp.fluid} />
      </Hero>

      <BodyWrapper>
        <H1
          style={{ textTransform: 'uppercase', marginTop: '1em', marginBottom: '0.5em' }}
        >
          {`${data.main.frontmatter.title} ${data.main.frontmatter.emoji}`}
        </H1>

        <MarkdownWrapper dangerouslySetInnerHTML={{ __html: data.main.html }} />

        <Gallery
          photos={galleryImages}
          // targetRowHeight={720}
          renderImage={Image}
          limitNodeSearch={2}
          onClick={(_, selectedItem) => launchLightShow(selectedItem.index)}
        />

        <PaginationWrapper>
          {pageContext.next ? (
            <Wrapper>
              <StyledLink to={pageContext.next ? pageContext.next.frontmatter.path : ''}>
                Previous
              </StyledLink>
            </Wrapper>
          ) : null}

          {pageContext.prev ? (
            <Wrapper>
              <StyledLink to={pageContext.prev ? pageContext.prev.frontmatter.path : ''}>
                Next
              </StyledLink>
            </Wrapper>
          ) : null}
        </PaginationWrapper>
      </BodyWrapper>

      <LightBox
        currentImage={currentItem}
        images={lightBoxImages}
        show={showLightShow}
        close={closeLightShow}
      />
    </Layout>
  );
};

PhotographySession.propTypes = {
  data: PropTypes.shape({
    main: PropTypes.object.isRequired,
    allYaml: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          images: PropTypes.arrayOf(
            PropTypes.shape({
              childImageSharp: PropTypes.object.isRequired,
            })
          ),
        })
      ),
    }).isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    prev: PropTypes.shape({
      frontmatter: PropTypes.shape({
        path: PropTypes.string.isRequired,
      }),
    }),
    next: PropTypes.shape({
      frontmatter: PropTypes.shape({
        path: PropTypes.string.isRequired,
      }),
    }),
  }),
};

PhotographySession.defaultProps = {
  pageContext: {
    prev: null,
    next: null,
  },
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

    allYaml(filter: { name: { eq: $photographySession } }) {
      nodes {
        images {
          childImageSharp {
            fixed(quality: 70, height: 900) {
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
`;

export default PhotographySession;
