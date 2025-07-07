import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserTitle from './UserTitle';
import User from './User';
//import { useServerRequest } from './../hooks';
import PrivateContent from './PrivateContent';
import { ROLEIDS } from '../constants/roleId';
import { checkAccess } from '../utils/checkAccess';
import { useSelector } from 'react-redux';
import { selectUserRoleId } from '../selectors';
import { request } from './utils/request';

const UserListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 20px;
  width: 90vw;
  max-width: 1200px;
  box-sizing: border-box;
  height: 100vh;
  justify-content: flex-start;
  padding: 100px 20px 90px 20px;
`;

const Title = styled.h2`
  color: #6c5ce7; /* Сиреневый текст */
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

const Users = () => {
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [shouldUsersUpdate, setShouldUsersUpdate] = useState(false);

  const userId = useSelector(selectUserRoleId);
  //const requestServer = useServerRequest();
  const onUserRemove = (id) => {
    if (!checkAccess([ROLEIDS.ADMIN], userId)) {
      return;
    }
    request(`/api/users/${id}`, 'DELETE').then(() =>
      setShouldUsersUpdate(!shouldUsersUpdate)
    );
  };

  useEffect(() => {
    if (!checkAccess([ROLEIDS.ADMIN], userId)) {
      return;
    }

    const promiseList = [
      request('/api/users'),
      request('/api/users/roles'),
    ];
    Promise.all(promiseList).then(([usersRes, rolesRes]) => {
      if (usersRes.error || rolesRes.error) {
        setError(usersRes.error || rolesRes.error);
        return;
      }
      setUsers(usersRes.data);
      setRoles(rolesRes.data.filter(({ id }) => id !== ROLEIDS.GUEST));
      console.log('usersRes.data', usersRes.data);
            console.log('rolesRes.data', rolesRes.data);

    });
  }, [shouldUsersUpdate]);

  return (
    <PrivateContent access={[ROLEIDS.ADMIN]} error={error}>
      <UserListContainer>
        <Title>Пользователи</Title>
        <UserTitle />
        {users.map((user) => (
          <User
            key={user.id}
            user={user}
            roles={roles}
            onUserRemove={() => onUserRemove(user.id)}
          />
        ))}
      </UserListContainer>
    </PrivateContent>
  );
};

export default Users;
