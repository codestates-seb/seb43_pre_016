import styled from "styled-components";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";

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
    background: url("/img/sprites.svg") no-repeat 0px -500px;
    display: block;
    width: 150px;
    height: 30px;
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
    margin-right: 10px;
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
    outline: none;
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
const Modalwindow = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  justify-content: center;
  margin-top: 55px;
  z-index: 999;
  .modal {
    margin-left: 164px;
    display: flex;
    flex-direction: row;
    background-color: white;
    padding: 5px;
    box-shadow: #d6d9dc 1px 3px 3px 1px;
    width: 600px;
    height: 150px;
    border: 1px solid #d6d9dc;
    border-radius: 5px;
    article {
      display: flex;
      flex-wrap: wrap;
      width: 50%;
      padding: 5px;
      flex: 1;
      flex-direction: column;

      span {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 5px;
        label {
          display: flex;
          min-width: 100px;
          font-size: 20px;
          font-family: -apple-system;
          font-weight: 500;
          padding: 3px;
        }
        p {
          color: #525960;
        }
      }
    }
  }
`;

const LogoutHeader = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchtext, setSearchtext] = useState("");
  const [searchlist, setSearchlist] = useState({
    tag: [],
    user: [],
    answer: "",
    score: "",
    title: "",
  });
  useEffect(() => {
    console.log(searchtext);
    const tagRegex = /\[(.*?)\]/g;
    const tagMatches = [...searchtext.matchAll(tagRegex)];
    const userRegex = /(?<=user:)\w+/g;
    const userMatches = [...searchtext.matchAll(userRegex)];
    const answerRegex = /(?<=answer:)\d+/g;
    const answerMatch = [...searchtext.matchAll(answerRegex)];
    const scoreRegex = /(?<=score:)\d+/g;
    const scoreMatch = [...searchtext.matchAll(scoreRegex)];
    const titleRegex = /(?<=title:)\w+/g;
    const titleMatch = [...searchtext.matchAll(titleRegex)];
    const replica = { ...searchlist };
    replica.user = userMatches.map((x) => x[0]);
    tagMatches.length !== 0
      ? (replica.tag = tagMatches.map((x) => x[1]))
      : (replica.tag = []);
    userMatches.length !== 0
      ? (replica.user = userMatches.map((x) => x[0]))
      : (replica.user = []);
    answerMatch.length !== 0
      ? (replica.answer = answerMatch.map((x) => x[0])[0])
      : (replica.answer = "");
    scoreMatch.length !== 0
      ? (replica.score = scoreMatch.map((x) => x[0])[0])
      : (replica.score = "");
    titleMatch.length !== 0
      ? (replica.title = titleMatch.map((x) => x[0])[0])
      : (replica.title = "");
    console.log(replica);
    setSearchlist({ ...searchlist, ...replica });
  }, [searchtext]);
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(
        `/search?q=${
          searchlist.title !== "" ? "%1T" + searchlist.title + "%1T" : ""
        }${
          searchlist.tag.length !== 0
            ? "%2T" + searchlist.tag.join("+") + "%2T"
            : ""
        }${
          searchlist.user.length !== 0
            ? "%1U" + searchlist.user.join("+") + "%1U"
            : ""
        }${
          searchlist.answer !== "" ? "%answer:" + searchlist.answer + "%" : ""
        }${searchlist.score !== "" ? "%score:" + searchlist.score + "%" : ""}`
      );
    }
  };
  function handleTextareaFocus() {
    setIsModalVisible(true);
  }

  function handleTextareaBlur() {
    setIsModalVisible(false);
  }

  return (
    <>
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
            <Link
              to={`/search?q=${
                searchlist.title !== "" ? "%1T" + searchlist.title + "%1T" : ""
              }${
                searchlist.tag.length !== 0
                  ? "%2T" + searchlist.tag.join("+") + "%2T"
                  : ""
              }${
                searchlist.user.length !== 0
                  ? "%1U" + searchlist.user.join("+") + "%1U"
                  : ""
              }${
                searchlist.answer !== ""
                  ? "%answer:" + searchlist.answer + "%"
                  : ""
              }${
                searchlist.score !== ""
                  ? "%score:" + searchlist.score + "%"
                  : ""
              }`}
            >
              <label>
                <SearchIcon />
              </label>
            </Link>
            <textarea
              onChange={(e) => setSearchtext(e.target.value)}
              onKeyUp={handleSearch}
              value={searchtext}
              placeholder="Search..."
              className="header__search__textarea"
              onFocus={handleTextareaFocus}
              onBlur={handleTextareaBlur}
              maxLength="100"
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
      {isModalVisible && (
        <Modalwindow>
          <section className="modal">
            <article className="left">
              <span>
                <label>[tag]</label>
                <p>search within a tag</p>
              </span>
              <span>
                <label>answer:2</label>
                <p>post with a 2+ answer</p>
              </span>
              <span>
                <label>user:userId</label>
                <p>search a question within userId</p>
              </span>
            </article>
            <article className="right">
              <span>
                <label>title:string</label>
                <p>search a question within title</p>
              </span>
              <span>
                <label>score:4</label>
                <p>post with a 3+ score</p>
              </span>
            </article>
          </section>
        </Modalwindow>
      )}
    </>
  );
};

export default LogoutHeader;
