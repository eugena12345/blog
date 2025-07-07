import { request } from '../components/utils/request';
import { setPostData } from './set_post_data';

export const loadPostAsync = (postId) => (dispatch) =>
  //serverRequest('fetchPost', postId)
request(`/api/posts/${postId}`)
.then((postData) => {
    if (postData.data) {
      dispatch(setPostData(postData.data));
    }
    return postData;
  });
