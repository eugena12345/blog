import { actionTypes } from '../actions/actionTypes';

const initialAppState = {
  wasLogout: false,
  modal: {
    text: '',
    isOpen: false,
    onClose: () => {},
    onDelete: () => {},
  },
};

export const appReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case actionTypes.LOGOUT_USER: {
      return {
        ...state,
        wasLogout: !state.wasLogout,
      };
    }
    case actionTypes.OPEN_MODAL: {
      return {
        ...state,
        modal: action.payload,
      };
    }
    case actionTypes.CLOSE_MODAL: {
      return {
        ...initialAppState,
      };
    }

    default:
      return state;
  }
};
