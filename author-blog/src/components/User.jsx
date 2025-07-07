import styled from 'styled-components';
import React, { useState } from 'react';
//import { useServerRequest } from './../hooks/useServerRequest';
import PropTypes from 'prop-types';
import { TYPE } from './prop-type/propType';
import { request } from './utils/request';

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
`;

const UserInfo = styled.div`
  font-size: 14px;
  color: #333333;
  width: 20%;

  span {
    font-weight: bold;
    margin-right: 5px;
    color: #6c5ce7; /* Сиреневый текст для меток */
  }
`;

const RoleSelect = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #6c5ce7; /* Сиреневая рамка */
  border-radius: 5px;
  font-size: 14px;
  color: #333333;

  &:focus {
    outline: none;
    border-color: #a29bfe; /* Более светлый оттенок при фокусе */
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-around;
  width: 40%;
`;

const SaveButton = styled.button`
  padding: 8px 12px;
  background-color: #6c5ce7; /* Сиреневый фон */
  color: #ffffff; /* Белый текст */
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #a29bfe; /* Более светлый оттенок при наведении */
  }

  &:disabled {
    background-color: #a29bfe; /* Более светлый оттенок при наведении */
    cursor: not-allowed;
  }
`;

const DeleteButton = styled.button`
  padding: 8px 12px;
  background-color: #e74c3c; /* Красный фон */
  color: #ffffff; /* Белый текст */
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c0392b; /* Темно-красный при наведении */
  }
`;

const User = ({ user, roles, onUserRemove }) => {
  const [initialRoleId, setInitialRoleID] = useState(user.role);
  const [selectedRoleID, setSelectedRoleID] = useState(user.role);
  //const dispatch = useDispatch();
  //const requestServer = useServerRequest();
  const onUserRoleSave = (userId, newRoleId) => {
    request(`/api/users/${userId}`, 'PATCH' , {roleId: newRoleId}).then(() =>
      setInitialRoleID(newRoleId)
    );
  };

  return (
    <UserCard>
      <UserInfo> {user.login}</UserInfo>

      <UserInfo>{user.registretedAt}</UserInfo>

      <UserInfo>
        <RoleSelect
          value={selectedRoleID}
          onChange={(e) => setSelectedRoleID(+e.target.value)}
        >
          {roles.map((roleOption) => {
            return (
              <option key={roleOption.id} value={roleOption.id}>
                {roleOption.name}
              </option>
            );
          })}
        </RoleSelect>
      </UserInfo>

      <ActionButtons>
        <div>
          <SaveButton
            disabled={selectedRoleID === initialRoleId}
            onClick={() => onUserRoleSave(user.id, selectedRoleID)}
          >
            <i className="fa fa-floppy-o" aria-hidden="true"></i>
          </SaveButton>
        </div>

        <DeleteButton onClick={onUserRemove}>
          <i className="fa fa-trash-o" aria-hidden="true"></i>
        </DeleteButton>
      </ActionButtons>
    </UserCard>
  );
};

export default User;

User.propTypes = {
  user: PropTypes.user,
  roles: TYPE.roles,
  onUserRemove: PropTypes.func.isRequired,
};
