import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Link, useNavigate } from "react-router-dom";
import onSaveTime from "../../features/onSaveTime";
import axios from "axios";
import "./Paging.css";
import Pagination from "react-js-pagination";
import { padding } from "@mui/system";

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

    h3 {
      font-weight: 400;
      /* line-height:35.1px */
      font-size: 26px;
      margin: 0px 12px 12px 0px;
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
    .ActBtn {
      background-color: #e3e6e8 !important;
    }
    .nav__btn:not(:last-child) {
      cursor: pointer;
      font-size: 12px;
      color: #525960;
      background-color: #ffffff;
      border-color: #9fa6ad;
      border-style: solid;
      border-width: 1px;
      margin: 0px -1px -1px 0px;
      padding: 9.6px;
    }
    .nav__btn:not(:last-child):hover {
      background-color: #eeeeee;
    }
  }

  .br-l3 {
    border-radius: 3px 0px 0px 3px;
  }

  .br-r3 {
    border-radius: 0px 3px 3px 0px;
  }

  .br3 {
    cursor: pointer;
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
  .mainbar_list_left_answer {
    border-radius: 3px;
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
      cursor: pointer;
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

const Questions = ({ cookies }) => {
  const navigate = useNavigate();
  const [listData, setListData] = useState([]);
  const [dataLength, setDataLength] = useState([]); // 데이터의 전체 개수 저장
  const [currentpage, setCurrentpage] = useState(1);
  const [ActBtn, setActBtn] = useState(1);
  console.log(listData);

  // 백엔드 서버 관련 코드
  const data = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/questions${
          "?page=" + currentpage + "&size=15"
        }`
      )
      .then((res) => {
        setListData([...res.data.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    navigate(
      `/questions${
        "?tab=" +
        (ActBtn === 1
          ? "newest"
          : ActBtn === 2
          ? "unanswered"
          : ActBtn === 3
          ? "viewed"
          : ActBtn === 4
          ? "voted"
          : "")
      }${currentpage === 1 ? "" : "?page=" + currentpage + "&size=15"}`
    );
    data();
    getDataLength();
  }, [currentpage]); //임시 서버에서는 ActBtn을 배열에 넣어두면 정렬이 되지않음.

  const getDataLength = () => {
    axios.get(`/questions?page=1&size=10000`).then((res) => {
      setDataLength([...res.data.data]);
    });
  };

  const handleonpage = (e) => {
    setCurrentpage(e);
    window.scrollTo(0, 0);
  };
  //사이드바 선택 시 css스타일 적용
  const className1 = useMemo(() => {
    return {
      Newest: ActBtn === 1 ? "ActBtn" : "",
      Unanswered: ActBtn === 2 ? "ActBtn" : "",
      Viewed: ActBtn === 3 ? "ActBtn" : "",
      Voted: ActBtn === 4 ? "ActBtn" : "",
    };
  }, [ActBtn]);
  // 생성일(created_at) 순서
  const sortByNewest = () => {
    listData.sort((b, a) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateA - dateB;
    });
  };

  // 답변(answer)없는 순서
  const sortByAnswerCount = () => {
    listData.sort((a, b) => a.answers.length - b.answers.length);
  };
  //뷰(view)순서
  const sortByViewCount = () => {
    listData.sort((a, b) => b.view - a.view);
  };

  //추천(vote)순서
  const sortByVoteCount = () => {
    listData.sort((a, b) => b.likeCount - a.likeCount);
  };

  return (
    <Container>
      <div className="mainbar">
        <header className="mainbar__header">
          <h3>All Questions</h3>
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
          <p>{`${dataLength && dataLength.length} questions`}</p>
          <div className="mainbar__filter__btn">
            <button
              className={`nav__btn br-l3 ${className1.Newest}`}
              onClick={(e) => {
                e.preventDefault();
                // navigate("/questions?tab=newest");
                setActBtn(1);
                sortByNewest();
              }}
            >
              Newest
            </button>
            <button
              className={`nav__btn ${className1.Unanswered}`}
              onClick={(e) => {
                e.preventDefault();
                setActBtn(2);
                sortByAnswerCount();
              }}
            >
              Unanswered
            </button>
            <button
              className={`nav__btn ${className1.Viewed}`}
              onClick={(e) => {
                e.preventDefault();
                setActBtn(3);
                sortByViewCount();
              }}
            >
              Viewed
            </button>
            <button
              className={`nav__btn br-r3 ${className1.Voted}`}
              onClick={(e) => {
                e.preventDefault();
                setActBtn(4);
                sortByVoteCount();
              }}
            >
              Voted
            </button>
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
                <li className="mainbar__list" key={list.questionId}>
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
                          : { border: "none" }
                      }
                    >{`${list.answers && list.answers.length} answers`}</p>
                    <p
                      style={
                        list.view
                          ? Number(list.view) < 1000
                            ? { color: "#6a737c" }
                            : Number(list.view) < 1000000
                            ? { color: "#922024", fontWeight: "400" }
                            : { color: "#922024", fontWeight: "700" }
                          : { color: "#6a737c" }
                      }
                    >
                      {list.view
                        ? `${
                            Number(list.view) < 1000
                              ? list.view
                              : Number(list.view) < 1000000
                              ? String(parseInt(Number(list.view) / 1000)) + "k"
                              : String(Number(list.view) / 1000000).slice(
                                  0,
                                  3
                                ) + "m"
                          } views`
                        : "0 views"}
                    </p>
                  </div>
                  <div className="mainbar__list__right">
                    <Link to={`/questions/${list.questionId}`}>
                      <h3>{list.title}</h3>
                    </Link>
                    <p>{`${list.body.replace(
                      /(<([^>]+)>)/gi,
                      ""
                    )} ${list.bodyDetail.replace(/(<([^>]+)>)/gi, "")}`}</p>
                    <div className="mainbar__list__bottom">
                      <div className="mainbar__list__tag">
                        {list.tags &&
                          list.tags.map((el, idx) => {
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
                        <Link to="/users/id/userName">{list.createdBy}</Link>
                        <span>
                          <span className="bold">0</span>{" "}
                          {`asked ${onSaveTime(list.createdAt)}`}
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
          totalItemsCount={dataLength.length} // 총 아이템 갯수
          pageRangeDisplayed={5} // paginator의 페이지 범위
          prevPageText={"‹"} // "이전"을 나타낼 텍스트
          nextPageText={"›"} // "다음"을 나타낼 텍스트
          onChange={handleonpage} // 페이지 변경을 핸들링하는 함수
        />
      </div>
    </Container>
  );
};

export default Questions;
