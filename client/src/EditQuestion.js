import ReactQuill, { contextType } from "react-quill";
import { useState } from "react";
import styled from "styled-components";
import ClearIcon from "@mui/icons-material/Clear";
import "quill/dist/quill.snow.css";

const Taglist = styled.div`
  display: flex;
  width: 100%;
  padding-left: 10px;
  border-radius: 3px;
  border: 1px solid #cccccc;
  padding: 4px;
  background-color: white;
  font-family: -apple-system;
  margin-bottom: 10px;
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
    margin-top: 4px;
    border: none;
  }
`;
const EditWrapper = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 164px;
  margin-right: 164px;
  padding: 24px 24px 24px 24px;

  .title {
    font-size: 20px;
    font-family: -apple-system;
    font-weight: 500;
    margin-bottom: 10px;
  }
  .tags {
    font-size: 20px;
    font-family: -apple-system;
    font-weight: 500;
    margin-bottom: 10px;
  }
  .titleinput {
    background-color: #ffffff;
    border-color: #59a4de;
    border-radius: 3px;
    border-style: solid;
    border-width: 1px;
    box-shadow: #0074cc 0px 0px 1px 2px;
    color: #0c0d0e;
    display: inline-block;
    font-family: -apple-system;
    font-size: 13px;
    padding: 7.8px 9.1px;
    margin-bottom: 10px;
  }
  .body {
    font-size: 20px;
    font-family: -apple-system;
    font-weight: 500;
    margin-bottom: 10px;
  }
  .bodyinput {
    display: flex;
    height: 300px;
    margin-bottom: 10px;
  }
  .preview {
    display: flex;
    height: 510px;
    margin-bottom: 10px;
  }
  .postedit {
    text-align: center;
    border-radius: 3px;
    box-shadow: #0a95ff 0px 0px 0px 1px;
    border: 1px solid white;
    color: white;
    background-color: #0a95ff;
    width: 120px;
    height: 30px;
  }
`;

const EditQuestion = () => {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]); //태그
  const [taginput, setTaginput] = useState("");
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["code-block"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const readOnlyModules = {
    toolbar: false, // 툴바를 비활성화합니다.
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "code-block",
  ];
  const customStyle = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "300px",
  };
  const customStyle2 = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "500px",
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
    <EditWrapper>
      <label className="title">Title</label>
      <input className="titleinput" />
      <lable className="body">body</lable>
      <div className="bodyinput">
        <ReactQuill
          theme="snow"
          style={customStyle}
          value={content}
          modules={modules}
          formats={formats}
          onChange={setContent}
        />
      </div>
      <div className="preview" style={{ height: "500px" }}>
        <ReactQuill
          theme="snow"
          style={customStyle2}
          value={content}
          modules={readOnlyModules}
          formats={formats}
          readOnly
        />
      </div>
      <label className="tags">Tags</label>
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
      <button className="postedit">Edit your question</button>
    </EditWrapper>
  );
};

export default EditQuestion;
