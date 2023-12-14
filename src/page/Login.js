import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginContainer = styled.div`
  width: 300px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Input = styled.input`
  width: calc(100% - 10px);
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if(username !== 'admin'){
      alert("ID가 일치하지 않아요!")
    } else if(password !=="1234"){
      alert("password가 일치하지 않아요")
    }else{
      if (username === 'admin' && password === '1234') {

        setIsLoggedIn(true);
        sessionStorage.setItem("login","1");
        navigate("/");
      }
    }
    // 여기에 실제 로그인 로직을 구현할 수 있습니다.
    // 예시로 간단하게 username과 password가 일치할 때 로그인 상태로 변경하는 것을 보여줍니다.

  };

  return (
    <LoginContainer>
      <h2>로그인</h2>
      <form>
        <div>
          <Input
            type="text"
            placeholder="사용자명"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="button" onClick={handleLogin}>
          로그인
        </Button>
      </form>
      {isLoggedIn && <p>로그인 성공!</p>}
      <p>
        아직 계정이 없으신가요? <Link to="/signup">회원가입</Link>
      </p>
    </LoginContainer>
  );
};

export default Login;
