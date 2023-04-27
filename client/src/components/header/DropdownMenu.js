import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import PublicIcon from "@mui/icons-material/Public";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SidebarWrap = styled.nav`
  width: 180px;
  height: 280px;
  /* padding-bottom: 30px; */
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 2px 6px 0px;
  border-bottom: 1px solid hsl(210, 8%, 85%);
  background-color: white;
  padding: 24px 0px 0px;
  color: gray;
  font-size: 13px;
  line-height: 17px;
  font-weight: 400;
  text-align: left;
  position: fixed;
  top: 52px;
  left: 0;

  .left-sidebar__nav {
    margin: 0px 0px 12px;

    li:not(:nth-child(2)):hover {
      cursor: pointer;
      a {
        color: black !important;
      }
    }

    .selectedTab {
      background-color: #f1f2f3;
      font-weight: bold;
      border-right: 3px solid hsl(27, 90%, 50%);
      a {
        color: black !important;
      }
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

const Sidebar = ({ handleOnClick }) => {
  const navigate = useNavigate();
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
    <SidebarWrap selectedTab={selectedTab}>
      <ul className="left-sidebar__nav">
        <li
          className={`home ${className.home}`}
          onClick={(e) => {
            e.preventDefault();
            handleOnClick();
            setSelectedTab(1);
            navigate("/");
          }}
        >
          <a href="/">Home</a>
        </li>
        <li className="public">PUBLIC</li>
        <li
          className={`public__li p-l-5  ${className.questions}`}
          onClick={(e) => {
            e.preventDefault();
            handleOnClick();
            setSelectedTab(2);
            navigate("/questions");
          }}
        >
          <PublicIcon />
          Questions
        </li>
        <li
          className={`public__li ${className.tags}`}
          onClick={(e) => {
            e.preventDefault();
            handleOnClick();
            setSelectedTab(3);
            navigate("/tagged");
          }}
        >
          <a>Tags</a>
        </li>
        <li
          className={`public__li ${className.users}`}
          onClick={(e) => {
            e.preventDefault();
            handleOnClick();
            setSelectedTab(4);
            navigate("/users");
          }}
        >
          <a>Users</a>
        </li>
      </ul>
    </SidebarWrap>
  );
};

const DropdownMenu = () => {
  const [isClicked, setIsClicked] = useState(false);
  const handleOnClick = () => {
    setIsClicked(!isClicked);
  };
  return (
    <>
      {isClicked ? (
        <>
          <div className="background"></div>
          <CloseIcon className="header__menu__icon" onClick={handleOnClick} />
          <Sidebar handleOnClick={handleOnClick} />
        </>
      ) : (
        <MenuIcon className="header__menu__icon" onClick={handleOnClick} />
      )}
    </>
  );
};

export default DropdownMenu;
