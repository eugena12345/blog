import React, { useLayoutEffect } from 'react';
import './App.css';
//import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthorizationPage from './components/AuthorizationPage';
import RegistrationPage from './components/RegistrationPage';
import Users from './components/Users';
import PostPage from './components/PostPage';
import { useDispatch } from 'react-redux';
import { setUser } from './actions/set_user';
import Modal from './components/Modal';
import Main from './components/Main';

// const Content = styled.div``;

function App() {
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    const currentUserData = JSON.parse(sessionStorage.getItem('userData'));
    if (!currentUserData) return;
    dispatch(setUser(currentUserData));
  }, []);
  return (
    <>
      <Header />
      {/* <Content> */}
      <Modal />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<AuthorizationPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/users" element={<Users />} />
        <Route path="/post/:postId" element={<PostPage />} />
        <Route path="/post/:postId/edit" element={<PostPage />} />
        <Route path="/post" element={<PostPage />} />
        <Route
          path="*"
          element={<div>Нет доступа или страница не существует</div>}
        />
      </Routes>
      {/* </Content> */}

      <Footer />
    </>
  );
}

export default App;
