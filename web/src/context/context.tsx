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
  itemFromFuse: Material | Drawing | undefined;
  setItemFromFuse: Dispatch<SetStateAction<Material | Drawing | undefined>>;
}

const Context: React.Context<Context> = createContext({
  modal: false,
  setModal: () => undefined,
  materials: [] as Material[],
  drawings: [] as Drawing[],
  itemFromFuse: null,
  setItemFromFuse: () => undefined,
});

const Provider = ({ children }: PropsWithChildren) => {
  const [modal, setModal] = useState(false);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [drawings, setDrawings] = useState<Drawing[]>([]);
  const [itemFromFuse, setItemFromFuse] = useState<
    Material | Drawing | undefined
  >();

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
        itemFromFuse,
        setItemFromFuse,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
export const useCatalogue = () => useContext(Context);
