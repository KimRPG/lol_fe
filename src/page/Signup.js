import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Form = styled.form`
  /* 원하는 폼 스타일을 추가하세요 */
`;

const Label = styled.label`
  /* 라벨에 대한 스타일 추가 */
`;

const Signup = () => {
  return (
    <CenteredContainer>
      <Form>
        <Label htmlFor="user">ID = user</Label>
        <br/>
        <Label htmlFor="password">password = password</Label>
        <br/>
        <Link to={"/login"} >로그인으로</Link>
      </Form>
    </CenteredContainer>
  );
};

export default Signup;
