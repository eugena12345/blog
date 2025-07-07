import { actionTypes } from './actionTypes';

export const removeComment = (commentId) => {
  return {
    type: actionTypes.REMOVE_COMMENT,
    payload: commentId
  };
};
