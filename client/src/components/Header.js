import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const HeaderWrapper = styled.header`
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f9f9;
  border-color: #f48225;
  border-style: solid none none;
  border-width: 3px 0px 0px;
  box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05),
    0 2px 8px hsla(0, 0%, 0%, 0.05);

  .header__container {
    width: 1264px;
    max-width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header__logo__a {
    align-items: center;
    color: #0a95ff;
    height: 100%;
    display: flex;
    font-family: -apple-system;
    font-size: 13px;
    line-height: 17px;
    padding: 0px 8px;
  }

  .header__logo__span {
    display: block;
    width: 150px;
    height: 30px;
    background: url("img/sprites.svg") no-repeat 0 -500px;
    color: #0a95ff;
    font-size: 13px;
    line-height: 17px;
    margin: -4px 0px 0px;
  }

  .header__nav {
    color: #232629;
    display: flex;
    font-family: -apple-system;
    font-size: 14px;
    gap: 4px;
    line-height: 17px;
    padding: 2px 0px;
    margin-top: 3px;
  }

  .header__nav__li {
    display: flex;
    align-items: center;
    white-space: nowrap;
  }

  .header__nav__li > a {
    border-radius: 1000px;
    height: 100%;
    color: #525960;
    font-family: -apple-system;
    line-height: 17px;
    padding: 6px 12px;
    /* text-align: left; */
  }

  .header__logo__a:hover {
    background: #e4e5e7;
  }
  .header__nav__li > a:hover {
    background: #e4e5e7;
  }

  .header__form {
    position: relative;
    flex-grow: 1;
    padding: 0px 8px;
  }

  .header__form > svg {
    position: absolute;
    left: 0.8rem;
    top: 50%;
    margin-top: -11.5px;
    color: hsl(210, 8%, 55%);
  }

  .header__form__input {
    width: 100%;
    border: 1px solid hsl(210, 8%, 75%);
    border-radius: 3px;
    font-size: 13px;
    color: #3b4045;
    background-color: #ffffff;
    padding: 7.8px 9.1px 7.8px 32px;
  }

  .header__btns {
    display: inline-flex;
  }

  .header__btn {
    margin-right: 4px;
    padding: 8px 10px;
    border-radius: 3px;
    box-shadow: rgba(255, 255, 255, 0.4) 0px 1px 0px 0px inset;
    cursor: pointer;
  }

  .hide {
    font-size: 0px;
  }

  .powder-700 {
    color: hsl(205, 47%, 42%);
    background-color: hsl(205, 46%, 92%);
    border: 1px solid hsl(205, 41%, 63%);
  }

  .blue-500 {
    background-color: hsl(206, 100%, 52%);
    border: 1px solid transparent;
    color: #ffffff;
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <div className="header__container">
        <a href="/" className="header__logo__a">
          <span className="header__logo__span hide">Stack Overflow</span>
        </a>
        <ul className="header__nav">
          <li className="header__nav__li">
            <a href="/">About</a>
          </li>
          <li className="header__nav__li">
            <a href="/">Products</a>
          </li>
          <li className="header__nav__li">
            <a href="/">For Teams</a>
          </li>
        </ul>
        <form className="header__form">
          <SearchIcon />
          <input
            placeholder="Search..."
            className="header__form__input"
          ></input>
        </form>
        <div className="header__btns">
          <button className="header__btn powder-700">Log in</button>
          <Link to="/users/signup">
            <button className="header__btn blue-500">Sign up</button>
          </Link>
        </div>
      </div>
    </HeaderWrapper>
  );
};

export default Header;
