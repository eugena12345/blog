import { actionTypes } from './actionTypes';

export const addComment = (comment) => {
  return {
    type: actionTypes.ADD_COMMENT,
    payload: comment
  };
};
