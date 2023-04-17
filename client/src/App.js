import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Sidebar />
      </div>
    </div>
  );
}

export default App;
