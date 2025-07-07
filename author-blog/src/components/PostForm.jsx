import React, { useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { sanitizeContent } from './utils/sanitizeContent';
import { useDispatch } from 'react-redux';
import { savePostAsync } from '../actions/save_post_async';
import { useNavigate } from 'react-router-dom';
import { TYPE } from './prop-type/propType';

const PostFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  gap: 10px;
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

  & img {
    float: left;
    margin: 0 15px 10px 0;
  }

  & .content {
    white-space: pre-wrap; /* Сохраняет пробелы и переносы строк */
    border: 2px solid #6c5ce7; /* Сиреневая рамка */
    border-radius: 10px;
    min-height: 100px;
    width: 100%;
  }
`;

// const Title = styled.h2`
//   color: #6c5ce7; /* Сиреневый текст */
//   font-size: 24px;
//   margin-bottom: 20px;
// `;

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
  // height: 100%;
`;

const PostForm = ({ post }) => {
  const [titleValue, setTitleValue] = useState(post.title);
  const [imgUrlValue, setImgUrlValue] = useState(post.imageUrl);

  useLayoutEffect(() => {
    setTitleValue(post.title);
    setImgUrlValue(post.imageUrl);
  }, [post.title, post.imageUrl]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const contentRef = useRef(null);

  const onChangeImgUrl = ({ target }) => setImgUrlValue(target.value);
  const onChangeTitle = ({ target }) => setTitleValue(target.value);

  const onSave = () => {
    const newContent = sanitizeContent(contentRef.current.innerHTML);
    dispatch(
      savePostAsync(post.id, {imageUrl:imgUrlValue, title: titleValue, content: newContent})
    ).then(({ id }) => {
      navigate(`/post/${id}`)});
  };

  return (
    <PostFormContainer>
      <p>Редактировать ссылку на картинку </p>
      <input value={imgUrlValue} onChange={onChangeImgUrl} />
      <p>Редактировать название статьи </p>

      <input value={titleValue} onChange={onChangeTitle} />
      <ControlPanel>
        <PublishedAt>
          {post.publishedAt && (
            <>
              <i className="fa fa-calendar" aria-hidden="true"></i>
              {post.publishedAt}
            </>
          )}
        </PublishedAt>
        <PublishedAt>
          <i className="fa fa-floppy-o" aria-hidden="true" onClick={onSave}></i>
        </PublishedAt>
      </ControlPanel>
      <p>Редактировать текст статьи </p>

      <div
        className="content"
        ref={contentRef}
        contentEditable={true}
        suppressContentEditableWarning={true}
      >
        {post.content}
      </div>
    </PostFormContainer>
  );
};

export default PostForm;

PostForm.propTypes = {
  post: TYPE.post,
};
