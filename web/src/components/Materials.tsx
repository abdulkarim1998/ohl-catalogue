import { Grid, Pagination } from "@mantine/core";
import { useState } from "react";
import { useCatalogue } from "../context/context";
import ItemCard from "./ItemCard";

interface MaterialsProps {
  topRef: React.MutableRefObject<null>;
}

const Materials = ({ topRef }: MaterialsProps) => {
  const cardsPerPage = 12;

  const { materials } = useCatalogue();
  const [currentPage, setCurrentPage] = useState(1);

  const currentCards = materials.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );

  return (
    <>
      <Pagination
        style={{ margin: "20px" }}
        total={materials.length / cardsPerPage}
        color="cyan"
        onChange={(e) => {
          setCurrentPage(e);
          topRef.current.scrollIntoView({ behavior: "smooth" });
        }}
        position="right"
      />
      <Grid>
        {currentCards?.map((m, i) => (
          <Grid.Col key={i} sm={6} md={3}>
            <ItemCard material={m} />
          </Grid.Col>
        ))}
      </Grid>
      <Pagination
        style={{ marginTop: "10px" }}
        total={materials.length / cardsPerPage}
        color="cyan"
        onChange={(e) => {
          setCurrentPage(e);
          topRef.current.scrollIntoView({ behavior: "smooth" });
        }}
        position="center"
      />
    </>
  );
};

export default Materials;
