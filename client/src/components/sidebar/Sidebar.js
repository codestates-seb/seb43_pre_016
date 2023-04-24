import styled from "styled-components";
import PublicIcon from "@mui/icons-material/Public";
import { useEffect, useMemo, useState } from "react";

const LeftSidebarWrap = styled.nav`
  width: 164px;
  max-height: 100vh;
  border-right: 1px solid hsl(210, 8%, 85%);
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

    .selectedTab {
      background-color: #f1f2f3;
      font-weight: bold;
      border-right: 3px solid hsl(27, 90%, 50%);
    }
    .home {
      color: "#0c0d0e";
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

    .p-l-5 {
      padding-left: 5px;
    }
  }
`;

const Sidebar = () => {
  const [selectedTab, setSelectedTab] = useState(1);

  const className = useMemo(() => {
    return {
      home: selectedTab === 1 ? "selectedTab" : "",
      questions: selectedTab === 2 ? "selectedTab" : "",
      tags: selectedTab === 3 ? "selectedTab" : "",
      users: selectedTab === 4 ? "selectedTab" : "",
    };
  }, [selectedTab]);

  return (
    <LeftSidebarWrap selectedTab={selectedTab}>
      <ul className="left-sidebar__nav">
        <li className={`home ${className.home}`}>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setSelectedTab(1);
            }}
          >
            Home
          </a>
        </li>
        <li className="public">PUBLIC</li>
        <li className={`public__li p-l-5  ${className.questions}`}>
          <PublicIcon />
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setSelectedTab(2);
            }}
          >
            Questions
          </a>
        </li>
        <li className={`public__li ${className.tags}`}>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setSelectedTab(3);
            }}
          >
            Tags
          </a>
        </li>
        <li className={`public__li ${className.users}`}>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setSelectedTab(4);
            }}
          >
            Users
          </a>
        </li>
      </ul>
    </LeftSidebarWrap>
  );
};

export default Sidebar;
