import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  background-color: #ffffff;
  border: 2px solid #6c5ce7;
  border-radius: 10px;
  padding: 20px;
  width: calc(33.33% - 40px); 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    box-shadow: 0 5px 9px rgba(108, 92, 231, 0.43);
    color: red;
  }

  & .imgContainer {
    display: flex;
    width: 100%;
    height: 200px;
    justify-content: center;
    align-items: center;

    & img {
      margin: 0;
    }
  }

  @media (max-width: 900px) {
    width: calc(50% - 40px);
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const CardTitle = styled.h3`
  color: #6c5ce7;
  font-size: 18px;
  margin-bottom: 10px;
`;

const CardText = styled.p`
  color: #333333;
  font-size: 12px;
  line-height: 1.5;
  display: flex;
  justify-content: space-between;
`;

const PostCard = ({ id, imageUrl, title, publishedAt, commentsCount }) => {
  return (
    <Card>
      <Link to={`/post/${id}`}>
        <>
          <div className="imgContainer">
            <img
              src={imageUrl || null}
              width="200px"
              alt="Возможно картинки нет, или она не загрузилась"
            />
          </div>

          <CardTitle>{title}</CardTitle>

          <CardText>
            <i className="fa fa-calendar" aria-hidden="true"></i> {publishedAt}
          </CardText>
          <CardText>
            <i className="fa fa-comment-o" aria-hidden="true"></i>{' '}
            {commentsCount}
          </CardText>
        </>
      </Link>
    </Card>
  );
};

export default PostCard;

PostCard.propTypes = {
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  publishedAt: PropTypes.string.isRequired,
  commentsCount: PropTypes.number.isRequired,
};
