import { useEffect, useState } from "react";
import styled from "styled-components";
import EditorComponent from "./EditorComponent";
import EditorComponent2 from "./EditorComponent2";

import ClearIcon from "@mui/icons-material/Clear";

const Wrapper = styled.main`
  height: 300vh;
  width: 200vw;
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
    font-size: 20px;
    font-weight: 400;
    margin: 2px;
    padding: 2px;
    border-radius: 3px;
    border: 1px solid black;
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
  border: 1px solid white;
  color: white;
  background-color: #0a95ff;
  padding: 5px;
`;
const Askquestions = () => {
  const [title, setTitle] = useState(""); // 제목
  const [article, setArticle] = useState({ detail: "", try: "" }); // 내용
  const [tags, setTags] = useState([]); //태그
  const [taginput, setTaginput] = useState("");
  const onChange = (e) => {
    setTitle(e.target.value);
  };
  const handleaddtag = (e) => {
    if (e.key === "," && tags.length < 5) {
      const tag = e.target.value.slice(0, e.target.value.length - 1);
      setTags([...tags, { key: Date.now(), tag: tag }]);
      setTaginput("");
    }
  };
  const tagDelete = (key) => {
    const deleted = tags.filter((x) => x.key !== key);
    setTags([...deleted]);
  };

  return (
    <Wrapper>
      <TitleWrapper>
        <section className="title">
          <span>Ask a public question</span>
        </section>
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
        <EditorComponent article={article} setArticle={setArticle} />
      </DetailWriter>
      <DetailWriter>
        <span className="try">
          what did you try and what were you expecting?
        </span>
        <label>
          Describe what you tried, what you expected to happen, and what
          actually resulted. Minimum 20 characters.
        </label>
        <EditorComponent2 article={article} setArticle={setArticle} />
      </DetailWriter>
      <TitleWriter>
        <div>Tag</div>
        <label>
          Add up to 5 tags to describe what your question is about. Start typing
          to see suggestions.
        </label>
        <Taglist>
          {tags.map((x) => {
            return (
              <span key={x.key}>
                {x.tag}
                <button onClick={() => tagDelete(x.key)}>
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
      <Postbutton onClick={() => console.log(article)}>
        Post your question
      </Postbutton>
    </Wrapper>
  );
};

export default Askquestions;
