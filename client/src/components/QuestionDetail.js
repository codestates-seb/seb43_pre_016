import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

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

const QuestionDetail = () => {
  const [questionData, setQuestionData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(
        `https://api.stackexchange.com/2.3/questions/${id}?pagesize=50&order=desc&sort=creation&site=stackoverflow&filter=!T3zRPxfHcI6S3(Y6fa`
      )
      .then((res) => {
        const data = res.data.items;
        return setQuestionData([...data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <DetailWrapper>
      <div className="detail__question1">
        <header className="mainbar__header">
          <h3>Hello!</h3>
          <button>Ask Question</button>
        </header>
        <div className="question__info">
          <div className="info">
            <span>Asked</span>
            <span>today</span>
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
      {/* 작업 공간 구별 */}
      <div className="detail__question2"></div>
    </DetailWrapper>
  );
};

export default QuestionDetail;
