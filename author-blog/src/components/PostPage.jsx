import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Post from './Post';
import Comments from './Comments';
import { useDispatch, useSelector } from 'react-redux';
import { loadPostAsync } from '../actions/load_post_async';
import { selectPost } from './../selectors';
import { useMatch } from 'react-router-dom';
import PostForm from './PostForm';
import { resetPost } from '../actions/resetPost';
import PrivateContent from './PrivateContent';
import { ROLEIDS } from '../constants/roleId';

const PostPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  //width: 100vw;
  // height: 100vh;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  // background-color: #ffffff; /* Белый фон */
  padding: 100px 30px;
  box-sizing: border-box;
`;

const PostPage = () => {
  const isEdit = useMatch('/post/:postId/edit');
  const isCreating = useMatch('/post');
  const post = useSelector(selectPost);
  const dispatch = useDispatch();
  const params = useParams();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    dispatch(resetPost());
  }, [isCreating]);

  useEffect(() => {
    if (isCreating) {
      setIsLoading(false);
      return;
    }

    dispatch(loadPostAsync(params.postId)).then((postData) => {
      setIsLoading(false);
      setError(postData.error);
    });
  }, [dispatch, params.postId]);

  if (isLoading) {
    return null;
  }

  return error ? (
    <div>{error}</div>
  ) : (
    <PostPageContainer>
      {isEdit || isCreating ? (
        <PrivateContent access={[ROLEIDS.ADMIN]}>
          <PostForm post={post} />
        </PrivateContent>
      ) : (
        <>
          <Post post={post} />
          <Comments comments={post.comments} postId={params.postId} />
        </>
      )}
    </PostPageContainer>
  );
};
export default PostPage;
