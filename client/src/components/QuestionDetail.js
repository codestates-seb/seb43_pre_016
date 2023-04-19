import axios from "axios";
import ReactQuill, { contextType } from "react-quill";
import "quill/dist/quill.snow.css";
import { height } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import Loading from "./Loading";

import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";

const content =
  "<blockquote><strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, q</strong>uis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</blockquote>";
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
];

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1100px;
  width: calc(100% - 164px);
  margin-left: 164px;
  padding: 24px 0px 0px 24px;

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

    button {
      align-self: flex-start;
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
// 작업 공간 구별
const Answerwrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding: 10px;

  .answer_count {
    border-bottom: 2px solid #f6f6f6;
    font-size: 25px;
    padding: 5px;
    margin-bottom: 15px;
  }
  .main {
    display: flex;
    flex-direction: row;
    padding-bottom: 30px;
    border-bottom: 2px solid #f6f6f6;
    .count {
      display: flex;
      flex-direction: column;
      margin-right: 10px;
      color: #babfc4;
      h1 {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
      }
      span svg {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 50px;
      }
      label {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      padding-right: 70px;
      .right_bottom {
        display: flex;
        justify-content: space-between;
        .buttons {
          display: flex;
          flex: 1;
        }
        .edit {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 10px;
          border: 1px solid black;
          border-radius: 3px;
          padding: 10px 20px;
          width: 100px;
          font-size: 20px;
          font-weight: 500;
        }
        .answer_profile {
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 5px;
          width: 15vw;
          padding: 5px;
          border: 1px solid black;
          border-radius: 3px;
          flex-direction: column;
          .photo_zone {
            display: flex;
            a {
              margin-left: 5px;
            }
          }
        }
      }
    }
  }
`;
const Answereditor = styled.section`
  display: flex;
  flex-direction: column;
  padding-right: 70px;
`;
const customStyle = {
  display: "flex",
  fontFamily: "Arial",
  fontSize: "16px",
  fontWeight: "normal",
  height: "250px",
  lineHeight: "1.5",
  marginBottom: "15px",
};

const QuestionWrapper = styled.section`
  display: flex;
  flex-direction: column;

  .detail__header {
    border-bottom: 1px solid #d6d9dc;
  }
`;

const QuestionDetail = () => {
  const [questionData, setQuestionData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [answer, setAnswer] = useState("");

  console.log(questionData);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://api.stackexchange.com/2.3/questions/${id}?pagesize=50&order=desc&sort=creation&site=stackoverflow&filter=!T3zRPxfHcI6S3(Y6fa`
      )
      .then((res) => {
        const data = res.data.items;
        setQuestionData({ ...data[0] });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <DetailWrapper>
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
              <span>1 days ago</span>
            </div>
            <div className="info">
              <span>Modified</span>
              <span>today</span>
            </div>
            <div className="info">
              <span>Viewed</span>
              <span>9 times</span>
            </div>
          </div>
        </div>
        {/* 여기에 질문 내용이 보이게하는 코드 작성 */}
      </QuestionWrapper>
      <Answerwrapper>
        <div className="answer_count">1 Answer</div>
        <section className="main">
          <span className="count">
            <span>
              <ArrowDropUpIcon />
              <h1>1</h1>
              <ArrowDropDownIcon />
            </span>
            <label>
              <BookmarkBorderOutlinedIcon />
            </label>
          </span>
          <span></span>
          <section className="right">
            <ReactQuill
              theme="snow"
              style={customStyle}
              value={content}
              modules={readOnlyModules}
              readOnly
            />
            <div className="right_bottom">
              <div className="buttons">
                <span className="edit">Edit</span>
                <span className="edit">Follow</span>
              </div>
              <span className="answer_profile">
                <div>asdasdasd</div>
                <div className="photo_zone">
                  asdsd<a>dasdsd</a>
                </div>
              </span>
            </div>
          </section>
        </section>
      </Answerwrapper>
      <Answereditor>
        <span>Your Answer</span>
        <div style={{ height: "235px" }}>
          <ReactQuill
            theme="snow"
            style={{ height: "200px" }}
            value={answer}
            modules={modules}
            formats={formats}
            onChange={setAnswer}
          />
        </div>
      </Answereditor>
    </DetailWrapper>
  );
};

export default QuestionDetail;
