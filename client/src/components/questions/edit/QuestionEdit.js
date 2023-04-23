import { useEffect, useState } from "react";
import styled from "styled-components";
import EditDetail from "./EditDetail";
import EditTry from "./EditTry";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Wrapper = styled.main`
  width: 100vw;
  margin-left: 15vw;
  margin-top: 25px;
  margin-bottom: 50px;
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
    background-size: 500px 300px;
    background-position: right;
    background-repeat: no-repeat;
  }
`;
const NoticeWrapper = styled.section`
  display: flex;
  padding: 30px 20px;
  background-color: #fdf7e2;
  border: 1px solid #e6cf79;
  border-radius: 3px;
  width: 55vw;
  margin-bottom: 10px;
  .notice p:first-child {
    margin-bottom: 15px;
  }
`;
const TitleWriter = styled.section`
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  width: 55vw;
  margin-bottom: 10px;
  div {
    font-size: 16px;
    font-weight: 500;
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
  border-radius: 3px;
  width: 55vw;
  margin-bottom: 10px;
  .detail {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 10px;
  }
  .try {
    font-size: 16px;
    font-weight: 500;
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
    color: #39739d;

    button {
      border: none;
      background: none !important;
      cursor: pointer;
      svg {
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
  textarea {
    margin-top: 4px;
    border: none;
    flex: 3;
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
const QuestionEdit = () => {
  const [title, setTitle] = useState(""); // 제목
  const [body_detail, setDetail] = useState("");
  const [body_try, setTry] = useState("");
  const [tags, setTags] = useState([]); //태그
  const [taginput, setTaginput] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/questions/${id}`)
      .then((res) => {
        setTitle(`${res.data.title}`);
        setDetail(`${res.data.body_detail}`);
        setTry(`${res.data.body_try}`);
        setTags([...res.data.tags]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onClickSubmit = async () => {
    let data = {
      tags: tags,
      title: title,
      body_detail: body_detail,
      body_try: body_try,
      updated_at: new Date(),
    };

    const header = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .patch(`http://localhost:8080/questions/${id}`, data, header)
      .then((res) => {
        console.log(res);
        navigate("/");
        window.location.reload();
      });
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
      <NoticeWrapper>
        <section className="notice">
          <p>Your edit will be placed in a queue until it is peer reviewed.</p>
          <p>
            We welcome edits that make the post easier to understand and more
            valuable for readers. Because community members review edits, please
            try to make the post substantially better than how you found it, for
            example, by fixing grammar or adding additional resources and
            hyperlinks.
          </p>
        </section>
      </NoticeWrapper>
      <TitleWriter>
        <div>Title</div>
        <label>
          Be specific and imagine you’re asking a question to another person.
        </label>
        <textarea onChange={onChange} value={title} name="title" />
      </TitleWriter>
      <DetailWriter>
        <span className="detail">what are the details of your problem?</span>
        <label>
          Introduce the problem and expand on what you put in the title. Minimum
          20 characters.
        </label>
        <EditDetail body_detail={body_detail} setDetail={setDetail} />
      </DetailWriter>
      <DetailWriter>
        <span className="try">
          what did you try and what were you expecting?
        </span>
        <label>
          Describe what you tried, what you expected to happen, and what
          actually resulted. Minimum 20 characters.
        </label>
        <EditTry body_try={body_try} setTry={setTry} />
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
          <textarea
            onChange={(e) => {
              setTaginput(e.target.value);
            }}
            onKeyUp={handleaddtag}
            value={taginput}
          ></textarea>
        </Taglist>
      </TitleWriter>
      <Postbutton onClick={() => onClickSubmit()}>
        Post your question
      </Postbutton>
    </Wrapper>
  );
};

export default QuestionEdit;
