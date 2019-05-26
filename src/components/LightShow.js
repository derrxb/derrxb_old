/* eslint-disable no-confusing-arrow */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTransition, animated } from 'react-spring';
import useKey from 'react-use/lib/useKey';
import { MdClose } from 'react-icons/md';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  position: fixed;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: transparent;
`;

const CloseIcon = styled(MdClose)`
  font-size: 1.9em;
  border-radius: 4px;
  margin: auto 1em auto auto;
  position: absolute;
  top: 0.5em;
  left: 95%;
  right: -15px;

  &:hover {
    background: #ddd;
    transition: all 0.2s;
  }
`;

const initialState = {
  isOpen: false,
  currentImage: 0,
};

const lightShowReducer = (state, action) => {
  switch (action.type) {
    case 'NEXT_IMAGE': {
      return {
        ...state,
        currentImage: action.payload,
      };
    }
    default:
      throw new Error(`Unknown Action: ${action.type}`);
  }
};

const LightShow = ({ isOpen, currentImage, images, closeLightShow }) => {
  const [state, dispatch] = React.useReducer(lightShowReducer, {
    ...initialState,
    isOpen,
    currentImage,
  });

  const transitions = useTransition(isOpen, null, {
    from: { position: 'fixed', opacity: 0, transform: 'translate3d(0, 100%, 0)' },
    enter: {
      opacity: 1,
      background: 'white',
      width: '100%',
      height: '100%',
      top: '0',
      left: '0',
      overflow: 'hidden',
      transform: 'translate3d(0,0,0)',
    },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  });

  useKey('Escape', () => {
    closeLightShow();
  });

  return transitions.map(({ item, key, props }) =>
    item ? (
      <animated.div style={props} key={key}>
        <Wrapper>
          <CloseIcon onClick={closeLightShow} />
          <img
            src={images[currentImage].image.childImageSharp.original.src}
            style={{ margin: 'auto', maxHeight: 'calc(100vh - 140px)' }}
          />
        </Wrapper>
      </animated.div>
    ) : null
  );
};

LightShow.propTypes = {
  isOpen: PropTypes.bool,
  currentImage: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  closeLightShow: PropTypes.func.isRequired,
};

export default LightShow;
