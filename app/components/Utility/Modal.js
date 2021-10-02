import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.9);

    #modal {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 520px;
      max-width: 100%;
      margin: 50px auto 0;
      padding: 25px 0 50px;
      background-color: #FFF;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.04),
        -6px 8px 15px rgba(0, 0, 0, 0.04), 6px 8px 15px rgba(0, 0, 0, 0.04);
    }
`;

const Modal = props => {
  return props.show ? (
    <ModalContainer onClick={props.toggleModal}>
      <div id="modal" onClick={e => e.stopPropagation()}>
        {props.children}
      </div>
    </ModalContainer>
  ) : null;
};

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  show: PropTypes.bool.isRequired
};

export default Modal;
