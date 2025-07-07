import { actionTypes } from './actionTypes';

export const openModal = (modalData) => {
  return {
    type: actionTypes.OPEN_MODAL,
    payload: modalData,
  };
};
