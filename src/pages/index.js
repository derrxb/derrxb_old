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
  padding-bottom: 4em;
  position: absolute;
  z-index: 100;
  justify-self: center;
  align-self: center;

  ${Media.lessThan('tablet')`
    padding-bottom: 1em;
  `};
`;

const Title = styled(NoStyleLink)`
  font-family: 'Just Another Hand' !important;
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
        overflow: 'hidden',
      }}
    >
      {transitions.map(({ props, key }) => (
        <TitleWrapper key={key} style={props}>
          <Title to={photo.title === 'Photography' ? '/photography' : '/software'}>
            {photo.title}
          </Title>
        </TitleWrapper>
      ))}

      <GatsbyImage fixed={photo} />
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

const IndexPage = ({ data }) => {
  const galleryImages = [
    {
      ...data.photography.childImageSharp.fixed,
      width: 5,
      height: 5.75,
      title: 'Photography',
    },
    { ...data.software.childImageSharp.fixed, width: 5, height: 5.75, title: 'Software' },
  ];

  return (
    <Layout header="fixed" margin={false} footer={false}>
      <SEO
        title="Home"
        keywords={[
          `belize photography`,
          `explore belize`,
          `software`,
          `software development`,
        ]}
      />

      <Gallery photos={galleryImages} renderImage={Image} />
    </Layout>
  );
};

IndexPage.defaultProps = {
  data: PropTypes.shape({
    software: PropTypes.object.isRequired,
    photography: PropTypes.object.isRequired,
  }).isRequired,
};

export const aboutMeQuery = graphql`
  query {
    software: file(relativePath: { eq: "software-jefferson.jpeg" }) {
      childImageSharp {
        fixed(width: 720, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }

    photography: file(
      relativePath: { eq: "photography/cahal-pech/images/cahal-pech-04.jpg" }
    ) {
      childImageSharp {
        fixed(width: 720, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;

export default IndexPage;
