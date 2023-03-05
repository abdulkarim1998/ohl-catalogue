import { Image, Modal, Text } from "@mantine/core";
import { urlFor } from "../client";
import { useCatalogue } from "../context/context";
import { Material } from "../types/types";
import noImg from "../assets/no-image.png";
const DisplayModal = () => {
  const { itemFromFuse: material, setItemFromFuse } = useCatalogue();

  if (!material) {
    return <></>;
  }

  return (
    <Modal
      opened={material != undefined}
      onClose={() => setItemFromFuse(undefined)}
      withCloseButton={false}
      size="auto"
    >
      <Text> Name: {material.materialName} </Text>
      <br />
      <Text> Description: {(material as Material).materialDescription} </Text>
      <Text> Sap Number: {(material as Material).sapNumber} </Text>
      <Text> Hookup Number: {(material as Material).hookupNo} </Text>
      <Text> Unit: {(material as Material).unit} </Text>

      <br />
      <Image src={material.imageurl ? urlFor(material.imageurl) : noImg} />
    </Modal>
  );
};

export default DisplayModal;
