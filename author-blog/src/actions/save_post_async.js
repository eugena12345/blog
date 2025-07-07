import { setPostData } from './set_post_data';
import { request } from './../components/utils/request';

export const savePostAsync =
  (postId, newPostData) => (dispatch) => {
    const saveRequest = postId
      ? request(`/api/posts/${postId}`, 'PATCH', newPostData)
      : request('/api/posts', 'POST', newPostData);

    return saveRequest.then(
      (updatedPostData) => {
        dispatch(setPostData(updatedPostData.data));
        return updatedPostData.data;
      }
    );
  }

