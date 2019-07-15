import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Spring, config } from 'react-spring/renderprops.cjs';
import Modal from 'react-modal';
import Media from '../shared/Media';
import { NavOption } from './index';

const Menu = styled.button`
  background: #ffae01;
  color: black;
  border-radius: 3px;
  font-size: 12px;
  font-weight: 700;
  width: 64px;
  padding: 0.5em;
  outline: none;
  border: none;
  display: none;
  text-align: center;

  &:focus {
    outline: none;
  }
  ${Media.lessThan('laptop')`
    display: block;
  `};
`;

const NavDropdownHeader = styled.li`
  display: flex !important;
  align-items: center;
  background: #ffae01 !important;

  h4 {
    color: white;
    margin: 0;
    padding: 0.5em 1em;
  }
`;

const NavDropdown = styled.ul`
  list-style: none;
  margin: 0 0 0.5em 0;
  padding: 0;
  width: 100%;

  li {
    display: block;
    width: 100%;
    height: 48px;
    margin-left: none;
    padding-left: none;
    margin: 0;
    &:nth-of-type(odd) {
      background: #eee;
    }
  }
`;

const ModalStyle = {
  overlay: {
    zIndex: 5,
    background: 'rgba(14,30,37,.54)',
  },
  content: {
    height: 'fit-content',
    width: 'calc(100% - 80px)',
    padding: 0,
    border: 'none',
    borderRadius: '10px',
  },
};

const NavModal = props => {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <React.Fragment>
      <Menu onClick={() => setShowModal(!showModal)}>Menu</Menu>

      {showModal && (
        <Spring
          from={{ transform: 'scale(0)', opacity: 0 }}
          to={{ transform: 'scale(1)', opacity: 1 }}
          config={config.stiff}
        >
          {({ opacity, transform }) => (
            <Modal
              isOpen={showModal}
              style={{
                overlay: {
                  ...ModalStyle.overlay,
                  zIndex: '200',
                  opacity,
                },
                content: {
                  ...ModalStyle.content,
                  transform,
                },
              }}
              onRequestClose={() => setShowModal(false)}
              contentLabel="Site Menu"
            >
              <NavDropdown data-testid="menu-nav-modal">
                <NavDropdownHeader>
                  <h4>Menu</h4>
                </NavDropdownHeader>

                {props.links.map(item => (
                  <li key={`${item.name}-${item.to}`}>
                    <NavOption
                      {...props}
                      nature="default"
                      data-testid="modal-nav-link"
                      to={item.to}
                    >
                      {item.name}
                    </NavOption>
                  </li>
                ))}
              </NavDropdown>
            </Modal>
          )}
        </Spring>
      )}
    </React.Fragment>
  );
};

NavModal.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default NavModal;
