import { actionTypes } from '../actions/actionTypes';
import { ROLEIDS } from '../constants/roleId';
const initialUserState = {
  session: null,
  id: null,
  login: null,
  roleId: ROLEIDS.GUEST,
};

export const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER: {
      return {
        ...state,
        // session: action.payload.session,
        id: action.payload.id,
        login: action.payload.login,
        roleId: action.payload.role,
      };
    }
    case actionTypes.LOGOUT_USER: {
      return initialUserState;
    }

    default:
      return state;
  }
};
