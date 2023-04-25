import styled from "styled-components";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Link, useNavigate, useLocation } from "react-router-dom";
import onSaveTime from "../../features/onSaveTime";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Paging.css";
import Pagination from "react-js-pagination";

const Container = styled.div`
  display: flex;
  max-width: 1100px;
  width: calc(100% - 164px);
  margin-left: 164px;

  .mainbar {
    width: 100%;
  }

  .mainbar__header {
    padding: 24px 0px 0px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0px 0px 15px;

    .search__log {
      h3 {
        font-weight: 400;
        /* line-height:35.1px */
        font-size: 26px;
        margin: 0px 12px 12px 0px;
      }
      p {
        color: #6a737c;
        font-size: 12px;
        line-height: 12px;
        margin: 35px 0px 8px;
        letter-spacing: 0.3px;
      }
      p:last-child {
        color: #6a737c;
        font-size: 12px;
        line-height: 12px;
        margin: 1px 0px 8px;
        letter-spacing: 0.3px;
      }
    }

    a {
      align-self: flex-start;
    }

    button {
      background-color: #0a95ff;
      border-radius: 4px;
      border: 1px solid #0a95ff;
      box-shadow: inset rgb(255, 255, 255) 0px 1px 1px 0px;
      color: #ffffff;
      padding: 11px 12px;
      text-align: center;
      font-size: 13px;
      cursor: pointer;
    }
  }

  .mainbar__filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0px 0px 12px;
    padding: 0px 0px 0px 24px;
    p {
      font-size: 17px;
      margin: 5px 12px 0px 0px;
      /* line-height:22.2308px; */
    }
  }

  .mainbar__filter__btn {
    display: flex;
    align-items: center;
    .nav__btn:not(:last-child) {
      font-size: 12px;
      color: #525960;
      background-color: #ffffff;
      border-color: #9fa6ad;
      border-style: solid;
      border-width: 1px;
      margin: 0px -1px -1px 0px;
      padding: 9.6px;
    }
  }

  .br-l3 {
    border-radius: 3px 0px 0px 3px;
  }

  .br-r3 {
    border-radius: 0px 3px 3px 0px;
  }

  .br3 {
    font-size: 12px;
    border-radius: 3px;
    background-color: #e1ecf4;
    border-color: #7aa7c7;
    border-style: solid;
    border-width: 1px;
    margin: 0px -1px -1px 0px;
    box-shadow: inset rgb(255, 255, 255) 0px 1px 1px 0px;
    color: #39739d;
    padding: 7.1px 12px;
    display: flex;
    align-items: center;
    margin-left: 18px;

    svg {
      font-size: 18px;
    }
  }

  .mainber__lists {
    display: inline-block;
  }

  .mainbar__list {
    padding: 20px 0px 24px 64px;
    display: flex;
    border-top: 1px solid #d6d9dc;
  }

  .mainbar__list__left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0px 16px 4px 0px;
    color: #6a737c;
    position: relative;
    top: -5px;

    p {
      white-space: nowrap;
      margin: 5px 0px;
    }
  }

  .mainbar__list__right {
    width: 90%;
    display: flex;
    flex-direction: column;

    h3 {
      padding: 0px 24px 0px 0px;
      text-align: left;
      margin: -1.95px 0px 6.9998px;
      line-height: 22.2308px;
      font-size: 17px;
      color: #0a95ff;
      font-weight: 400;
    }

    p {
      color: #3b4045;
      margin: -2px 0px 8px;
      font-size: 13px;
      line-height: 17px;

      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2; /* 라인수 */
      overflow: hidden;
      word-wrap: break-word;
      line-height: 1.2em;
      height: 2.4em;
    }
  }

  .mainbar__list__bottom {
    margin-top: 4px;
    display: flex;
    /* flex-wrap: wrap; */
    justify-content: space-between;
    align-items: center;
    gap: 8px 6px;
  }

  .mainbar__list__tag {
    display: flex;
    flex-wrap: wrap;
  }

  .mainbar__list__tag > a {
    background-color: #d0e3f1;
    border: 1px solid #ffffff;
    border-radius: 3px;
    font-size: 12px;
    line-height: 12px;
    margin: 0px 4px 2px 0px;
    padding: 4.8px 6.5px;
    color: #39739d;
  }

  .mainbar__list__profile {
    display: flex;
    align-items: center;
    white-space: nowrap;
    img {
      margin-right: 5px;
      border-radius: 3px;
    }

    a {
      color: #0a95ff;
      margin: 2px;
      font-size: 12px;
      line-height: 12px;
    }

    span {
      color: #6a737c;
      font-size: 12px;
      line-height: 12px;
    }
  }

  .bold {
    margin-left: 3px;
    font-weight: 700;
    color: #525960;
    font-size: 12px;
  }
`;

const SearchPage = ({ cookies, search }) => {
  const location = useLocation();
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(location.search);
  const myQueryParam = searchParams.get("q");
  const [listData, setListData] = useState([]);
  const [currentpage, setCurrentpage] = useState(1);
  const [currenttab, setCurrenttab] = useState(1);
  const navigate = useNavigate();

  const data = () => {
    axios
      .get("http://localhost:8080/questions")
      .then((res) => {
        setListData([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangeName = () => {
    if (search.searchlist !== undefined && search.searchlist.answer !== "") {
      return `answers>=${search.searchlist.answer}`;
    }
    if (search.searchlist !== undefined && search.searchlist.score !== "") {
      return `score>=${search.searchlist.score}`;
    }
    if (search.searchlist !== undefined && search.searchlist.title !== "") {
      return `title = ${search.searchlist.title}`;
    }
    return "none";
  };

  const handleonpage = (e) => {
    navigate(
      `/search?q=${
        search.searchlist.title !== ""
          ? "%1T" + search.searchlist.title + "%1T"
          : ""
      }${
        search.searchlist.tag.length !== 0
          ? "%2T" + search.searchlist.tag.join("+") + "%2T"
          : ""
      }${
        search.searchlist.user.length !== 0
          ? "%1U" + search.searchlist.user.join("+") + "%1U"
          : ""
      }${
        search.searchlist.answer !== ""
          ? "%answer:" + search.searchlist.answer + "%"
          : ""
      }${
        search.searchlist.score !== ""
          ? "%score:" + search.searchlist.score + "%"
          : ""
      }&page=${e}&tab=newest&pagesize=15`
    );
    setCurrentpage(e);
  };
  useEffect(() => {
    data();
    window.scrollTo(0, 0);
  }, [search.searchlist, currentpage]);
  console.log(listData);

  return (
    <Container>
      <div className="mainbar">
        <header className="mainbar__header">
          <div className="search__log">
            <h3>Search Results</h3>
            <p>{`Results for ${
              search.searchtext !== undefined &&
              search.searchtext.replace(
                /(?:answer:\d|score:\d|title:\w|user:\d|\[\])+/gi,
                ""
              )
            }`}</p>
            <p>{`Search options ${onChangeName()}`}</p>
          </div>
          {cookies.accessToken === undefined ? (
            <Link to="/users/login">
              <button>Ask Question</button>
            </Link>
          ) : (
            <Link to="/questions/ask">
              <button>Ask Question</button>
            </Link>
          )}
        </header>
        <div className="mainbar__filter">
          <p>{`${listData.length} questions`}</p>
          <div className="mainbar__filter__btn">
            <button className="nav__btn br-l3">Newest</button>
            <button className="nav__btn">Unanswered</button>
            <button className="nav__btn br-r3">Bountied</button>
            <button className="nav__btn br3">
              <FilterListIcon />
              <span>Filter</span>
            </button>
          </div>
        </div>
        <ul className="mainbar__lists">
          {listData &&
            listData.map((list) => {
              return (
                <li className="mainbar__list" key={list.id}>
                  <div className="mainbar__list__left">
                    <p>{`${list.likeCount} votes`}</p>
                    <p
                      className="mainbar_list_left_answer"
                      style={
                        Number(list.answers.length) > 0
                          ? {
                              color: "white",
                              backgroundColor: "#2f6f44",
                              padding: "3px",
                            }
                          : { border: "none", marginLeft: "3px" }
                      }
                    >{`${list.answers && list.answers.length} answers`}</p>
                    <p
                      style={
                        Number(list.view) < 1000
                          ? { color: "#6a737c" }
                          : Number(list.view) < 1000000
                          ? { color: "#922024", fontWeight: "400" }
                          : { color: "#922024", fontWeight: "700" }
                      }
                    >{`${
                      Number(list.view) < 1000
                        ? list.view
                        : Number(list.view) < 1000000
                        ? String(parseInt(Number(list.view) / 1000)) + "k"
                        : String(Number(list.view) / 1000000).slice(0, 3) + "m"
                    } views`}</p>
                  </div>
                  <div className="mainbar__list__right">
                    <Link to={`/questions/${list.id}`}>
                      <h3>{list.title}</h3>
                    </Link>
                    <p>{`${list.body.replace(
                      /(<([^>]+)>)/gi,
                      ""
                    )} ${list.bodyDetail.replace(/(<([^>]+)>)/gi, "")}`}</p>
                    <div className="mainbar__list__bottom">
                      <div className="mainbar__list__tag">
                        {list.tags.map((el, idx) => {
                          return (
                            <a href="/" key={idx}>
                              {el}
                            </a>
                          );
                        })}
                      </div>
                      <div className="mainbar__list__profile">
                        <img
                          referrerPolicy="no-referrer"
                          src="https://www.gravatar.com/avatar/8bd2f875b6f6e30511b9dd6bfab40f38?s=256&d=identicon&r=PG"
                          width="16px"
                          alt="profile"
                        />
                        <Link to="/users/id/userName">{list.display_name}</Link>
                        <span>
                          <span className="bold">0</span>{" "}
                          {`asked ${onSaveTime(list.created_at)}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
        <Pagination
          activePage={currentpage} // 현재 페이지
          itemsCountPerPage={15} // 한 페이지랑 보여줄 아이템 갯수
          totalItemsCount={450} // 총 아이템 갯수
          pageRangeDisplayed={5} // paginator의 페이지 범위
          prevPageText={"‹"} // "이전"을 나타낼 텍스트
          nextPageText={"›"} // "다음"을 나타낼 텍스트
          onChange={handleonpage} // 페이지 변경을 핸들링하는 함수
        />
      </div>
    </Container>
  );
};

export default SearchPage;
