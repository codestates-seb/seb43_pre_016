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
const UserBox = () => {
  return (
    <UserBoxLayout>
      <div className="Avatar">image</div>
      <div className="userContainer">
        <div className="userName">userName</div>
        <div className="userInfo">
          <div className="creationDate">
            <Cake className="icon" /> Member for 6 days
          </div>
          <div className="lastSeen">
            <AccessTime className="icon" /> Last seen this week
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
