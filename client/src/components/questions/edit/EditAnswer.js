import ReactQuill, { contextType } from "react-quill";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import "quill/dist/quill.snow.css";
import axios from "axios";

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

const EditAnswer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]); //태그
  const [taginput, setTaginput] = useState("");

  console.log(id);
  useEffect(() => {
    axios
      .get(`/answers/${id}`)
      .then((res) => setContent(res.data.body))
      .catch((err) => console.log(err));
  }, []);
  const handleeditanswer = () => {
    axios
      .patch(`/answers/${id}`, { body: content })
      .then((res) => {
        navigate(`/questions/${res.data.questionId}`);
      })
      .catch((err) => console.log(err));
  };
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

  return (
    <EditWrapper>
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
      <button className="postedit" onClick={handleeditanswer}>
        Edit your Answer
      </button>
    </EditWrapper>
  );
};

export default EditAnswer;
