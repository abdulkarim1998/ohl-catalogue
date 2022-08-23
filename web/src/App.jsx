import { Route, Routes } from "react-router-dom";
import "./App.css";
import Catalogue from "./components/home/catalogue/Catalogue";
import Home from "./components/home/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogue" element={<Catalogue />} />
      </Routes>
    </div>
  );
}

export default App;
