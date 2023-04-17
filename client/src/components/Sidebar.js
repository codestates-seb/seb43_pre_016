import styled from "styled-components";
import PublicIcon from "@mui/icons-material/Public";

const LeftSidebarWrap = styled.nav`
  width: 164px;
  max-height: 100vh;
  /* border-right: 1px solid gray; */
  padding: 24px 0px 0px;
  margin: 0px 0px 8px;
  color: gray;
  font-size: 13px;
  line-height: 17px;
  font-weight: 400;
  text-align: left;
  position: fixed;
  top: 50px;
  bottom: 0;

  .left-sidebar__nav {
    margin: 0px 0px 12px;
    .home {
      color: #0c0d0e;
      display: flex;
      align-items: center;
      padding: 7px 5px 7px 8px;
    }
    .public {
      display: list-item;
      font-size: 11px;
      line-height: 14.3846px;
      margin: 16px 0px 4px 8px;
      text-transform: uppercase;
    }

    .public__li {
      display: flex;
      align-items: center;
      font-size: 13px;
      line-height: 26px;
      padding: 5px 5px 5px 30px;
      > svg {
        font-size: 20px;
        font-weight: 700;
        margin: -1px 4px 0px 0px;
      }
    }

    .ps-r25 {
      position: relative;
      right: 25px;
    }
  }
`;

const Sidebar = () => {
  return (
    <LeftSidebarWrap>
      <ul className="left-sidebar__nav">
        <li className="home">
          <a href="/">Home</a>
        </li>
        <li className="public">PUBLIC</li>
        <li className="public__li ps-r25">
          <PublicIcon />
          <a href="/">Questions</a>
        </li>
        <li className="public__li">
          <a href="/">Tags</a>
        </li>
        <li className="public__li">
          <a href="/">Users</a>
        </li>
      </ul>
    </LeftSidebarWrap>
  );
};

export default Sidebar;
