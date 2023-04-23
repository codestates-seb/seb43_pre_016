import ReactQuill, { contextType } from "react-quill";
// import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import "quill/dist/quill.snow.css";
import { height } from "@mui/system";

const Preview = styled.p`
  margin: 15px 0px;
  font-size: 16px;
  font-weight: 500;
`;

const TryPreview = styled.div`
  .ql-container.ql-snow {
    border: none;
  }
`;

const EditTry = ({ body_try, setTry }) => {
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
  return (
    <>
      <div style={{ height: "235px" }}>
        <ReactQuill
          theme="snow"
          style={{ height: "200px" }}
          value={body_try}
          modules={modules}
          formats={formats}
          onChange={setTry}
        />
      </div>
      <Preview>Try Preview</Preview>
      <TryPreview>
        <ReactQuill
          theme="snow"
          value={body_try}
          modules={readOnlyModules}
          readOnly
        />
      </TryPreview>
    </>
  );
};

export default EditTry;
