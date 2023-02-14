import { Grid, Pagination } from "@mantine/core";
import { useState } from "react";
import DrawingCard from "./DrawingCard";
import { useCatalogue } from "../context/context";
import { SmallerMaterials } from "../types/types";

const Drawings = (): JSX.Element => {
  const cardsPerPage = 10;

  const { drawings, materials } = useCatalogue();
  const [currentPage, setCurrentPage] = useState(1);

  const currentCards = drawings.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );

  const getMaterials = (materialIds: string[]): SmallerMaterials[] => {
    const findMaterials = materialIds.map((id) => {
      if (id.length > 3) {
        const find = materials.find((m) => m.sapNumber == id);
        return find
          ? ({
              id: find?.itemID,
              name: find?.materialName,
            } as SmallerMaterials)
          : undefined;
      } else {
        const find = materials.find((m) => m.hookupNo == id);
        return find
          ? ({
              id: find?.itemID,
              name: find?.materialName,
            } as SmallerMaterials)
          : undefined;
      }
    });

    return findMaterials.filter((m) => m != undefined);
  };

  return (
    <>
      <Pagination
        style={{ margin: 20 }}
        total={drawings.length / cardsPerPage}
        color="cyan"
        onChange={(e) => {
          setCurrentPage(e);
          // topRef.current.scrollIntoView({ behavior: "smooth" });
        }}
        position="right"
      />
      <Grid>
        {currentCards.map((d, i) => (
          <Grid.Col key={i} sm={6} md={12}>
            <DrawingCard drawing={d} materials={getMaterials(d.itemsNumbers)} />
          </Grid.Col>
        ))}
      </Grid>
      <Pagination
        style={{ marginTop: "10px" }}
        total={drawings.length / cardsPerPage}
        color="cyan"
        onChange={(e) => {
          setCurrentPage(e);
          // topRef.current.scrollIntoView({ behavior: "smooth" });
        }}
        position="center"
      />
    </>
  );
};

export default Drawings;
