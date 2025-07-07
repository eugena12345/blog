import styled from 'styled-components';
import React from 'react';

const UserCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #ffffff; /* Белый фон */
  border: 2px solid #6c5ce7; /* Сиреневая рамка */
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  max-width: 1400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Легкая тень */
  box-sizing: border-box;
  span {
    font-weight: bold;
    font-size: 14px;

    margin-right: 5px;
    color: #6c5ce7; /* Сиреневый текст для меток */
  }
`;

const UserInfo = styled.div`
  margin-bottom: 10px;
  color: #333333;
  width: 20%;

  span {
    font-weight: bold;
    margin-right: 5px;
    color: #6c5ce7; /* Сиреневый текст для меток */
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-around;
  width: 40%;
`;

const UserTitle = () => {
  return (
    <UserCard>
      <UserInfo>
        <span>Логин:</span>
      </UserInfo>

      <UserInfo>
        <span>Дата регистрации:</span>
      </UserInfo>

      <UserInfo>
        <span>Роль:</span>
      </UserInfo>

      <ActionButtons>
        {' '}
        <span>Действия</span>{' '}
      </ActionButtons>
    </UserCard>
  );
};

export default UserTitle;
