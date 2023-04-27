import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useCookies } from "react-cookie";

const BackgroundLogin = styled.div`
  height: 100vh;
  background-color: #f2f2f3;
  display: flex;
  justify-content: center;
  align-items: center;
  .sublinkContent {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .sublink {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1.5rem;
      font-size: 0.8rem;
    }
    .Employer-link {
      margin-top: 1rem;
    }
  }
  a {
    text-decoration: none;
    color: hsl(206, 100%, 52%);
  }
`;

const LoginForm = styled.form`
  border-radius: 7px;
  width: 17rem;
  height: 15rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 10px;
  .label {
    display: flex;
    width: 100%;
    margin: 0.8rem 0px 0px 0px;
    font-weight: bold;
    font-size: 0.9rem;
  }
  .labelPW {
    display: flex;
    width: 100%;
    font-weight: bold;
    font-size: 0.9rem;
  }
  .inputForm {
    width: 100%;
  }
  .error-wrapper {
    min-height: 1rem;
  }
  .error-message {
    color: red;
    font-size: 0.8rem;
  }
`;

const LoginInput = styled.input`
  width: 100%;
  height: 2rem;
  margin: 0.2rem 0px 0px 0px;
`;

const LoginButton = styled.button`
  width: 100%;
  height: 2.5rem;
  background-color: hsl(206, 100%, 52%);
  border: 1px solid hsl(206, 100%, 52%);
  border-radius: 3px;
  margin: 1.1rem 0px 0px 0px;
  color: white;
  &:hover {
    background-color: rgb(0, 122, 230);
  }
`;

const Login = () => {
  //폼 상태관리
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  //로그인 성공 후 토큰 저장
  const [token, setToken] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies();

  //유효성검사 준비
  const regExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let isValidEmailFormat = regExp.test(username);

  const handleEmail = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  //로그인 실행
  const onClickLoginBtn = (e) => {
    e.preventDefault();

    // if (!isValidEmailFormat) {
    //   setErrorMessage("The email is not a valid email address.");
    //   return;
    // }

    const header = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = {
      username: username,
      password: password,
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, body, header)
      .then((res) => {
        console.log(res);
        localStorage.setItem("access", `${res.headers.access}`);
        navigate("/");
        window.location.reload();
      })
      .catch((err) => {
        setErrorMessage("The email or password is incorrect."); //error 메세지 출력
        console.error(err);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/auth/login`
        );
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <BackgroundLogin>
      <div className="sublinkContent">
        <LoginForm>
          <div className="inputForm">
            <div className="label">Email</div>
            <LoginInput
              type="text"
              name="email"
              onChange={handleEmail}
              value={username}
            ></LoginInput>
            <div className="error-wrapper">
              <div className="error-wrapper">
                {errorMessage && (
                  <div className="error-message">{errorMessage}</div>
                )}
              </div>
            </div>
          </div>
          <div className="inputForm">
            <div className="labelPW">Password</div>
            <LoginInput
              type="password"
              name="password"
              onChange={handlePassword}
              value={password}
            ></LoginInput>
          </div>
          <LoginButton onClick={onClickLoginBtn}>Log in</LoginButton>
        </LoginForm>
        <div className="sublink">
          <div>
            Don`t have an account? {` `}
            <a href="/users/signup">Sign up</a>
          </div>
          <div className="Employer-link">
            Are you an employer? {` `}
            <Link to="https://talent.stackoverflow.com/users/login">
              Sign up on Talent
            </Link>
          </div>
        </div>
      </div>
    </BackgroundLogin>
  );
};

export default Login;
