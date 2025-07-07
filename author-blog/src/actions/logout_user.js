import { request } from '../components/utils/request';
import { actionTypes } from './actionTypes';

export const logoutUser = () => {
  request('/api/logout', 'POST', )
  return {
    type: actionTypes.LOGOUT_USER,
  };
};
