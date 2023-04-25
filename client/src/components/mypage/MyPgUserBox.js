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
  const [userData, setUserData] = useState([]);
  const data = () => {
    axios
      .get(`http://localhost:8080/users`)
      .then((res) => {
        setUserData([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    data();
  }, []);

  //유저 이름
  const UserDisplayName = ({ userId }) => {
    const user = userData.find((u) => u.id === userId);
    return <div className="userName">{user ? user.userName : ""}</div>;
  };

  //유저 생성일
  const creationDate = userData[0]?.createdAt;

  //유저 최근 활동일
  const creationAnswer = userData[0]?.answers[0]?.createdAt;
  const creationQuestions = userData[0]?.questions[0]?.createdAt;

  const lastSeen = () => {
    const now = new Date();
    //answers, questions data 입력
    const answerDate = new Date(creationAnswer);
    const questionDate = new Date(creationQuestions);
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

  //유저 최근 활동일
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  // 1 day = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
  const daysSinceCreation = Math.floor(
    (Date.now() - new Date(creationDate)) / millisecondsPerDay
  );
  return (
    <UserBoxLayout>
      <div className="Avatar">image</div>
      <div className="userContainer">
        <UserDisplayName userId={1} />
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
