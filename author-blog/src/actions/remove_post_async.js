import { request } from './../components/utils/request';

export const removePostAsync = (postId) => () =>
  request(`/api/posts/${postId}`, 'DELETE');
