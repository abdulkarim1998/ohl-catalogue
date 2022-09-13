import { Route, Routes } from "react-router-dom";
import "./App.css";
import Catalogue from "./components/home/catalogue/Catalogue";
import Fields from "./components/home/catalogue/fields/Fields";
import Files from "./components/home/catalogue/files/Files";
import Home from "./components/home/Home";
import Provider from "./context";

function App() {
  return (
    <div className="App">
      <Provider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogue" element={<Catalogue> <Files /> </Catalogue>} />
          <Route path="/catalogue/items" element={<Catalogue> <Fields /> </Catalogue>} />
          <Route path="/catalogue/items/:id" element={<Catalogue> <Fields /> </Catalogue>} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
