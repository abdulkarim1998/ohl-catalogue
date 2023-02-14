import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  PropsWithChildren,
} from "react";
import { client } from "../client";
import { Drawing, Material } from "../types/types";

interface Context {
  materials: Material[];
  drawings: Drawing[];
}

const Context: React.Context<Context> = createContext({
  materials: [] as Material[],
  drawings: [] as Drawing[],
});

const Provider = ({ children }: PropsWithChildren) => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [drawings, setDrawings] = useState<Drawing[]>([]);

  useEffect(() => {
    const query = '*[_type=="drawings"]';
    client
      .fetch(query)
      .then((data: Drawing[]) => {
        setDrawings(data);
      })
      .catch((err: unknown) => console.log(err));
  }, []);

  useEffect(() => {
    const query = '*[_type=="materials"]';
    client
      .fetch(query)
      .then((data: Material[]) => {
        setMaterials(data);
      })
      .catch((err: unknown) => console.log(err));
  }, []);

  return (
    <Context.Provider
      value={{
        materials,
        drawings,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
export const useCatalogue = () => useContext(Context);
