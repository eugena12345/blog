import { actionTypes } from '../actions/actionTypes';

const initialPostState = {
  id: '',
  title: '',
  imageUrl: '',
  content: '',
  publishedAt: '',
  comments: [],
};

export const postReducer = (state = initialPostState, action) => {
  switch (action.type) {
    case actionTypes.ADD_COMMENT: {
      return {
        ...state,
        comments: [
          ...state.comments,
          action.payload,
        ]
      };
    }
    case actionTypes.REMOVE_COMMENT: {
      return {
        ...state,
        comments: state.comments.filter((comment) => comment.id !== action.payload),
      };
    }
    case actionTypes.SET_POSTDATA: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case actionTypes.RESET_POST_DATA: {
      return initialPostState;
    }

    default:
      return state;
  }
};
