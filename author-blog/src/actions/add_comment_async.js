import { request } from '../components/utils/request';
import { addComment } from './add_comment';
import { setPostData } from './set_post_data';

export const addCommentAsync =
  ( postId, content) => (dispatch) => {
    //serverRequest('addComment', authorId, postId, newComment)
    request(`/api/posts/${postId}/comments`, 'POST', {content})
    .then(
      (comment) => {
        dispatch(addComment(comment.data));
      }
    );
  };
