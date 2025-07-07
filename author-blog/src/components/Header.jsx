import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ROLEIDS } from '../constants/roleId';
import {
  selectUserRoleId,
  selectUserLogin,
} from '../selectors';
import { logoutUser } from '../actions/logout_user';
import { checkAccess } from './../utils/checkAccess';

const HeaderContainer = styled.header`
  display: flex;
  width: 100vw;
  align-items: center;
  justify-content: center;
  height: 90px;
  background-color: #6c5ce7;
  padding: 0;
  margin: 0;
  position: fixed;
  top: 0;
  left: 0;
`;

const MaxWidth = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 90px;
  background-color: #6c5ce7;
  padding: 0;
  margin: 0;
`;

const Logo = styled.div`
  font-size: 60px;
  font-weight: bold;
  color: #ffffff;
  cursor: pointer;
  padding-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const P = styled.p`
  font-size: 16px;
  margin: 0;
  color: #ffffff;
`;
const PSmall = styled.p`
  font-size: 20px;
  margin: 0;
`;

const NavMenu = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavItem = styled.a`
  font-size: 18px;
  color: #ffffff;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: #dfe6e9;
  }
`;

const ButtonBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-right: 10px;
`;

const LoginBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  gap: 10px;
`;

const Button = styled.button`
  background-color: #ffffff; 
  color: #6c5ce7;
  border: none;
  padding: 7px 15px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #dfe6e9;
  }
`;

const PrivateButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const Header = () => {
  const userRoleId = useSelector(selectUserRoleId);
  const userLogin = useSelector(selectUserLogin);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logoutUser());
    sessionStorage.removeItem('userData');
  };

  const isAdmin = checkAccess([ROLEIDS.ADMIN], userRoleId);

  return (
    <HeaderContainer>
      <MaxWidth>
        <Link to="/">
          <Logo>
            <i className="fa fa-code"></i>
            <div>
              <P>Блог</P>
              <PSmall>веб-разработчика</PSmall>
            </div>
          </Logo>
        </Link>

        {/*TODO <NavMenu>
          <NavItem href="#">Главная</NavItem>
          <NavItem href="#">О нас</NavItem>
          <NavItem href="#">Контакты</NavItem>
        </NavMenu> */}
        <P>Код — это творчество. Жизнь — это искусство!</P>

        <ButtonBlock>
          <LoginBlock>
            {userRoleId === ROLEIDS.GUEST ? (
              <>
                <div>Войти</div>
                <Link to="/login">
                  <Button>
                    <i className="fa fa-sign-in" aria-hidden="true"></i>
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <P>{userLogin}</P>
                <Link to="/">
                  <Button onClick={onLogout}>
                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                  </Button>
                </Link>
              </>
            )}
          </LoginBlock>

          <LoginBlock>
            <Button onClick={() => navigate(-1)}>
              <i className="fa fa-angle-double-left" aria-hidden="true"></i>
            </Button>

            {isAdmin && (
              <PrivateButtons>
                <Link to="/post">
                  <Button>
                    <i className="fa fa-file-text-o" aria-hidden="true"></i>
                  </Button>
                </Link>
                <Link to="/users">
                  <Button>
                    <i className="fa fa-users" aria-hidden="true"></i>
                  </Button>
                </Link>
              </PrivateButtons>
            )}
          </LoginBlock>
        </ButtonBlock>
      </MaxWidth>
    </HeaderContainer>
  );
};

export default Header;
