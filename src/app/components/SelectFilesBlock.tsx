import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Stack from "@mui/material/Stack";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import Document from './Document'
import {Uploader} from "../features/uploader/Uploader";
import {useAppDispatch, useAppSelector} from "../hooks";
import {show, toggleEntry} from "../features/show/showSlice";
import {uploaderState, FileType} from "../features/uploader/uploaderSlice";
import DocViewer, {DocViewerRenderers} from "@cyntler/react-doc-viewer";
import FilePreview from "./FilePreview";

export default function SelectFilesBlock() {
    const show_it = useAppSelector(show);
    const dispatch = useAppDispatch();
    return (
        <div className={'SelectFilesBlock'}>
            {/*<FilePreview/>*/}
            <div>
                <Accordion elevation={3} onClick={() => dispatch(toggleEntry())} expanded={!show_it.show}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <h4>Select more files to upload</h4>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Uploader/>
                    </AccordionDetails>
                </Accordion>
                <ViewUploadedFiles/>
            </div>
        </div>
    )
}

function ViewUploadedFiles() {
    const show_it = useAppSelector(show);
    const files = useAppSelector(uploaderState);
    const dispatch = useAppDispatch();

    return (
        <Accordion onClick={() => dispatch(toggleEntry())} expanded={show_it.show} className="preview-block">
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
                <h4>Preview uploadded files</h4>
            </AccordionSummary>
            <AccordionDetails>
                <Stack direction="row" justifyContent="center" alignItems="center">
                    <FileName/>
                    <Stack direction="row" sx={{marginLeft: 'auto'}} alignItems="flex-end" spacing={1}>

                        <Document><FileName/></Document>
                        <FileDownloadOutlinedIcon sx={{fontSize: 15, color: 'rgb(100, 115, 128)'}}/>
                    </Stack>
                </Stack>
                {files.map(f => (f.id == show_it.id) ? <BlankPage key={'bp' + f.id} {...f}/> : '')}
            </AccordionDetails>
        </Accordion>
    )
}

export function PreviewPage(file?: FileType) {
    if (file?.type !== 'pdf') {
        return (
            <div className={'file-preview'}>
                <DocViewer config={{
                    header: {
                        disableHeader: true,
                        disableFileName: true,
                        retainURLParams: false,
                    },
                }}
                           documents={[{uri: file ? file.path : ''}]} pluginRenderers={DocViewerRenderers}/>
            </div>
        )
    } else {
        return (
            <div className={'file-preview'}>
                <FilePreview {...file}/>
            </div>
        )
    }
}

export function BlankPage(file?: FileType) {
    return (
        <div className={'file-preview'}>
            <DocViewer config={{
                header: {
                    disableHeader: true,
                    disableFileName: true,
                    retainURLParams: false,
                },
            }}
                       documents={[{uri: file ? file.path : ''}]} pluginRenderers={DocViewerRenderers}/>
        </div>
    )
}

export function FileName() {
    return (
        <>
            <Stack sx={{marginLeft: 'auto'}} direction="row" justifyContent="center" alignItems="center" spacing={3}>
                <ArrowBackIosIcon sx={{fontSize: 15, color: 'rgb(100, 115, 128)'}} fontSize="small"/>
                <p className={'file-name'}>Name of the file.pdf</p>
                <ArrowForwardIosIcon sx={{fontSize: 15, color: 'rgb(100, 115, 128)'}} fontSize="small"/>
            </Stack>

        </>
    )
}
