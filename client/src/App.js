import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
// import Sidebar from "./components/Sidebar";
import Askquestions from "./components/Askquestions";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        {/* <Sidebar /> */}

        <Routes>
          <Route path="/questions/ask" element={<Askquestions />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
