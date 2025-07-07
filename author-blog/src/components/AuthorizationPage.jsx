import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import { Link, Navigate } from 'react-router-dom';
import { setUser } from './../actions/set_user';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRoleId } from '../selectors';
import { ROLEIDS } from '../constants/roleId';
import { useResetForm } from '../hooks';
import { request } from './utils/request';

const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff; /* Белый фон */
  border: 2px solid #6c5ce7; /* Сиреневая рамка */
  border-radius: 10px;
  padding: 30px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(55, 24, 93, 0.47); /* Легкая тень */
`;

const Title = styled.h2`
  color: #6c5ce7; /* Сиреневый текст */
  font-size: 24px;
  margin-bottom: 20px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #6c5ce7; /* Сиреневая рамка */
  border-radius: 5px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #a29bfe; /* Более светлый оттенок при фокусе */
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #6c5ce7; /* Сиреневый фон */
  color: #ffffff; /* Белый текст */
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #a29bfe; /* Более светлый оттенок при наведении */
  }
  &:disabled {
    background-color: rgb(196, 193, 241);
    cursor: none;
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;

const authResilveSchema = yup.object().shape({
  login: yup
    .string()
    .required('Логин - это обязательное поле')
    .matches(/^[a-zA-Z0-9]+$/, 'Логин может содержать только буквы и цифры')
    .min(3, 'Минимальная длинна логина 3 символа')
    .max(20, 'Максимальная длинна логина 20 символов'),
  password: yup
    .string()
    .required('Пароль - это обязательное поле')
    .matches(
      /^[a-zA-Z0-9#%]+$/,
      'Пароль может содержать только буквы, цифры и занки # %'
    )
    .min(6, 'Минимальная длинна пароля 6 символа')
    .max(30, 'Максимальная длинна пароля 30 символов'),
});

const AuthorizationPage = () => {
  const [serverError, setServerError] = useState(null);
  const dispatch = useDispatch();
  const userRole = useSelector(selectUserRoleId);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    default: {
      login: '',
      password: '',
    },
    resolver: yupResolver(authResilveSchema),
  });

  useResetForm(reset);

  const onSubmit = async ({login, password}) => {
    setServerError(null);
    await request('/api/login', 'POST', {login, password})
    .then(({ error, user }) => {
      if (error) {
        setServerError(error);
        return;
      }
      console.log('user: ', user)
      dispatch(setUser(user));
      sessionStorage.setItem('userData', JSON.stringify(user));
    });
  };

  const formError = errors?.login?.message || errors?.password?.message;
  const errorMessage = formError || serverError;

  if (userRole !== ROLEIDS.GUEST) {
    return <Navigate to="/" />;
  }

  return (
    <AuthContainer>
      <Title>Авторизация</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          type="text"
          placeholder="Логин"
          {...register('login', { onchange: () => setServerError(null) })}
        />

        <InputField
          type="password"
          placeholder="Пароль"
          {...register('password', { onchange: () => setServerError(null) })}
        />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <LoginButton type="submit" disabled={!!formError}>
          Войти
        </LoginButton>
      </form>
      <div>
        Еще не зарегистрирован? <br /> Жми <Link to="/register">сюда</Link>
      </div>
    </AuthContainer>
  );
};

export default AuthorizationPage;
