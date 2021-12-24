import React from 'react';
import { pdfjs, Document, Page } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function ResumePdf({theme, width, onRender = () => {}}) {
    return (
        <Document
            file={`/resume/${theme}.pdf`}
            externalLinkTarget="_blank"
            loading={<div />}>
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
