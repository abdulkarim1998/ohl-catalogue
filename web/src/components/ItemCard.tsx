import { Card, Image, Text, Button, Group, createStyles } from "@mantine/core";
import { urlFor } from "../client";
import { Material } from "../types/types";

interface ItemCardProps {
  material: Material;
}

const useStyle = createStyles((theme) => ({
  descText: {
    maxWidth: 400,
    lineClamp: 3,
    boxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

const ItemCard = ({ material }: ItemCardProps) => {
  const { classes } = useStyle();

  return (
    <Card style={{ height: 400 }} shadow="sm" p="lg" radius="md" withBorder>
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

      <p className={classes.descText} color="dimmed">
        {material.materialDescription}
      </p>
      <Text>Unit: {material.unit} </Text>
      <Text>Sap Number: {material.sapNumber} </Text>
      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        See More
      </Button>
    </Card>
  );
};

export default ItemCard;
