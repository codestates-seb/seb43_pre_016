import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";

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
      width: 70%;
      border: 1px solid hsl(210, 8%, 85%);
      border-radius: 5px;
      /* content가 많아질 때, 자동으로 row를 추가하도록 설정 */
      flex-wrap: wrap;
      /* row마다 공간을 균등하게 분배 */
      justify-content: space-between;
      /* content의 높이를 균등하게 분배 */
      align-content: space-between;

      .content {
        padding: 10px 15px 5px 15px;
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
          margin-top: 7px;
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
          .Date {
            color: #6a737c;
          }
        }
      }
    }
  }
`;
const Sidebar = styled.div`
  width: 13%;
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
  const [userData, setUserData] = useState({});
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
  if (!userData.questions) {
    return null; // or return loading indicator
  }
  const Content = () => {
    return (
      <>
        {userData.questions.map((questData) => {
          return (
            <div className="content" key={questData.questionId}>
              <div className="content-info">
                <div className="Count-box">
                  <span className="vote">
                    <strong>{questData.questionId}</strong> votes
                  </span>
                  <span className="answers">✔ 26 answers</span>
                  <span className="view">
                    <strong>{questData.questionId}</strong> view
                  </span>
                </div>
                <div className="save">
                  Saved in <a>for late</a>
                </div>
              </div>
              <div className="content-title">
                <a href={`/users/${questData.id}/${questData.userName}`}>
                  {questData.title}
                </a>
                <div className="tags">
                  <div className="tag">java</div>
                  <div className="tag">c++</div>
                  <div className="tag">performance</div>
                  <div className="tag">branch predivtion</div>
                </div>
                <div className="user-info">
                  <div className="userImg"></div>
                  <a className="userName">{userData.userName}</a>
                  <div className="Date">
                    {new Date(questData.createdAt).toLocaleDateString("en-GB", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };
  //문장길이 평균값을 절반으로 나눠서 긴 순서대로 정열함.
  const ContentForLater = () => {
    const sortedQuestions = [...userData.questions].sort(
      (a, b) => b.title.length - a.title.length
    );
    const halfLength = Math.floor(sortedQuestions.length / 2);
    return (
      <>
        {sortedQuestions
          .filter((questData, index) => {
            return index < halfLength;
          })
          .map((questData) => {
            return (
              <div className="content" key={questData.questionId}>
                <div className="content-info">
                  <div className="Count-box">
                    <span className="vote">
                      <strong>{Math.floor(questData.questionId / 2.5)}</strong>{" "}
                      votes
                    </span>
                    <span className="answers">
                      ✔ {Math.floor(questData.questionId / 2)} answers
                    </span>
                    <span className="view">
                      <strong>{questData.questionId * 2}</strong> view
                    </span>
                  </div>
                  <div className="save">
                    Saved in <a>for late</a>
                  </div>
                </div>
                <div className="content-title">
                  <a href={`/users/${questData.id}/${questData.userName}`}>
                    {questData.title}
                  </a>
                  <div className="tags">
                    <div className="tag">java</div>
                    <div className="tag">c++</div>
                    <div className="tag">performance</div>
                    <div className="tag">branch predivtion</div>
                  </div>
                  <div className="user-info">
                    <div className="userImg"></div>
                    <a className="userName">{userData.userName}</a>
                    <div className="Date">
                      {new Date(questData.createdAt).toLocaleDateString(
                        "en-GB",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </>
    );
  };
  const AllSaveBtn = () => {
    return (
      <div className="content-container">
        <div className="content-title">All saves</div>
        <div className="content-title">
          {userData.questions.length} saved items
        </div>
        <div className="content-boxs">
          <Content />
        </div>
      </div>
    );
  };
  const ForLaterBtn = () => {
    return (
      <div className="content-container">
        <div className="content-title">For Later saves</div>
        <div className="content-title"> saved items</div>

        <div className="content-boxs">
          <ContentForLater />
        </div>
      </div>
    );
  };
  return (
    <Container>
      <Sidebar>
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
      {active === 1 ? <AllSaveBtn /> : <ForLaterBtn />}
    </Container>
  );
};
export default Saves;
