import "./App.css";
import { useState, useEffect } from "react";
import EditAnswer from "./components/questions/edit/EditAnswer";
import { Routes, Route } from "react-router-dom";
import LogoutHeader from "./components/header/LogoutHeader";
import LoginHeader from "./components/header/LoginHeader";
import Questions from "./components/questions/Questions";
import Sidebar from "./components/sidebar/Sidebar";
import Signup from "./components/mypage/Signup";
import Askquestions from "./components/questions/create/Askquestions";
import QuestionDetail from "./components/questions/detail/QuestionDetail";
import ScrollToTop from "./features/ScrollTop";
import axios from "axios";
import Login from "./components/mypage/Login";
import Mypage from "./components/mypage/Mypage";
import QuestionEdit from "./components/questions/edit/QuestionEdit";
import SearchPage from "./components/questions/SearchPage";
import { useCookies } from "react-cookie";

function App() {
  //우선 Api를 이용하여 데이터를 받아왔지만 추후에 데이터가 만들어지면 아래 코드를 변경할 예정
  const [cookies, setCookie, removeCookie] = useCookies();
  const [search, setSearch] = useState({});

  return (
    //container가 필요한 곳은 메인 페이지(질문 리스트 페이지), 질문 상세 페이지, tags 페이지, user 페이지, myPage 페이지 이다.
    <div className="App">
      <ScrollToTop />
      {cookies.accessToken ? (
        <LoginHeader removeCookie={removeCookie} setSearch={setSearch} />
      ) : (
        <LogoutHeader />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <div className="container">
              <Sidebar />
              <Questions cookies={cookies} />
            </div>
          }
        />
        <Route
          path="/questions"
          element={
            <div className="container">
              <Sidebar />
              <Questions cookies={cookies} />
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
        <Route
          path="/questions/:id/editQuestion"
          element={
            <div className="container">
              <Sidebar />
              <QuestionEdit />
            </div>
          }
        ></Route>
        <Route
          path="/search"
          element={
            <div className="container">
              <Sidebar />
              <SearchPage cookies={cookies} search={search} />
            </div>
          }
        ></Route>
        <Route
          path="/users/id/userName"
          element={
            <div className="container">
              <Sidebar />
              <Mypage />
            </div>
          }
        ></Route>
        <Route
          path="posts/:id/editanswer"
          element={
            <div className="container">
              <Sidebar />
              <EditAnswer />
            </div>
          }
        ></Route>
        <Route path="/questions/ask" element={<Askquestions />}></Route>
        <Route path="/users/login" element={<Login />}></Route>
        <Route path="/users/signup" element={<Signup />}></Route>
      </Routes>
    </div>
  );
}

export default App;
