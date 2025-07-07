import React, { useState } from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRoleId } from '../selectors';
import { addCommentAsync } from '../actions/add_comment_async';
import { checkAccess } from '../utils/checkAccess';
import { ROLEIDS } from '../constants/roleId';
import PropTypes from 'prop-types';
import { TYPE } from './prop-type/propType';

const CommentsContainer = styled.div`
  //display: flex;
  //flex-direction: column;
  width: 100%;
  max-width: 1200px;
  text-align: justify;
  //align-items: center;
  //justify-content: center;
  // background-color: #ffffff; /* Белый фон */
  border: 2px solid #6c5ce7; /* Сиреневая рамка */
  border-radius: 10px;
  //margin: 30px;
  padding: 30px;

  // box-shadow: 0 4px 8px rgba(55, 24, 93, 0.47); /* Легкая тень */
  box-sizing: border-box;
`;

const Title = styled.h2`
  color: #6c5ce7; /* Сиреневый текст */
  font-size: 24px;
  margin-bottom: 20px;
`;

const NewCommet = styled.div`
  display: flex;
  align-items: center;

  & i {
    color: #6c5ce7;
  }

  & textarea {
    width: 90%;
    resize: none;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #6c5ce7; /* Сиреневая рамка */
    border-radius: 5px;
    font-size: 16px;
  }
`;

const CommentsBlock = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

const Comments = ({ comments, postId }) => {
  const [newComment, setNewComment] = useState('');
  const dispatch = useDispatch();
  const userRoleId = useSelector(selectUserRoleId);
  const handleChange = (e) => {
    setNewComment(e.target.value);
  };
  const addNewComment = (postId, newComment) => {
    if (newComment === '') {
      return;
    }
    dispatch(addCommentAsync(postId, newComment));
    setNewComment('');
  };

  const isGuest = checkAccess([ROLEIDS.GUEST], userRoleId);

  return (
    <CommentsContainer>
      <Title>Комментарии</Title>
      {!isGuest && (
        <NewCommet>
          <textarea
            value={newComment}
            onChange={handleChange}
            placeholder="Комментарий..."
          />
          <i
            className="fa fa-paper-plane"
            aria-hidden="true"
            onClick={() => addNewComment(postId, newComment)}
          ></i>
        </NewCommet>
      )}
      <CommentsBlock>
        {comments.length > 0 ? (
          comments.map(({ author, publishedAt, content, id }) => (
            <Comment
              key={id}
              id={id}
              postId={postId}
              authorLogin={author}
              publishedAt={publishedAt}
              content={content}
            />
          )

          )
        ) : (
          <div>Пока нет ни одного комментария</div>
        )}
      </CommentsBlock>
    </CommentsContainer>
  );
};

export default Comments;

Comments.propTypes = {
  comments: TYPE.comments,
  postId: PropTypes.string.isRequired,
};
