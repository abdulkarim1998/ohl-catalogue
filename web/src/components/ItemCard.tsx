import {
  Card,
  Image,
  Text,
  Button,
  Group,
  createStyles,
  Box,
} from "@mantine/core";
import { urlFor } from "../client";
import { useCatalogue } from "../context/context";
import { Material } from "../types/types";

interface ItemCardProps {
  material: Material;
}

const ItemCard = ({ material }: ItemCardProps) => {
  const { setItemFromFuse } = useCatalogue();

  return (
    <Card
      sx={{
        height: 270,
        cursor: "pointer",
        transition: "all ease-in",
        ":hover": {
          opacity: 0.6,
        },
      }}
      onClick={() => setItemFromFuse(material)}
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
    >
      <Card.Section>
        <Image
          src={
            material.imageurl
              ? urlFor(material.imageurl)
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
          }
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}> {material.materialName} </Text>
      </Group>
    </Card>
  );
};

export default ItemCard;
