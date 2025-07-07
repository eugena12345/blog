import { request } from '../components/utils/request';
import { addComment } from './add_comment';

export const addCommentAsync =
  ( postId, content) => (dispatch) => {
    request(`/api/posts/${postId}/comments`, 'POST', {content})
    .then(
      (comment) => {
        dispatch(addComment(comment.data));
      }
    );
  };
