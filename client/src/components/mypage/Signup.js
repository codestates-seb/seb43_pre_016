import styled from "styled-components";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const SignupWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f1f2f3;
  display: flex;
  justify-content: center;

  .signup__container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 24px;
  }

  .container__left {
    width: 421px;
    margin: 0px 42px 15px 0px;

    h1 {
      white-space: nowrap;
      font-size: 26px;
      line-height: 27px;
      margin: 0px 0px 32px;
      font-weight: 400;
    }
  }

  .list {
    margin: 0px 0px 24px;
    display: flex;
    font-size: 15px;
    font-weight: 400;
    align-items: center;
    svg {
      font-size: 26px;
      color: hsl(206, 100%, 52%);
      margin-right: 8px;
    }
  }

  .bottom {
    color: #6a737c;
    font-size: 13px;
  }

  .accent {
    color: #0a95ff;
    display: inline;
  }

  .login__container {
    background-color: #ffffff;
    border-radius: 7px;
    padding: 24px;
    max-width: 316px;
    width: 316px;
    box-shadow: 0 10px 24px hsla(0, 0%, 0%, 0.05),
      0 20px 48px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.1);
    font-size: 13px;
    line-height: 17px;
    margin: 0px 0px 24px;

    button {
      width: 100%;
      background-color: hsl(206, 100%, 52%);
      border: 1px solid transparent;
      border-radius: 3px;
      box-shadow: rgba(255, 255, 255, 0.4) 0px 1px 0px 0px inset;
      color: #ffffff;
      font-size: 13px;
      margin: 2px 0px;
      padding: 10.4px;
      text-align: center;
      cursor: pointer;
    }
  }

  .auth-item {
    display: flex;
    flex-direction: column;
    font-size: 15px;
    margin: 6px 0px;
    color: #0c0d0e;

    p:first-child {
      margin: 6px 0px;
      padding: 0px 2px;
      font-weight: 500;
    }

    p:last-child {
      color: #6a737c;
      font-size: 12px;
      line-height: 15.6923px;
      margin: 6px 0px;
      width: 268px;
    }

    input {
      background-color: #ffffff;
      border: 1px solid #babfc4;
      border-radius: 3px;
      color: #0c0d0e;
      font-size: 13px;
      padding: 7.8px 9.1px;
    }

    input:focus {
      box-shadow: 0px 0px 4px 1px rgb(10, 149, 255);
      border-color: rgb(31 127 195);
      outline: none;
    }
  }

  .checkbox-input {
    display: flex;
    align-items: flex-start;
    margin-bottom: 15px;
    input {
      border-radius: 3px;
      border-color: #babfc4;
      background-color: #ffffff;
      background-position: 50% 50%;
      margin-right: 5px;
      position: relative;
      top: 3px;
    }
    p {
      font-size: 12px;
      line-height: 18.3923px;
    }
  }

  .right-bottom {
    color: #6a737c;
    font-size: 12px;
    margin-top: 26px;
    a {
      color: #0a95ff;
    }
  }

  .valid {
    text-align: center;
    font-size: 12px;
  }

  .success {
    color: #a9cec7;
  }

  .error {
    color: #ea5734;
  }

  .bottom-router {
    margin-top: 2.5rem;
    text-align: center;

    a {
      color: #0a95ff;
    }
  }
`;

const Signup = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailMsg, setEmailMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");

  const [isValidName, setIsValidName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const [cookies, setCookie, removeCookie] = useCookies();

  const navigate = useNavigate();

  const notify = () => {
    if (!validationCheckName(displayName)) {
      toast.warning("이름을 입력하세요!");
    }
    if (!validationCheckEmail(email)) {
      toast.warning("이메일을 양식에 맞게 입력하세요!");
    }

    if (!validationCheckPassword(password)) {
      toast.warning("비밀번호를 양식에 맞게 입력하세요!");
    }
  };

  const submitData = async () => {
    try {
      const response = await axios.post("/users", {
        userName: displayName,
        email,
        password,
      });

      toast.success("회원가입에 성공하였습니다.");
      navigate("/users/login"); //회원가입이 완료되면 로그인 창으로 이동한다
    } catch (err) {
      toast.error(`${err}`);
      console.log(err);
    }
  };

  //name 유효성 검사
  const validationCheckName = (val) => {
    if (val.length >= 1) {
      return true;
    } else {
      return false;
    }
  };

  //email 유효성 검사
  const validationCheckEmail = (val) => {
    const emailRegEx =
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

    return emailRegEx.test(val);
  };
  //password 유효성 검사
  const validationCheckPassword = (val) => {
    const passwordRegEx =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{10,25}$/;

    if (val.match(passwordRegEx) !== null) {
      return true;
    } else {
      return false;
    }
  };

  const onChangeName = (e) => {
    let targetVal = e.target.value;
    setDisplayName(targetVal);

    if (validationCheckName(targetVal)) {
      setIsValidName(true);
    } else {
      setIsValidName(false);
    }
  };

  const onChangeEmail = (e) => {
    let targetVal = e.target.value;
    setEmail(targetVal);

    if (validationCheckEmail(targetVal)) {
      setIsValidEmail(true);
      setEmailMsg("This is a valid email format");
    } else {
      setIsValidEmail(false);
      setEmailMsg("The email format is not valid");
    }
  };

  const onChangePassword = (e) => {
    let targetVal = e.target.value;
    setPassword(targetVal);

    if (validationCheckPassword(targetVal)) {
      setIsValidPassword(true);
      setPasswordMsg("This is a valid password format");
    } else {
      setIsValidPassword(false);
      setPasswordMsg(
        "Please enter at least 10 digits in English, number, and special character combination"
      );
    }
  };

  const onSignup = (e) => {
    // e.preventDefault();
    if (
      validationCheckName(displayName) &&
      validationCheckEmail(email) &&
      validationCheckPassword(password)
    ) {
      submitData();
    }
  };

  // reCaptcha 관련 함수
  function onChange(value) {
    console.log("Captcha value:", value);
  }

  return (
    <SignupWrapper>
      <div className="signup__container">
        <div className="container__left">
          <h1>Join the Stack Overflow community</h1>
          <div className="list">
            <HelpOutlineIcon />
            <p>Get unstuck — ask a question</p>
          </div>
          <div className="list">
            <ThumbsUpDownIcon />
            <p>Unlock new privileges like voting and commenting</p>
          </div>
          <div className="list">
            <LocalOfferIcon />
            <p>Save your favorite questions, answers, watch tags, and more</p>
          </div>
          <div className="list">
            <EmojiEventsIcon />
            <p>Earn reputation and badges</p>
          </div>
          <p className="bottom">
            Collaborate and share knowledge with a private group for FREE.
          </p>
          <a className="accent">
            GetStack Overflow for Teams free for up to 50 users.
          </a>
        </div>
        <div className="container__right">
          <div className="login__container">
            <div className="auth-item">
              <p>Display name</p>
              <input type="text" value={displayName} onChange={onChangeName} />
              {/* {!isValidName && (
                <div className="valid">Please enter a valid Display name</div>
              )} */}
            </div>
            <div className="auth-item">
              <p>Email</p>
              <input type="email" value={email} onChange={onChangeEmail} />
              <div className={`valid ${isValidEmail ? "success" : "error"}`}>
                {emailMsg}
              </div>
            </div>
            <div className="auth-item">
              <p>Password</p>
              <input
                value={password}
                type="password"
                onChange={onChangePassword}
              />
              <div className={`valid ${isValidPassword ? "success" : "error"}`}>
                {passwordMsg}
              </div>
              <p>
                Passwords must contain at least 8 characters, including at least
                1 special character and number.
              </p>
            </div>
            <ReCAPTCHA
              sitekey="6LdFu5QlAAAAAHlGW3B8k4tsFFruuptmKLdWwXT9"
              size="invisible"
              onChange={onChange}
            />
            <div className="checkbox-input">
              <input type="checkbox" />
              <p>
                Opt-in to receive occasional product updates, user research
                invitations, company announcements, and digests.
              </p>
            </div>
            <button
              onClick={() => {
                onSignup();
                notify();
              }}
            >
              Sign up
            </button>
            <div className="right-bottom">
              By clicking “Sign up”, you agree to our&nbsp;
              <a>terms of service, privacy policy&nbsp;</a>
              and
              <a> cookie policy</a>
            </div>
          </div>
          <p className="bottom-router">
            Already have an account? <a href="/users/login">Log in</a>
          </p>
        </div>
      </div>
      <ToastContainer
        position="top-right" // 알람 위치 지정
        autoClose={4000} // 자동 off 시간
        hideProgressBar={false} // 진행시간바 숨김
        closeOnClick // 클릭으로 알람 닫기
        rtl={false} // 알림 좌우 반전
        pauseOnFocusLoss // 화면을 벗어나면 알람 정지
        draggable // 드래그 가능
        pauseOnHover // 마우스를 올리면 알람 정지
        theme="colored"
        // limit={1} // 알람 개수 제한
      />
    </SignupWrapper>
  );
};

export default Signup;
