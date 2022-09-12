import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import RedoIcon from "@mui/icons-material/Redo";
import UndoIcon from "@mui/icons-material/Undo";
import DownloadIcon from "@mui/icons-material/Download";

import { IconButton } from "@mui/material";
import "./preview.scss";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const getUrlFromId = (ref) => {
  // Example ref: file-207fd9951e759130053d37cf0a558ffe84ddd1c9-mp3
  // We don't need the first part, unless we're using the same function for files and images
  const [_file, id, extension] = ref.split("-");

  return `https://cdn.sanity.io/files/1pw49hcr/production/${id}.${extension}`;
};

const QUARTER_CIRCLR = 90;

const Preview = ({ selected }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const [degree, setDegree] = useState(-90);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function download() {
    const link = document.createElement("a");
    link.href = getUrlFromId(selected?.pdf.asset._ref);
    link.target = "_blank";
    link.click();
  }

  return (
    <>
      <div className="app_preview-icons">
        {/* <IconButton
          style={{ color: "white" }}
          onClick={() => setDegree((prev) => prev - QUARTER_CIRCLR)}
        >
          <UndoIcon />
        </IconButton>

        <IconButton
          style={{ color: "white" }}
          onClick={() => setDegree((prev) => prev + QUARTER_CIRCLR)}
        >
          <RedoIcon />
        </IconButton> */}

        <IconButton
          onClick={download}
          style={{ color: "white", marginLeft: 20 }}
        >
          <DownloadIcon />
        </IconButton>
      </div>

      <Document
        file={getUrlFromId(selected?.pdf.asset._ref)}
        onLoadSuccess={onDocumentLoadSuccess}
        rotate={270}
      >
        <Page pageNumber={pageNumber} />
      </Document>
    </>
  );
};

export default Preview;
