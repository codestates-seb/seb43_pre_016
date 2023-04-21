import styled from "styled-components";

const MainContentForm = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  text {
    font-size: 21px;
  }
  .stats-container {
    margin: 12px;
    width: 25%;
    .stats-box {
      border: 1px solid hsl(210, 8%, 85%);
      margin-top: 8px;
      width: 100%;
      height: 128px;
      padding: 5px;
      padding-bottom: 13px;
      border-radius: 5px;
      .inner-box {
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        box-sizing: border-box;
        .content-box {
          margin: 8px;
          width: 66px;
          height: 39px;
          font-size: 13px;
          word-wrap: break-word;
          flex-grow: 1;
          .count {
            font-size: 17px;
          }
          .sideText {
            color: gray;
            font-size: 13px;
          }
        }
      }
    }
  }
  .AQnAContainer {
    margin: 12px;
    width: 75%;
    .AboutBox {
      border: 1px solid hsl(210, 8%, 85%);
      background-color: #f8f9f9;
      width: 100%;
      height: 170px;
      margin-top: 8px;
      border-radius: 5px;
      margin-bottom: 24px;
    }
    .QnAContainer {
      width: 100%;
      height: 450px;
      margin-top: 8px;
      display: flex;
      .AtextBox {
        width: 50%;
        height: 450px;
        margin-right: 20px;
        .ABox {
          border: 1px solid hsl(210, 8%, 85%);
          width: 100%;
          height: 265px;
          border-radius: 5px;
          margin-top: 8px;
          .AnswerForm {
            border-bottom: 1px solid hsl(210, 8%, 85%);
            width: 100%;
            height: 20%;
            display: flex;
            flex-direction: column;
            .Answer {
              margin: 12px 6px 13px 6px;
              display: inline-flex;
              align-items: center;
              flex-wrap: wrap;
              .vote-badge {
                width: 38px;
                height: 26px;
                background-color: #5eba7d;
                border-radius: 3px;
                margin-right: 10px;
                color: #ffffff;
                font-size: 12px;
                justify-content: center;
                display: flex;
                align-items: center;
              }
              .answerLink {
                font-size: 13px;
                color: #0a95ff;
                flex-grow: 1;
                max-width: 50%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .answerDate {
                font-size: 12px;
                color: #6a737c;
                margin-left: auto;
              }
            }
          }
        }
      }
      .QtextBox {
        width: 50%;
        height: 450px;
        .QBox {
          border: 1px solid hsl(210, 8%, 85%);
          width: 100%;
          height: 265px;
          border-radius: 5px;
          margin-top: 8px;
          .AnswerForm {
            border-bottom: 1px solid hsl(210, 8%, 85%);
            width: 100%;
            height: 20%;
            display: flex;
            flex-direction: column;
            .Answer {
              margin: 12px 6px 13px 6px;
              display: inline-flex;
              align-items: center;
              flex-wrap: wrap;
              .vote-badge {
                width: 38px;
                height: 26px;
                background-color: #5eba7d;
                border-radius: 3px;
                margin-right: 10px;
                color: #ffffff;
                font-size: 12px;
                justify-content: center;
                display: flex;
                align-items: center;
              }
              .answerLink {
                font-size: 13px;
                color: #0a95ff;
                flex-grow: 1;
                max-width: 50%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .answerDate {
                font-size: 12px;
                color: #6a737c;
                margin-left: auto;
              }
            }
          }
        }
      }
    }
  }
`;
const MainContent = () => {
  // Answer Question
  let AnswerForm = (
    <div className="AnswerForm">
      <div className="Answer">
        <div className="vote-badge">6</div>
        <a className="answerLink" href="/users/idNumber/username">
          Is there a faster way to loop through...
        </a>
        <div className="answerDate">Nov 19, 2022</div>
      </div>
    </div>
  );

  return (
    <MainContentForm>
      <div className="stats-container">
        {/* Stats */}
        <text>Stats</text>
        <div className="stats-box">
          <div className="inner-box">
            <div className="content-box">
              <div className="count">1</div>
              <div className="sideText">reputation</div>
            </div>
            <div className="content-box">
              <div className="count">1</div>
              <div className="sideText">reached</div>
            </div>
            <div className="content-box">
              <div className="count">1</div>
              <div className="sideText">answers</div>
            </div>
            <div className="content-box">
              <div className="count">1</div>
              <div className="sideText">qustions</div>
            </div>
          </div>
        </div>
      </div>
      <div className="AQnAContainer">
        <div className="AboutContainer">
          {/* About */}
          <text>About</text>
          <div className="AboutBox"></div>
        </div>

        <div className="QnAContainer">
          <div className="AtextBox">
            {/* Answers */}
            <text>Answers</text>
            <div className="ABox">{AnswerForm}</div>
          </div>
          <div className="QtextBox">
            {/* Questions */}
            <text>Questions</text>
            <div className="QBox">{AnswerForm}</div>
          </div>
        </div>
      </div>
    </MainContentForm>
  );
};

export default MainContent;
