import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openModal } from '../actions/open_modal';
import { closeModal } from '../actions/close_modal';
import styled from 'styled-components';
import { removePostAsync } from '../actions/remove_post_async';
import { checkAccess } from '../utils/checkAccess';
import { ROLEIDS } from '../constants/roleId';
import { selectUserRoleId } from '../selectors';
import { TYPE } from './prop-type/propType';

const PostContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  text-align: justify;
  border: 2px solid #6c5ce7;
  border-radius: 10px;
  padding: 30px;

  box-sizing: border-box;

  & img {
    float: left;
    margin: 0 15px 10px 0;
  }
  & div {
    white-space: pre-wrap;
  }
`;

const Title = styled.h2`
  color: #6c5ce7;
  font-size: 24px;
  margin-bottom: 20px;
`;

const ControlPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & i {
    cursor: pointer;
    color: #6c5ce7;
  }
`;

const PublishedAt = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const PublishedAtPrivate = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Post = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRoleId = useSelector(selectUserRoleId);
  const isAdmin = checkAccess([ROLEIDS.ADMIN], userRoleId);

  const onRemovePost = (postId) => {
    dispatch(
      openModal({
        text: 'Удалить статью?',
        isOpen: true,
        onClose: () => {
          dispatch(closeModal());
        },
        onDelete: () => {
          dispatch(removePostAsync(postId)).then(() => {
            navigate('/');
          });
          dispatch(closeModal());
        },
      })
    );
  };
  return (
    <PostContainer>
      {post.imageUrl && (
        <img src={post.imageUrl} width="200px" alt="Картинка к посту" />
      )}
      <Title>{post.title}</Title>
      <ControlPanel>
        <PublishedAt>
          {' '}
          <i className="fa fa-calendar" aria-hidden="true"></i>
          {post.publishedAt}
        </PublishedAt>
        {isAdmin && (
          <PublishedAtPrivate>
            <i
              className="fa fa-pencil-square-o"
              aria-hidden="true"
              onClick={() => navigate(`/post/${post.id}/edit`)}
            ></i>
            <i
              className="fa fa-trash-o"
              aria-hidden="true"
              onClick={() => onRemovePost(post.id)}
            ></i>
          </PublishedAtPrivate>
        )}
      </ControlPanel>
      <div>{post.content}</div>
    </PostContainer>
  );
};

export default Post;

Post.propTypes = {
  post: TYPE.post,
};
