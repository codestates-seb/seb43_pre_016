import "./App.css";
import Header from "./components/Header";
import Questions from "./components/Questions";
import Sidebar from "./components/Sidebar";
import Signup from "./components/Signup";
import QuestionDetail from "./components/QuestionDetail";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Login from "./components/Login";

function App() {
  //우선 Api를 이용하여 데이터를 받아왔지만 추후에 데이터가 만들어지면 아래 코드를 변경할 예정
  const [listData, setListData] = useState([]);
  const data = () => {
    axios
      .get(
        "https://api.stackexchange.com/2.3/questions?pagesize=50&order=desc&sort=creation&site=stackoverflow&filter=!T3zRPxfHcI6S3(Y6fa"
      )
      .then((res) => {
        return setListData([...res.data.items]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    data();
  }, []);

  return (
    //container가 필요한 곳은 메인 페이지(질문 리스트 페이지), 질문 상세 페이지, tags 페이지, user 페이지, myPage 페이지 이다.
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div className="container">
              <Sidebar />
              <Questions listData={listData} />
            </div>
          }
        />
        <Route
          path="/questions/:id"
          element={
            <div className="container">
              <Sidebar />
              <QuestionDetail />
            </div>
          }
        ></Route>
        <Route path="/users/login" element={<Login />}></Route>
        <Route path="/users/signup" element={<Signup />}></Route>
      </Routes>
    </div>
  );
}

export default App;
