import axios from "axios";
import ReactQuill, { contextType } from "react-quill";
import "quill/dist/quill.snow.css";
import { height } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import Loading from "./Loading";
import onSaveTime from "../features/onSaveTime";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["code-block"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const readOnlyModules = {
  toolbar: false, // 툴바를 비활성화합니다.
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "code-block",
];

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1100px;
  width: calc(100% - 164px);
  margin-left: 164px;
  padding: 24px 0px 0px 24px;

  h2 {
    font-size: 19px;
    line-height: 24.7px;
    margin: 0px 0px 19px;
    padding: 20px 0px 0px;
    font-weight: 400;
  }

  .mainbar__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0px 15px 3px 4px;

    h3 {
      color: #3b4045;
      max-width: 917px;
      font-weight: 400;
      font-size: 26px;
      margin: 0px 0px 8px;
      line-height: 35.1px;
    }

    a {
      align-self: flex-start;
    }

    a > button {
      white-space: nowrap;
      min-width: 103px;
      max-height: 39.5px;
      background-color: #0a95ff;
      border-radius: 4px;
      border: 1px solid #0a95ff;
      box-shadow: inset rgb(255, 255, 255) 0px 1px 1px 0px;
      color: #ffffff;
      padding: 11px 12px;
      text-align: center;
      font-size: 13px;
    }
  }

  .question__info {
    display: flex;
    align-items: center;
    font-size: 13px;
    margin: 0px 15px 15px 4px;

    span:first-child {
      color: #6a737c;
      line-height: 17px;
      margin: 0px 6px 0px 0px;
    }

    span:last-child {
      margin-right: 18px;
    }
  }
`;

const QuestionWrapper = styled.section`
  display: flex;
  flex-direction: column;

  .detail__header {
    border-bottom: 1px solid #d6d9dc;
  }
`;

const QuestionEditor = styled.section`
  display: flex;
  padding: 10px 100px 10px 10px;

  .votes {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px 16px 0px 0px;
  }

  button {
    border: none;
    background: none;
    margin: 2px;
    text-align: center;
    align-items: flex-start;

    svg {
      path {
        fill: #babfc4;
        color: #babfc4;
      }
    }
  }

  label {
    svg {
      color: #babfc4;
    }
  }

  .vote {
    display: flex;
    justify-content: center;
    font-size: 21px;
    color: #6a737c;
    line-height: 27.4615px;
    margin: 2px;
  }

  .question__main {
    display: flex;
    flex-direction: column;

    .ql-container {
      border: none;
      font-size: 15px;
    }

    .ql-snow .ql-editor pre.ql-syntax {
      background-color: #f6f6f6;
      color: #2f3337;
      font-family: ui-monospace;
    }

    .list__tags {
      display: flex;
      flex-wrap: wrap;
      margin: 12px 12px 22px 12px;
      .list__tag > a {
        background-color: #d0e3f1;
        border: 1px solid #ffffff;
        border-radius: 3px;
        font-size: 12px;
        line-height: 12px;
        margin: 0px 4px 2px 0px;
        padding: 4.8px 6.5px;
        color: #39739d;
      }
    }

    .right_bottom {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .buttons {
        display: flex;
        flex: 1;
      }
      .edit {
        margin: 12px 0px 12px 12px;
        color: #838c95;
        font-size: 13px;
        font-weight: 400;
      }
      .answer_profile {
        position: absolute;
        right: 22rem;
        width: 200px;
        max-width: 204px;
        background-color: #d9e9f7;
        display: flex;
        flex-direction: column;
        padding: 5px 6px 7px 7px;
        border-radius: 3px;

        .user-profile {
          display: flex;

          .user-details {
            margin: 0px 0px 0px 8px;
            a {
              color: #0a95ff;
            }
          }
        }

        .user-action-time {
          color: #6a737c;
          font-size: 12px;
          line-height: 15.6923px;
          margin: 1px 0px 4px;
        }
      }
    }
  }
`;

// 작업 공간 구별
const Answerwrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding: 10px;

  .answer_count {
    font-weight: 400;
    font-size: 19px;
    line-height: 24.7px;
    margin-bottom: 15px;
  }
  .main {
    display: flex;
    flex-direction: row;
    padding-bottom: 30px;
    border-bottom: 2px solid #f6f6f6;

    .votes {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0px 16px 0px 0px;
    }

    button {
      border: none;
      background: none;
      margin: 2px;
      text-align: center;
      align-items: flex-start;

      svg {
        path {
          fill: #babfc4;
          color: #babfc4;
        }
      }
    }

    label {
      svg {
        color: #babfc4;
      }
    }

    .vote {
      display: flex;
      justify-content: center;
      font-size: 21px;
      color: #6a737c;
      line-height: 27.4615px;
      margin: 2px;
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    padding-right: 70px;

    .ql-container {
      border: none;
      font-size: 15px;
    }

    .ql-snow .ql-editor pre.ql-syntax {
      background-color: #f6f6f6;
      color: #2f3337;
      font-family: ui-monospace;
    }

    .right_bottom {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .buttons {
        display: flex;
        flex: 1;
      }
      .edit {
        margin: 12px 0px 12px 12px;
        color: #838c95;
        font-size: 13px;
        font-weight: 400;
      }
      .answer_profile {
        position: absolute;
        right: 22rem;
        width: 200px;
        max-width: 204px;
        /* background-color: #d9e9f7; */
        display: flex;
        flex-direction: column;
        padding: 5px 6px 7px 7px;
        border-radius: 3px;

        .user-profile {
          display: flex;

          .user-details {
            margin: 0px 0px 0px 8px;
            a {
              color: #0a95ff;
            }
          }
        }

        .user-action-time {
          color: #6a737c;
          font-size: 12px;
          line-height: 15.6923px;
          margin: 1px 0px 4px;
        }
      }
    }
  }
`;
const Answereditor = styled.section`
  padding: 10px 50px 10px 10px;

  .post-btn {
    margin-top: 25px;
    white-space: nowrap;
    min-width: 129px;
    min-height: 45px;
    background-color: #0a95ff;
    border-radius: 4px;
    border: 1px solid #0a95ff;
    box-shadow: inset rgb(255, 255, 255) 0px 1px 1px 0px;
    color: #ffffff;
    padding: 10.4px;
    text-align: center;
    font-size: 13px;
  }

  .post-bottom {
    font-size: 17px;
    line-height: 23.8px;
    margin-top: 30px;
    margin-bottom: 10rem;

    a:not(:last-child) {
      background-color: #d0e3f1;
      border: 1px solid #ffffff;
      border-radius: 3px;
      font-size: 12px;
      line-height: 12px;
      margin: 0px 2px 5px 2px;
      padding: 4.8px 6.5px;
      color: #39739d;
    }

    a:last-child {
      color: #0074cc;
    }
  }
`;
const customStyle = {
  display: "flex",
  fontFamily: "Arial",
  fontSize: "16px",
  fontWeight: "normal",
  lineHeight: "1.5",
  marginBottom: "15px",
};

const QuestionDetail = () => {
  const [questionData, setQuestionData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [answer, setAnswer] = useState("");
  console.log(id);
  console.log(questionData);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:8080/questions/${id}`)
      .then((res) => {
        setQuestionData({ ...res.data });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`http://localhost:8080/answers/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <DetailWrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <QuestionWrapper>
            <div className="detail__header">
              <header className="mainbar__header">
                <h3>{questionData.title}</h3>
                <Link to="/questions/ask">
                  <button>Ask Question</button>
                </Link>
              </header>
              <div className="question__info">
                <div className="info">
                  <span>Asked</span>
                  <span>{`${onSaveTime(questionData.created_at)}`}</span>
                </div>
                <div className="info">
                  <span>Modified</span>
                  <span> {`${onSaveTime(questionData.updated_at)}`}</span>
                </div>
                <div className="info">
                  <span>Viewed</span>
                  <span>{`${questionData.view} times`}</span>
                </div>
              </div>
            </div>
            <QuestionEditor>
              <div className="votes">
                <button className="upvote__btn">
                  <svg
                    aria-hidden="true"
                    className="svg-icon iconArrowUpLg"
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                  >
                    <path d="M2 25h32L18 9 2 25Z"></path>
                  </svg>
                </button>
                <div className="vote">{questionData.vote_count}</div>
                <button className="downvote__btn">
                  <svg
                    aria-hidden="true"
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                  >
                    <path d="M2 11h32L18 27 2 11Z"></path>
                  </svg>
                </button>
                <label>
                  <BookmarkBorderOutlinedIcon />
                </label>
              </div>
              <div className="question__main">
                <ReactQuill
                  theme="snow"
                  style={customStyle}
                  value={`${questionData.body_detail} ${questionData.body_try}`}
                  modules={readOnlyModules}
                  readOnly
                />
                <ul className="list__tags">
                  {questionData.tags &&
                    questionData.tags.map((el, idx) => {
                      return (
                        <li className="list__tag" key={idx}>
                          <a href="/">{el}</a>
                        </li>
                      );
                    })}
                </ul>
                <div className="right_bottom">
                  <div className="buttons">
                    <Link
                      className="edit"
                      to={`/questions/${questionData.id}/edit`}
                    >
                      Edit
                    </Link>
                    <a className="edit" href="/">
                      Follow
                    </a>
                  </div>
                  <div className="answer_profile">
                    <div className="user-action-time">asked 50 mins ago</div>
                    <div className="user-profile">
                      <img
                        src="https://www.gravatar.com/avatar/8bd2f875b6f6e30511b9dd6bfab40f38?s=256&d=identicon&r=PG"
                        width="32px"
                        height="32px"
                      />
                      <div className="user-details">
                        <a href="/">{questionData.display_name}</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </QuestionEditor>
          </QuestionWrapper>
          {questionData.answers !== undefined &&
            questionData.answers.length !== 0 && (
              <h2 className="answer_count">
                {questionData.answers !== undefined &&
                  `${questionData.answers.length} Answer`}
              </h2>
            )}
          <ul>
            {questionData.answers !== undefined &&
              questionData.answers.map((answer) => {
                return (
                  <li key={answer.answer_id}>
                    <Answerwrapper>
                      <section className="main">
                        <div className="votes">
                          <button className="upvote__btn">
                            <svg
                              aria-hidden="true"
                              className="svg-icon iconArrowUpLg"
                              width="36"
                              height="36"
                              viewBox="0 0 36 36"
                            >
                              <path d="M2 25h32L18 9 2 25Z"></path>
                            </svg>
                          </button>
                          <div className="vote">{answer.vote_count}</div>
                          <button className="downvote__btn">
                            <svg
                              aria-hidden="true"
                              width="36"
                              height="36"
                              viewBox="0 0 36 36"
                            >
                              <path d="M2 11h32L18 27 2 11Z"></path>
                            </svg>
                          </button>
                          <label>
                            <BookmarkBorderOutlinedIcon />
                          </label>
                        </div>
                        <section className="right">
                          <ReactQuill
                            theme="snow"
                            style={customStyle}
                            value={answer.detail}
                            modules={readOnlyModules}
                            readOnly
                          />
                          <div className="right_bottom">
                            <div className="buttons">
                              <a className="edit" href="/">
                                Edit
                              </a>
                              <a className="edit" href="/">
                                Follow
                              </a>
                            </div>
                            <div className="answer_profile">
                              <div className="user-action-time">
                                {`answered 50 mins ago`}
                              </div>
                              <div className="user-profile">
                                <img
                                  src="https://www.gravatar.com/avatar/8bd2f875b6f6e30511b9dd6bfab40f38?s=256&d=identicon&r=PG"
                                  width="32px"
                                  height="32px"
                                />
                                <div className="user-details">
                                  <a href="/">{answer.display_name}</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </section>
                    </Answerwrapper>
                  </li>
                );
              })}
          </ul>
          <Answereditor>
            <h2>Your Answer</h2>
            <div style={{ height: "235px", maxWidth: "850px" }}>
              <ReactQuill
                theme="snow"
                style={{ height: "200px" }}
                value={answer}
                modules={modules}
                formats={formats}
                onChange={setAnswer}
              />
            </div>
            <button className="post-btn">Post Your Answer</button>
            {/* 나중에 답변이 달리면 태그를 분기해줘야함. */}
            <p className="post-bottom">
              Not the answer you are looking for? Browse other questions tagged
              <a>javascript</a>
              <a>css</a>
              <a>html</a> or&nbsp;
              <Link to="/questions/ask">ask your own question.</Link>
            </p>
          </Answereditor>
        </>
      )}
    </DetailWrapper>
  );
};

export default QuestionDetail;
