import React from 'react';
import PropTypes from 'prop-types';
import Carousel, { Modal, ModalGateway } from 'react-images';

const LightBox = ({ images, show, close, currentImage }) => (
  <ModalGateway>
    {show ? (
      <Modal onClose={close}>
        <Carousel views={images} currentIndex={currentImage} />
      </Modal>
    ) : null}
  </ModalGateway>
);

LightBox.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentImage: PropTypes.number.isRequired,
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default LightBox;
