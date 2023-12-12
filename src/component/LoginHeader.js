import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f2f2f2;
`;

const Logo = styled.h1`
  font-size: 24px;
`;

const Nav = styled.nav``;

const NavLink = styled(Link)`
  margin-right: 15px;
  text-decoration: none;
  color: #333;
  font-weight: bold;
`;

const LoginHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 useState로 관리
  useEffect(() => {
    if (sessionStorage.getItem("login")==="1") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  // 로그인 상태 변경 함수
  const handleLogin = () => {
    if(window.confirm("로그아웃 하겠어요?")===true){
      sessionStorage.removeItem("login"); // 로그아웃 시 sessionStorage에서 "login" 삭제
      setIsLoggedIn(false);
    }



  };

  return (
    <Header>
      <Logo></Logo>
      <Nav>
        {isLoggedIn ? (
          <>
            <NavLink to="/create">추가하기</NavLink>
            <NavLink to="/" onClick={handleLogin}>
              로그아웃
            </NavLink>
          </>
        ) : (
          <NavLink to="/login">로그인</NavLink>
        )}
      </Nav>
    </Header>
  );
};

export default LoginHeader;
