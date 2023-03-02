import { useState } from "react";
import Fuse from "fuse.js";
import { useCatalogue } from "./context/context";
import { Input, Modal } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import styles from "./fuse.module.scss";
const TestFuse = () => {
  const [pattern, setPattern] = useState("");
  const { materials, modal, setModal } = useCatalogue();
  const options = {
    shouldSort: true,
    distance: 60,
    minMatchCharLength: 2,
    threshold: 0.4,
    keys: ["materialName", "hookupNo", "sapNumber"],
  };

  const fuse = new Fuse(materials, options);

  const found = fuse.search(pattern);
  console.log(materials);

  return (
    <Modal
      className={styles.searchModal}
      opened={modal}
      withCloseButton={false}
      onClose={() => setModal(!modal)}
      overlayOpacity={0.55}
      overlayBlur={3}
      size="auto"
    >
      <Input
        className={styles.searchInput}
        icon={<IconSearch />}
        placeholder="Search"
        onChange={(e) => setPattern(e.target.value)}
      />
      <>
        {found.map(({ item }) => (
          <div className={styles.menu}>{item.materialName}</div>
        ))}
      </>
    </Modal>
  );
};

export default TestFuse;
