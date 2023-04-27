import {
  Cake,
  AccessTime,
  DateRange,
  CollectionsOutlined,
  CropLandscapeSharp,
} from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
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

const UserBox = () => {
  const [userData, setUserData] = useState({});
  console.log(userData);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/1`)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // 예외처리,
  if (!userData.answers || !userData.questions) {
    return null; // or return loading indicator
  }

  //유저 이름
  const UserName = userData.userName;
  // //유저 QnA Data
  const creationAnswer = userData.answers;
  const creationQuestions = userData.questions;
  const getLastCreatedData = (items) => {
    const lastItem = items.reduce((a, b) =>
      a.createdAt > b.createdAt ? a : b
    );
    return new Date(lastItem.createdAt);
  };
  const getLastCreatedDataAnsewr = (items) => {
    const lastItem = items.reduce((a, b) =>
      a.crestedAt > b.crestedAt ? a : b
    );
    return new Date(lastItem.crestedAt);
  };

  const lastSeen = () => {
    const now = new Date();
    //answers, questions data 입력
    const lastAnswerDate = getLastCreatedDataAnsewr(creationAnswer);
    const lastQuestionDate = getLastCreatedData(creationQuestions);

    if (!lastAnswerDate && !lastQuestionDate) return "No recent activity";
    if (!lastAnswerDate) {
      const diffTime = Math.abs(now - lastQuestionDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `last seen ${diffDays} days ago`;
    }
    if (!lastQuestionDate) {
      const diffTime = Math.abs(now - lastAnswerDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `last seen ${diffDays} days ago`;
    }
    const diffTimeAnswer = Math.abs(now - lastAnswerDate);
    const diffTimeQuestion = Math.abs(now - lastQuestionDate);
    const diffDaysAnswer = Math.ceil(diffTimeAnswer / (1000 * 60 * 60 * 24));
    const diffDaysQuestion = Math.ceil(
      diffTimeQuestion / (1000 * 60 * 60 * 24)
    );
    const diffDays = Math.min(diffDaysAnswer, diffDaysQuestion);
    if (diffDays === 0) {
      const diffHoursAnswer = Math.ceil(diffTimeAnswer / (1000 * 60 * 60));
      const diffHoursQuestion = Math.ceil(diffTimeQuestion / (1000 * 60 * 60));
      if (diffHoursAnswer === 0 && diffHoursQuestion === 0) {
        const diffMinsAnswer = Math.ceil(diffTimeAnswer / (1000 * 60));
        const diffMinsQuestion = Math.ceil(diffTimeQuestion / (1000 * 60));
        const diffMins = Math.min(diffMinsAnswer, diffMinsQuestion);
        return `last seen ${diffMins} mins ago`;
      } else {
        const diffHours = Math.min(diffHoursAnswer, diffHoursQuestion);
        return `last seen ${diffHours} hours ago`;
      }
    } else {
      return `last seen ${diffDays} days ago`;
    }
  };

  // //유저 생성일
  // const millisecondsPerDay = 1000 * 60 * 60 * 24;
  // // 1 day = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
  // const daysSinceCreation = Math.floor(
  //   (Date.now() - new Date(creationDate)) / millisecondsPerDay
  // );
  return (
    <UserBoxLayout>
      <div className="Avatar">image</div>
      <div className="userContainer">
        <div className="userName">{UserName ? UserName : "anonymous"}</div>
        <div className="userInfo">
          <div className="creationDate">
            {/* <Cake className="icon" /> Member for {daysSinceCreation}{" "}
            {daysSinceCreation === 1 ? "day" : "days"} */}
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
