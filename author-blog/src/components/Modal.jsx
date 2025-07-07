import React from 'react';
import styled from 'styled-components';
import {
  selectModalText,
  selectModalIsOpen,
  selectModalOnClose,
  selectModalOnDelete,
} from './../selectors';
import { useSelector } from 'react-redux';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); 
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1000; 
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff; 
  border: 2px solid #6c5ce7; 
  border-radius: 10px;
  padding: 30px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ModalTitle = styled.h2`
  color: #6c5ce7;
  font-size: 20px;
  margin-bottom: 20px;
  text-align: center;
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const ModalButton = styled.button`
  width: 100px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const DeleteButton = styled(ModalButton)`
  background-color: #e74c3c;
  color: #ffffff;
`;

const CancelButton = styled(ModalButton)`
  background-color: #6c5ce7; 
  color: #ffffff;
`;

const Modal = () => {
  const text = useSelector(selectModalText);
  const isOpen = useSelector(selectModalIsOpen);
  const onClose = useSelector(selectModalOnClose);
  const onDelete = useSelector(selectModalOnDelete);

  if (!isOpen) return null;

  return (
    <ModalOverlay isOpen={isOpen}>
      <ModalContainer>
        <ModalTitle>{text}</ModalTitle>

        <ModalButtons>
          <DeleteButton onClick={onDelete}>Да</DeleteButton>
          <CancelButton onClick={onClose}>Отмена</CancelButton>
        </ModalButtons>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
