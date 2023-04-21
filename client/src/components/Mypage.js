import styled from "styled-components";
import MainContent from "./MyPgContent";
import UserBox from "./MyPgUserBox";

/* sidebar Line */

const MypageLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  padding: 24px;
  margin-left: 163px;
`;
const Nav = styled.div`
  display: flex;
  margin: 8px;
  .Profile {
    align-items: center;
    background-color: #f48225;
    border-radius: 1000px;
    padding: 6px 12px;
    color: #ffffff;
    font-size: 13px;
    margin-left: 4px;
    &:hover {
      cursor: pointer;
      background-color: rgba(82, 89, 96, 0.4);
    }
  }
`;

const Mypage = () => {
  return (
    <MypageLayout>
      <UserBox />
      <Nav>
        <text className="Profile">Profile</text>
      </Nav>
      <MainContent />
    </MypageLayout>
  );
};
export default Mypage;
