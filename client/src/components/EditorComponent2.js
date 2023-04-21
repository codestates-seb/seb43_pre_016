import ReactQuill, { contextType } from "react-quill";
// import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import "quill/dist/quill.snow.css";
import { height } from "@mui/system";

const EditorComponent2 = (props) => {
  const { body_try, setTry } = props;
  const [content, setContent] = useState("");
  useEffect(() => setTry(content), [content]);
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

  // const handleonClick = async () => {
  //   const headers = {
  //     "Content-Type": "application/json",
  //     "Access-Control-Allow-Origin": "*", // 클라이언트 도메인
  //     "Access-Control-Allow-Methods": "GET,POST,PATCH,OPTIONS",
  //   };

  //   await axios({
  //     method: "POST",
  //     url: "https://1bf5-221-163-171-153.jp.ngrok.io/answers",
  //     headers: { ...headers },
  //     body: {
  //       title: "ddd",
  //       body: `${content}`,
  //     },
  //   })
  //     .then((res) => console.log(res))
  //     .catch((err) => console.error(err));
  // };

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
  return (
    <>
      <div style={{ height: "235px" }}>
        <ReactQuill
          theme="snow"
          style={{ height: "200px" }}
          value={content}
          modules={modules}
          formats={formats}
          onChange={setContent}
        />
      </div>
      {/* <div style={{ height: "50px" }}>
        <ReactQuill
          theme="snow"
          style={{ height: "40px" }}
          value={content}
          modules={readOnlyModules}
          readOnly
        />
      </div> */}
    </>
  );
};

export default EditorComponent2;
