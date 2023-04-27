import { useEffect, useState } from "react";
import styled from "styled-components";
import EditorComponent from "./EditorComponent";
import EditorComponent2 from "./EditorComponent2";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Wrapper = styled.main`
  height: 300vh;
  width: 100vw;
  padding-left: 10vw;
  background-color: #f1f2f3;
`;
const TitleWrapper = styled.section`
  display: flex;
  border-radius: 3px;
  align-items: center;
  width: 70vw;
  height: 200px;
  margin-bottom: 10px;
  .title {
    margin: 24px 0 27px;
    font-size: 27px;
    font-weight: 600;
  }
  /* 나중에 반응형 추가예정 */
  .background {
    position: relative;
    left: 13rem;
    top: 1.2rem;
    width: 60%;
    height: 100%;
    background-image: url("/img/background.svg");
    background-size: 500px 300px;
    background-position: right;
    background-repeat: no-repeat;
  }
`;
const NoticeWrapper = styled.section`
  display: flex;
  padding: 30px;
  background-color: #ebf4fb;
  border: 1px solid #a6ceed;
  border-radius: 3px;
  width: 70vw;
  margin-bottom: 10px;
  .notice h3 {
    margin-bottom: 50px;
  }
  li {
    margin-left: 30px;
    list-style: circle;
    color: #3b4045;
  }
`;
const TitleWriter = styled.section`
  display: flex;
  flex-direction: column;
  padding: 30px;
  background: #f8f9f9;
  border: 0.5px solid #babfc4;
  border-radius: 3px;
  width: 70vw;
  margin-bottom: 10px;

  .validate {
    color: red;
  }
  div {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  label {
    color: #3b4045;
    font-size: 12px;
    margin-bottom: 5px;
  }
  textarea {
    line-height: 1.7;
    font-family: -apple-system;
    border: 1px solid #babfc4;
    border-radius: 3px;
    padding: 2px;
    height: 30px;
    resize: none;
    outline: none;
  }
`;
const DetailWriter = styled.section`
  display: flex;
  flex-direction: column;
  padding: 30px;
  background: #f8f9f9;
  border: 0.5px solid #babfc4;
  border-radius: 3px;
  width: 70vw;
  margin-bottom: 10px;

  .validate {
    color: red;
  }

  .detail {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .try {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  label {
    color: #3b4045;
    font-size: 12px;
    margin-bottom: 5px;
  }
  textarea {
    word-wrap: break-word;
    resize: none;
    text-align: left;
    line-height: 22.5px;
    border: 1px solid #babfc4;
    border-radius: 3px;
    padding: 2px;
    height: 300px;
  }
`;
const Taglist = styled.div`
  display: flex;
  padding-left: 10px;
  border-radius: 3px;
  border: 1px solid black;
  padding: 4px;
  background-color: white;
  span {
    display: flex;
    align-items: center;
    background-color: #d0e3f1;
    border: 1px solid #ffffff;
    border-radius: 3px;
    font-size: 12px;
    line-height: 12px;
    margin: 0px 4px 2px 0px;
    padding: 0px 5px;
    white-space: nowrap;
    color: #39739d;

    button {
      border: none;
      background: none !important;
      cursor: pointer;
      svg {
        display: flex;
        align-items: center;
        width: 15px;
      }
    }
  }
  span button {
    margin-left: 1px;
    align-items: center;
    :hover {
      background-color: #f1f2f3;
    }
    border: none;
    background: none;
  }
  input {
    width: 100%;
    outline: none;
    margin-top: 4px;
    border: none;
  }
`;
const Postbutton = styled.button`
  border-radius: 3px;
  border: 1px solid rgb(10, 149, 255);
  color: white;
  background-color: #0a95ff;
  padding: 13px;
  box-shadow: inset rgb(255, 255, 255) 0px 1px 1px 0px;
  cursor: pointer;
`;
const Askquestions = ({ access }) => {
  const [title, setTitle] = useState(""); // 제목
  const [body_detail, setDetail] = useState("");
  const [body_try, setTry] = useState("");
  const [tags, setTags] = useState([]); //태그
  const [taginput, setTaginput] = useState("");

  const navigate = useNavigate();

  // 백엔드 서버 관련 코드
  const onClickSubmit = async () => {
    if (
      title.length >= 1 &&
      body_detail.replace(/(<([^>]+)>)/gi, "").length >= 10 &&
      body_try.replace(/(<([^>]+)>)/gi, "").length >= 10
    ) {
      let data = {
        title: title,
        body: body_detail,
        bodyDetail: body_try,
        userId: 1,
      };

      const header = {
        headers: {
          "Content-Type": "application/json",
          access,
        },
      };

      await axios
        .post(`${process.env.REACT_APP_API_URL}/questions`, data, header)
        .then(() => {
          navigate("/");
          window.location.reload();
        });
    } else {
      toast.warning("Make sure you pass all validations");
    }
  };

  const onChange = (e) => {
    setTitle(e.target.value);
  };

  const handleaddtag = (e) => {
    if (e.key === "," && tags.length < 5) {
      const tag = e.target.value.slice(0, e.target.value.length - 1);
      setTags([...tags, tag]);
      setTaginput("");
    }
  };
  const tagDelete = (x) => {
    const idx = tags.indexOf(x);
    setTags([...tags.slice(0, idx), ...tags.slice(idx + 1)]);
  };

  return (
    <Wrapper>
      <TitleWrapper>
        <section className="title">
          <span>Ask a public question</span>
        </section>
        <div className="background">{""}</div>
      </TitleWrapper>
      <NoticeWrapper>
        <section className="notice">
          <h3>Writing a good question</h3>
          <ul>
            <li>Steps Summarize your problem in a one-line title.</li>
            <li>Describe your problem in more detail.</li>
            <li>Describe what you tried and what you expected to happen.</li>
            <li>
              Add “tags” which help surface your question to members of the
              community.
            </li>
            <li> Review your question and post it to the site.</li>
          </ul>
        </section>
      </NoticeWrapper>
      <TitleWriter>
        <div>Title</div>
        {title.length >= 1 ? (
          <label>
            Be specific and imagine you’re asking a question to another person.
          </label>
        ) : (
          <label className="validate">
            Write at least 1 letter for the title.
          </label>
        )}
        <textarea onChange={onChange} value={title} name="title" />
      </TitleWriter>
      <DetailWriter>
        <span className="detail">what are the details of your problem?</span>
        {body_detail.replace(/(<([^>]+)>)/gi, "").length >= 10 ? (
          <label>
            Introduce the problem and expand on what you put in the title.
            Minimum 10 characters.
          </label>
        ) : (
          <label className="validate">
            Introduce the problem and expand on what you put in the title.
            Minimum 10 characters.
          </label>
        )}
        <EditorComponent body_detail={body_detail} setDetail={setDetail} />
      </DetailWriter>
      <DetailWriter>
        <span className="try">
          what did you try and what were you expecting?
        </span>
        {body_try.replace(/(<([^>]+)>)/gi, "").length >= 10 ? (
          <label>
            Describe what you tried, what you expected to happen, and what
            actually resulted. Minimum 10 characters.
          </label>
        ) : (
          <label className="validate">
            Describe what you tried, what you expected to happen, and what
            actually resulted. Minimum 10 characters.
          </label>
        )}
        <EditorComponent2 body_try={body_try} setTry={setTry} />
      </DetailWriter>
      <TitleWriter>
        <div>Tags</div>
        <label>
          Add up to 5 tags to describe what your question is about. Start typing
          to see suggestions.
        </label>
        <Taglist>
          {tags.map((x, idx) => {
            return (
              <span key={idx}>
                <p>{x}</p>
                <button onClick={() => tagDelete(x)}>
                  <ClearIcon />
                </button>
              </span>
            );
          })}
          <input
            onChange={(e) => {
              setTaginput(e.target.value);
            }}
            onKeyUp={handleaddtag}
            value={taginput}
          />
        </Taglist>
      </TitleWriter>
      <Postbutton onClick={() => onClickSubmit()}>
        Post your question
      </Postbutton>
      <ToastContainer
        position="top-right" // 알람 위치 지정
        autoClose={4000} // 자동 off 시간
        hideProgressBar={false} // 진행시간바 숨김
        closeOnClick // 클릭으로 알람 닫기
        rtl={false} // 알림 좌우 반전
        pauseOnFocusLoss // 화면을 벗어나면 알람 정지
        draggable // 드래그 가능
        pauseOnHover // 마우스를 올리면 알람 정지
        theme="colored"
        // limit={1} // 알람 개수 제한
      />
    </Wrapper>
  );
};

export default Askquestions;
