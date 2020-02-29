import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Image from 'gatsby-image';
import Media from './shared/Media';
import { H1 } from './shared';

const ItemWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  width: 340px;
  min-width: 300px;
  min-height: 420px;
  max-height: 420px;
  border-radius: 7px;
  overflow: hidden;
  text-decoration: none;
  box-shadow: 2px 0 15px 4px rgba(137, 132, 132, 0.25);
  margin: 1em 0 1em 0;
  padding-bottom: 1em;

  &:hover {
    transform: translateY(-1px) scale(1.02);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    transition: all ease-out 0.2s;
  }

  &:last-child {
    margin-right: 0em;
  }

  ${Media.lessThan('tablet')`
    margin-right: 0;
    margin-bottom: 1em;
  `};
`;

const Description = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  padding: 0.5em 1em 2em;
  color: #444;
  text-align: center;
`;

const Excerpt = styled.p`
  margin: 0.5em 0;
  padding: 0;
  font-size: 16px;
`;

export const PhotographyItem = ({ frontmatter: { title, path, photo, shortBio } }) => (
  <ItemWrapper to={path}>
    <Image
      style={{ minHeight: '340px', maxHeight: '340px' }}
      fluid={photo.childImageSharp.fluid}
      alt={`Photo of ${title}`}
    />

    <Description>
      <H1 as="h2" style={{ fontSize: '1.2em', marginBottom: '0', letterSpacing: '0' }}>
        {title}
      </H1>

      <Excerpt>{shortBio}</Excerpt>
    </Description>
  </ItemWrapper>
);

PhotographyItem.propTypes = {
  frontmatter: PropTypes.shape({
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    shortBio: PropTypes.string,
    photo: PropTypes.object.isRequired,
  }).isRequired,
};

export default PhotographyItem;
