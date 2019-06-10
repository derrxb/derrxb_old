/* eslint-disable no-confusing-arrow */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTransition, animated } from 'react-spring';
import useKey from 'react-use/lib/useKey';
import { MdClose, MdChevronRight, MdChevronLeft } from 'react-icons/md';

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
  font-size: 1.8em;
  border-radius: 4px;
  margin: auto 1em auto auto;
  position: absolute;
  top: 0.5em;
  left: 95%;
  right: -15px;

  &:hover {
    background: #dee5e5;
    transition: all 0.2s;
  }
`;

const ArrowWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-items: center;
  width: 40px;
  height: 40px;
  outline: none;
  border: none;
  border-radius: 4px;
  top: 45vh;

  &:hover {
    background: #ddd;
  }
`;

const LeftArrow = styled(ArrowWrapper)`
  position: absolute;
  margin-left: 1em;
`;

const RightArrow = styled(ArrowWrapper)`
  position: absolute;
  right: 0;
  margin-right: 1em;
`;

const Arrow = styled.div`
  font-size: 2em;
`;

const initialState = {
  isOpen: false,
  currentImage: 0,
  images: 0,
};

const lightShowReducer = (state, action) => {
  window.console.log('Action: ', action);
  window.console.log('State: ', state);

  switch (action.type) {
    case 'NEXT_IMAGE':
      return {
        ...state,
        currentImage: (state.currentImage + 1) % state.images.length,
      };
    case 'PREV_IMAGE':
      return {
        ...state,
        currentImage:
          (state.currentImage - 1 + state.images.length) % state.images.length,
      };
    case 'RESET':
      return initialState;
    default:
      throw new Error(`Unknown Action: ${action.type}`);
  }
};

const useLightShow = (images, options) => {
  const [state, dispatch] = React.useReducer(lightShowReducer, {
    ...initialState,
    ...options,
    images,
  });

  const next = () => dispatch({ type: useLightShow.types.next });
  const prev = () => dispatch({ type: useLightShow.types.prev });
  const reset = () => dispatch({ type: useLightShow.types.reset });

  return { state, next, prev, reset };
};

useLightShow.types = {
  next: 'NEXT_IMAGE',
  prev: 'PREV_IMAGE',
  reset: 'RESET',
};

const LightShow = ({ isOpen, currentImage, images, closeLightShow }) => {
  const { state, next, prev, reset } = useLightShow(images, { isOpen, currentImage });

  const transitions = useTransition(isOpen, null, {
    from: { position: 'fixed', opacity: 0, transform: 'translate3d(0, 0, 0)' },
    enter: {
      opacity: 1,
      background: 'white',
      width: '100%',
      height: '100%',
      top: '0',
      left: '0',
      overflow: 'hidden',
      transform: 'translate3d(0,0,100%)',
    },
    leave: { opacity: 0, transform: 'translate3d(0,0,0)' },
  });

  const close = () => {
    reset();
    closeLightShow();
  };

  useKey('Escape', close);
  useKey('ArrowLeft', () => prev());
  useKey('ArrowRight', () => next());

  if (!isOpen) {
    return null;
  }

  return transitions.map(({ item, key, props }) =>
    item ? (
      <animated.div style={props} key={key}>
        <Wrapper>
          <CloseIcon onClick={close} />

          <LeftArrow onClick={prev}>
            <Arrow as={MdChevronLeft} />
          </LeftArrow>

          <RightArrow onClick={next}>
            <Arrow as={MdChevronRight} />
          </RightArrow>

          <img
            alt="light-box"
            src={images[state.currentImage].image.childImageSharp.original.src}
            style={{ margin: 'auto', maxHeight: 'calc(100vh - 180px)' }}
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
