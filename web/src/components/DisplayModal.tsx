import { Modal } from "@mantine/core";
import React from "react";
import { useCatalogue } from "../context/context";
import { Material } from "../types/types";

const DisplayModal = () => {
  const { itemFromFuse, setItemFromFuse } = useCatalogue();

  if (!itemFromFuse) {
    return;
  }
  return (
    <Modal
      opened={itemFromFuse != undefined}
      onClose={() => setItemFromFuse(undefined)}
    >
      {itemFromFuse.materialName}
    </Modal>
  );
};

export default DisplayModal;
