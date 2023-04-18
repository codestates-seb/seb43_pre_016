import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <div className="container"></div>
      <Header />

      <Routes>
        <Route path="/user/login" element={<Login />}></Route>
        <Route path="/" element={<Sidebar />}></Route>
      </Routes>
    </div>
  );
}

export default App;
