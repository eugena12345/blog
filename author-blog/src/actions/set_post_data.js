import { actionTypes } from './actionTypes';

export const setPostData = (postData) => {
  return {
    type: actionTypes.SET_POSTDATA,
    payload: postData,
  };
};
