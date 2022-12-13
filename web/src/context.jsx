import React, { useState, useEffect, createContext, useContext } from "react";
import { client } from "./client";
const CatalogueContext = createContext({
  items: [],
  setItems: () => undefined,
  drawings: [],
  setDrawings: () => undefined,
  mode: "light",
  setMode: () => undefined,
  back: null,
  setBack: () => undefined,
});

export const useCatalogue = () => {
  return useContext(CatalogueContext);
};

const Provider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [drawings, setDrawings] = useState([]);
  const [mode, setMode] = useState("light");
  const [back, setBack] = useState(null);

  useEffect(() => {
    const query = '*[_type=="drawings"]';
    client
      .fetch(query)
      .then((data) => {
        setDrawings(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const query = '*[_type=="materials"]';
    client
      .fetch(query)
      .then((data) => {
        setItems(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (localStorage.getItem("mode")) {
      setMode(localStorage.getItem("mode"));
    }
  }, []);

  return (
    <CatalogueContext.Provider
      value={{
        items,
        setItems,
        drawings,
        setDrawings,
        mode,
        setMode,
        back,
        setBack,
      }}
    >
      {children}
    </CatalogueContext.Provider>
  );
};

export default Provider;
