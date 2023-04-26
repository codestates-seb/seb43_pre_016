import { useState } from "react";
import styled from "styled-components";
import Profile from "./MyPgProfile";
import Saves from "./MyPgSave";
import UserBox from "./MyPgUserBox";

/* sidebar Line */
const PageSize = styled.div`
  position: relative;
  /* 스크롤바를 없앰 */
  ::-webkit-scrollbar {
    display: none;
  }
`;

const MypageLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  padding: 24px;
  position: absolute;
  left: 163px;
  /* 스크롤바를 없앰 */
`;
const Nav = styled.div`
  display: flex;
  margin: 8px;
  margin-bottom: 16px;
  .ProfileBtn {
    align-items: center;
    border-radius: 1000px;
    padding: 6px 12px;
    color: black;
    font-size: 12px;
    margin-left: 4px;
    &#active {
      background-color: #f48225;
      color: #ffff;
    }
  }
`;

const Mypage = () => {
  const [active1, setActive1] = useState(1);

  return (
    <PageSize>
      <MypageLayout>
        <UserBox />
        <Nav>
          <div
            className="ProfileBtn"
            onClick={() => setActive1(1)}
            id={active1 === 1 ? "active" : ""}
          >
            Profile
          </div>
          <div
            className="ProfileBtn"
            onClick={() => setActive1(2)}
            id={active1 === 2 ? "active" : ""}
          >
            Saves
          </div>
        </Nav>
        {active1 === 1 ? <Profile /> : <Saves />}
      </MypageLayout>
    </PageSize>
  );
};
export default Mypage;
