import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GatsbyImage from 'gatsby-image';

const Wrapper = styled.button`
  margin: 0;
  border: 0;
  outline: 0;
  padding: 0;
  display: flex;
  border: 2px solid rgb(250, 250, 250);

  :hover {
    cursor: pointer;
  }
`;

const Image = ({ photo, ...rest }) => (
  <Wrapper onClick={e => rest.onClick(e, rest)}>
    <GatsbyImage fixed={photo} />
  </Wrapper>
);

Image.propTypes = {
  photo: PropTypes.shape({
    src: PropTypes.string.isRequired,
    srcSet: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    base64: PropTypes.string.isRequired,
  }).isRequired,
};

export default Image;
