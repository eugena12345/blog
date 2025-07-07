import { removeComment } from './remove_comment';
import { request } from '../components/utils/request';

export const removeCommentAsync =
  (postId, commentId) => (dispatch) => {
    request(`/api/posts/${postId}/comments/${commentId}`, 'DELETE')
      .then(
        () => {
          dispatch(removeComment(commentId));
        }
      );
  };
