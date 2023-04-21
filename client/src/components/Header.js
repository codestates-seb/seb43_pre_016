import styled from "styled-components";
import { useEffect, useState } from "react";
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

  .header__search {
    display: flex;
    background-color: white;
    position: relative;
    justify-content: center;
    align-items: center;
    border: 1px solid #babfc4;
    border-radius: 4px;
    flex-grow: 1;
    padding: 3px 3px;
    label {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .header__search > svg {
    position: absolute;
    left: 0.8rem;
    top: 50%;
    margin-top: -11.5px;
    color: hsl(210, 8%, 55%);
  }

  .header__search__textarea {
    width: 100%;
    scrollbar-width: thin;
    white-space: nowrap;
    overflow-x: auto;
    resize: none;
    height: 20px;
    line-height: 10px;
    border: none;
    font-size: 13px;
    font-family: -apple-system;
    color: #3b4045;
    background-color: #ffffff;
    padding: 4px;
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background-color: #f2f2f2;
      border-radius: 4px;
    }
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
  const [searchtext, setSearchtext] = useState("");
  const [searchlist, setSearchlist] = useState({
    tag: [],
    user: [],
    answer: "",
    score: "",
  });
  const handlesearch = (key) => {
    if (key === "Enter" || key === "isSearch") {
      console.log("검색합니다!");
      console.log(searchtext);
      const tagRegex = /\[(.*?)\]/g;
      const tagMatches = [...searchtext.matchAll(tagRegex)];
      const userRegex = /(?<=user:)\w+/g;
      const userMatches = [...searchtext.matchAll(userRegex)];
      const answerRegex = /(?<=answer:)\d+/g;
      const answerMatch = [...searchtext.matchAll(answerRegex)];
      const scoreRegex = /(?<=score:)\d+/g;
      const scoreMatch = [...searchtext.matchAll(scoreRegex)];
      const replica = { ...searchlist };
      replica.user = userMatches.map((x) => x[0]);
      tagMatches.length !== 0
        ? (replica.tag = tagMatches.map((x) => x[1]))
        : null;
      userMatches.length !== 0
        ? (replica.user = userMatches.map((x) => x[0]))
        : null;
      answerMatch.length !== 0
        ? (replica.answer = answerMatch.map((x) => x[0])[0])
        : null;
      scoreMatch.length !== 0
        ? (replica.score = scoreMatch.map((x) => x[0])[0])
        : null;
      console.log(replica);
      setSearchlist({ ...searchlist, ...replica });
    }
  };
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
        <div className="header__search">
          <label onClick={() => handlesearch("isSearch")}>
            <SearchIcon />
          </label>
          <textarea
            onChange={(e) => setSearchtext(e.target.value)}
            onKeyUp={(e) => {
              handlesearch(e.key);
            }}
            value={searchtext}
            placeholder="Search..."
            className="header__search__textarea"
          ></textarea>
        </div>
        <div className="header__btns">
          <Link to="/users/login">
            <button className="header__btn powder-700">Log in</button>
          </Link>

          <Link to="/users/signup">
            <button className="header__btn blue-500">Sign up</button>
          </Link>
        </div>
      </div>
    </HeaderWrapper>
  );
};

export default Header;
