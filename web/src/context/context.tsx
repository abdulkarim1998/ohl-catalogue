import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
} from "react";
import { client } from "../client";
import { Drawing, Material } from "../types/types";

interface Context {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  materials: Material[];
  drawings: Drawing[];
}

const Context: React.Context<Context> = createContext({
  modal: false,
  setModal: () => undefined,
  materials: [] as Material[],
  drawings: [] as Drawing[],
});

const Provider = ({ children }: PropsWithChildren) => {
  const [modal, setModal] = useState(false);
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
        modal,
        setModal,
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
