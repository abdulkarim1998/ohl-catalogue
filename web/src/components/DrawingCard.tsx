import {
  Card,
  Text,
  Group,
  createStyles,
  Badge,
  Grid,
  ActionIcon,
} from "@mantine/core";
import { Drawing, SmallerMaterials } from "../types/types";
import { Document, Page, pdfjs } from "react-pdf";
import { useCatalogue } from "../context/context";
import { IconAdjustments, IconDownload } from "@tabler/icons";

interface DrawingCardProps {
  drawing: Drawing;
  materials: SmallerMaterials[];
}
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const getUrlFromId = (ref: any) => {
  // Example ref: file-207fd9951e759130053d37cf0a558ffe84ddd1c9-mp3
  // We don't need the first part, unless we're using the same function for files and images
  const [_file, id, extension] = ref.split("-");

  return `https://cdn.sanity.io/files/1pw49hcr/production/${id}.${extension}`;
};

const useStyle = createStyles((theme) => ({
  descText: {
    maxWidth: 400,
    lineClamp: 3,
    boxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

const DrawingCard = ({ drawing, materials }: DrawingCardProps) => {
  const { classes } = useStyle();

  const { materials: allMaterials, setItemFromFuse } = useCatalogue();

  return (
    <Card
      style={{ maxWidth: "70vw", position: "relative" }}
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
    >
      <Card.Section>
        <Document file={getUrlFromId(drawing?.pdf.asset._ref)} rotate={270}>
          <Page pageNumber={1} />
        </Document>
      </Card.Section>

      <ActionIcon
        sx={{ position: "absolute", top: 10, right: 20 }}
        variant="filled"
        onClick={() => {
          window.open(getUrlFromId(drawing?.pdf.asset._ref), "_blank");
        }}
      >
        <IconDownload size="2rem" />
      </ActionIcon>

      <p className={classes.descText} color="dimmed">
        {drawing.description}
      </p>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}> {drawing.drawingName} </Text>
      </Group>

      {materials?.map((m, i) => (
        <Badge
          color="cyan"
          sx={{ ":hover": { backgroundColor: "#70f3f394" } }}
          style={{ height: 30, fontSize: 13, margin: 5, cursor: "pointer" }}
          onClick={() =>
            setItemFromFuse(allMaterials.find((mat) => mat.itemID == m.id))
          }
        >
          {m.name}
        </Badge>
      ))}
    </Card>
  );
};

export default DrawingCard;
