import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { removeCommentAsync } from './../actions/remove_comment_async';
import { openModal } from '../actions/open_modal';
import { closeModal } from '../actions/close_modal';
import { ROLEIDS } from '../constants/roleId';
import { selectUserRoleId } from './../selectors/selectUserRoleId';
import { checkAccess } from './../utils/checkAccess';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 5px 0;
`;
const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  border: 2px solid #6c5ce7; /* Сиреневая рамка */
  border-radius: 10px;
  margin-right: 5px;
  padding: 3px;
`;
const InfoPanel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Panel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const Comment = ({ id, postId, authorLogin, publishedAt, content }) => {
  const dispatch = useDispatch();
  const removeComment = (postId, id) => {
    dispatch(
      openModal({
        text: 'Удалить комментарий?',
        isOpen: true,
        onClose: () => {
          dispatch(closeModal());
        },
        onDelete: () => {
          dispatch(removeCommentAsync(postId, id));
          dispatch(closeModal());
        },
      })
    );
  };
  const userRoleId = useSelector(selectUserRoleId);
  const canRemoveComment = checkAccess(
    [ROLEIDS.ADMIN, ROLEIDS.MODERATOR],
    userRoleId
  );
  return (
    <Container>
      <CommentContainer>
        <InfoPanel>
          <Panel>
            <i className="fa fa-fa fa-user-circle-o" aria-hidden="true"></i>
            <div>{authorLogin}</div>
          </Panel>
          <Panel>
            <i className="fa fa-calendar" aria-hidden="true"></i>
            <div>{publishedAt}</div>
          </Panel>
        </InfoPanel>

        <div>{content}</div>
      </CommentContainer>

      {canRemoveComment && (
        <i
          className="fa fa-trash-o"
          aria-hidden="true"
          onClick={() => removeComment(postId, id)}
        ></i>
      )}
    </Container>
  );
};

export default Comment;

Comment.propTypes = {
  id: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  authorLogin: PropTypes.string.isRequired,
  publishedAt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
