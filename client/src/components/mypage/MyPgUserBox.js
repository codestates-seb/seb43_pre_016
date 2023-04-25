import { Cake, AccessTime, DateRange } from "@mui/icons-material";
import styled from "styled-components";

const UserBoxLayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  .Avatar {
    border: 1px solid hsl(210, 8%, 85%);
    border-radius: 5px;
    width: 128px;
    height: 128px;
    margin: 8px;
  }
  .userContainer {
    margin: 8px;
    .userName {
      color: #232629;
      font-size: 34px;
      text-align: left;
      margin: 4px 4px 12px;
    }
    .userInfo {
      color: #6a737c;
      font-size: 13px;
      text-align: left;
      display: flex;
      .lastSeen {
        margin-right: 8px;
        margin-left: 8px;
      }
      .icon {
        font-size: 16px;
      }
    }
  }
`;
const answers = {
  updated_at: "2023-04-11T16:17:50.432Z",
};
const questions = {
  updated_at: "2023-04-19T09:55:36.200Z",
};

const UserBox = () => {
  const lastSeen = () => {
    const now = new Date();
    //answers, questions data 입력
    const answerDate = new Date(answers.updated_at);
    const questionDate = new Date(questions.updated_at);
    const diffTimeAnswer = Math.abs(now - answerDate);
    const diffTimeQuestion = Math.abs(now - questionDate);
    const diffDaysAnswer = Math.ceil(diffTimeAnswer / (1000 * 60 * 60 * 24));
    const diffDaysQuestion = Math.ceil(
      diffTimeQuestion / (1000 * 60 * 60 * 24)
    );
    if (diffDaysAnswer <= diffDaysQuestion) {
      if (diffDaysAnswer === 0) {
        const diffHours = Math.ceil(diffTimeAnswer / (1000 * 60 * 60));
        if (diffHours === 0) {
          const diffMins = Math.ceil(diffTimeAnswer / (1000 * 60));
          return `last seen ${diffMins} mins ago`;
        } else {
          return `last seen ${diffHours} hours ago`;
        }
      } else {
        return `last seen ${diffDaysAnswer} days ago`;
      }
    } else {
      if (diffDaysQuestion === 0) {
        const diffHours = Math.ceil(diffTimeQuestion / (1000 * 60 * 60));
        if (diffHours === 0) {
          const diffMins = Math.ceil(diffTimeQuestion / (1000 * 60));
          return `last seen ${diffMins} mins ago`;
        } else {
          return `last seen ${diffHours} hours ago`;
        }
      } else {
        return `last seen ${diffDaysQuestion} days ago`;
      }
    }
  };
  //최근 들어온 날짜
  const creationDate = "2023-04-16T10:30:00.000Z";
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  // 1 day = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
  const daysSinceCreation = Math.floor(
    (Date.now() - new Date(creationDate)) / millisecondsPerDay
  );
  return (
    <UserBoxLayout>
      <div className="Avatar">image</div>
      <div className="userContainer">
        <div className="userName">userName</div>
        <div className="userInfo">
          <div className="creationDate">
            <Cake className="icon" /> Member for {daysSinceCreation}{" "}
            {daysSinceCreation === 1 ? "day" : "days"}
          </div>
          <div className="lastSeen">
            <AccessTime className="icon" /> {lastSeen()}
          </div>
          <div className="visitDay">
            <DateRange className="icon" /> Visited 5 days, 4 consecutive
          </div>
        </div>
      </div>
    </UserBoxLayout>
  );
};
export default UserBox;
