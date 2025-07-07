import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserRoleId } from '../selectors';
import { checkAccess } from '../utils/checkAccess';
import PropTypes from 'prop-types';
import { TYPE } from './prop-type/propType';

const PrivateContent = ({ children, access, serverError }) => {
  const userRole = useSelector(selectUserRoleId);
  const accessError = checkAccess(access, userRole) ? null : 'Доступ запрещен';
  const error = serverError || accessError;
  return error ? <>Ошибка: {error}</> : children;
};

export default PrivateContent;

PrivateContent.propTypes = {
  children: PropTypes.node.isRequired,
  access: TYPE.roles,
  serverError: TYPE.error,
};
