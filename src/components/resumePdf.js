import React from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function ResumePdf({ theme, width, onRender = () => {} }) {
  return (
    <Document
      file={`/resume/${theme}.pdf`}
      externalLinkTarget="_blank"
      loading={<div />}
    >
      <Page
        onRenderSuccess={onRender}
        width={width}
        pageNumber={1}
        loading={<div />}
      />
    </Document>
  );
}

export default ResumePdf;
