import styled from "styled-components";
import { useEffect, useState } from "react";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  .content-container {
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .content-title {
      font-size: 20px;
      margin-bottom: 19px;
    }
    .content-boxs {
      display: flex;
      flex-direction: column;
      width: 100%;
      border: 1px solid hsl(210, 8%, 85%);
      border-radius: 5px;
      /* content가 많아질 때, 자동으로 row를 추가하도록 설정 */
      flex-wrap: wrap;
      /* row마다 공간을 균등하게 분배 */
      justify-content: space-between;
      /* content의 높이를 균등하게 분배 */
      align-content: space-between;

      .content {
        padding: 16px;
        border-bottom: 1px solid hsl(210, 8%, 85%);
        width: 100%;
        /* content가 많아질 때, 자동으로 column을 추가하도록 설정 */
        flex-grow: 1;
        .content-info {
          display: flex;
          justify-content: space-between;
          height: 20%;
          align-items: center;
          margin-bottom: 4px;
          .Count-box {
            .vote {
              margin-right: 7px;
              font-size: 13px;
              .strong {
                color: #0c0d0e;
              }
            }
            .answers {
              margin-right: 7px;
              background-color: #2f6f44;
              color: white;
              border-radius: 3px;
              padding: 3px 5px;
              font-size: 13px;
            }
            .view {
              color: #922024;
            }
          }
          .save {
            margin-right: 16px;
            .icon {
              font-size: 20px;
            }
          }
        }
        .content-title {
          height: 80%;
          a {
            font-size: 17px;
            color: #0074cc;
          }
          .tags {
            display: flex;
            flex-wrap: wrap;
            .tag {
              height: 24px;
              background-color: #e1ecf4;
              border-radius: 3px;
              font-size: 12px;
              text-align: center;
              color: #39739d;
              margin: 8px 3px 2px 3px;
              padding: 4.8px 6px;
              max-width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        .user-info {
          margin-top: 13px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          font-size: 12px;
          .userImg {
            width: 13px;
            height: 13px;
            margin-right: 4px;
            background-color: black;
          }
          .userName {
            margin-right: 4px;
            font-size: 12px;
          }
          .askCount {
            margin-right: 2px;
            color: #6a737c;
          }
          .Date {
            color: #6a737c;
          }
        }
      }
    }
  }
`;
const Sidebar = styled.div`
  width: 20%;
  height: 100%;
  margin-right: 3%;
  ul {
    flex-direction: column;
    display: flex;
    li {
      border-radius: 1000px;
      font-size: 13px;
      padding: 6px 12px;
      cursor: pointer;
      &.active {
        background-color: #f48225;
        color: #ffff;
      }
    }
  }
`;

const Saves = () => {
  const [active, setActive] = useState(1);

  let content = (
    <div className="content">
      <div className="content-info">
        <div className="Count-box">
          <span className="vote">
            <strong>26958</strong> votes
          </span>
          <span className="answers">✔ 26 answers</span>
          <span className="view">
            <strong>1.8m</strong> view
          </span>
        </div>
        <div className="save">
          Saved in <a>for late</a>
        </div>
      </div>
      <div className="content-title">
        <a>
          Why is processing a sorted array faster than processing an unsorted
          array?
        </a>
        <div className="tags">
          <div className="tag">java</div>
          <div className="tag">c++</div>
          <div className="tag">performance</div>
          <div className="tag">branch predivtion</div>
        </div>
        <div className="user-info">
          <div className="userImg"></div>
          <a className="userName">userName</a>
          <div className="askCount">
            <strong>491k</strong> asked
          </div>
          <div className="Date">Jun 27, 2012 at 13:15</div>
        </div>
      </div>
    </div>
  );

  return (
    <Container>
      <Sidebar active={active}>
        <ul>
          <li
            onClick={() => setActive(1)}
            className={active === 1 ? "active" : ""}
          >
            All saves
          </li>
          <li
            onClick={() => setActive(2)}
            className={active === 2 ? "active" : ""}
          >
            For later
          </li>
        </ul>
      </Sidebar>
      <div className="content-container">
        <div className="content-title">All saves</div>
        <div className="content-title">{content.length} saved items</div>
        <div className="content-boxs">{content}</div>
      </div>
    </Container>
  );
};
export default Saves;
