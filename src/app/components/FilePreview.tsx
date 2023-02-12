import React, { useState } from "react";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import {FileType} from "../features/uploader/uploaderSlice";


export default function FilePreview(file: FileType) {
    const [numPages, setNumPages] = useState(null);

    function onDocumentLoadSuccess( {numPages}:any) {
        setNumPages(numPages);
    }

    return (
        <div>
            <Document file={file.path}
                      onLoadSuccess={onDocumentLoadSuccess}>
                {Array.from(new Array(numPages), (el, index) => (

                    <Page className={'file-preview'} key={`page_${index + 1}`} pageNumber={index + 1} />
                ))}
            </Document>
        </div>
    )
}