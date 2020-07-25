/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React from 'react';
import { graphql, Link as NoStyleLink } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import styled from 'styled-components';
import Gallery from 'react-photo-gallery';
import { useTransition, animated } from 'react-spring';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Media from '../components/shared/Media';

const TitleWrapper = styled(animated.div)`
  padding-bottom: 5em;
  position: absolute;
  z-index: 100;
  justify-self: center;
  align-self: center;

  ${Media.lessThan('tablet')`
    padding-bottom: 1em;
  `};
`;

const Title = styled(NoStyleLink)`
  font-family: 'Oswald' !important;
  font-size: 3em;
  color: #fcd307;
  letter-spacing: 9px;
  text-transform: uppercase;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  ${Media.lessThan('tablet')`
    text-decoration: underline;
    font-size: 2em;
    padding-bottom: 1em;
  `};

  ${Media.greaterThan('bigMonitor')`
    font-size: 4em;
  `};
`;

const Image = ({ photo, ...rest }) => {
  const transitions = useTransition(null, p => p, {
    from: { opacity: 0, transform: 'translate3d(0,100%,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  });

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      {transitions.map(({ props, key }) => (
        <TitleWrapper key={key} style={props}>
          <Title to={photo.title === 'Photography' ? '/photography' : '/software'}>
            {photo.title}
          </Title>
        </TitleWrapper>
      ))}

      <GatsbyImage fluid={photo} />
    </div>
  );
};

Image.propTypes = {
  photo: PropTypes.shape({
    src: PropTypes.string.isRequired,
    srcSet: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    base64: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

const PhotographyItemWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  background: black;
  flex-wrap: wrap;
  max-width: 100%;
  width: 100%;
  align-self: center;
  height: 100%;
  overflow: hidden;

  ${Media.lessThan('tablet')`
    flex-direction: column;
    align-items: center;
  `};
`;

const PhotoWrapper = styled.div`
  width: 50%;
  height: 100%;

  ${Media.lessThan('tablet')`
    width: 100%;
  `};
`;

const IndexPage = ({ data }) => (
  <Layout header="fixed" margin={false}>
    <SEO
      title="Home"
      keywords={[
        `belize photography`,
        `explore belize`,
        `software`,
        `software development`,
      ]}
    />

    <PhotographyItemWrapper>
      <PhotoWrapper>
        <Image photo={data.photography.childImageSharp.fluid} />
      </PhotoWrapper>

      <PhotoWrapper>
        <Image photo={data.software.childImageSharp.fluid} />
      </PhotoWrapper>
    </PhotographyItemWrapper>
  </Layout>
);

IndexPage.propTypes = {
  data: PropTypes.shape({
    software: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.object,
      }),
    }),
    photography: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.object,
      }),
    }),
  }).isRequired,
};

export const aboutMeQuery = graphql`
  query {
    software: file(relativePath: { eq: "software-jefferson.jpeg" }) {
      childImageSharp {
        fluid(maxWidth: 2000, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    photography: file(
      relativePath: { eq: "photography/cahal-pech/images/cahal-pech-04.jpg" }
    ) {
      childImageSharp {
        fluid(maxWidth: 2000, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export default IndexPage;
