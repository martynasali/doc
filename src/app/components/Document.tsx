import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PreviewIcon from "@mui/icons-material/Preview";
import {FileName, PreviewPage} from './SelectFilesBlock'
import {useAppDispatch, useAppSelector} from "../hooks";
import {uploaderState, FileType} from "../features/uploader/uploaderSlice";
import {show, showPage, closePage,} from "../features/show/showSlice";

export default function ScrollDialog({children}: { children: JSX.Element | JSX.Element[] }) {
    const showState: FileType[] = useAppSelector(uploaderState);
    const show_it = useAppSelector(show);
    const dispatch = useAppDispatch();

    return (<>
        {showState.map((sh: FileType) => sh.id == show_it.id ?
            <><PreviewIcon key={'pi' + sh.id} onClick={() => dispatch(showPage(sh.id))}
                           sx={{fontSize: 15, color: 'rgb(100, 115, 128)'}}/>
                <DialogBlock key={'db' + sh.id} {...sh}></DialogBlock></> : '')}
    </>)
}

function DialogBlock(sh: FileType, {children}: { children: JSX.Element | JSX.Element[] }) {
    const dispatch = useAppDispatch();
    const show_it = useAppSelector(show);
    const descriptionElementRef = React.useRef<HTMLElement>(null);
    return (
        <>
            <Dialog
                open={show_it.openPage!}
                onClose={() => dispatch(closePage(show_it.id))}
                scroll={'paper'}
                sx={{
                    '& .MuiPaper-root': {borderRadius: '36px', width: 1},
                    '& .MuiDialogContent-root': {border: 'none'}
                }}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">
                    <FileName/>
                    {children}
                </DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <PreviewPage {...sh}/>
                        <div className="scrollbar" id="style-10">
                            <div className="force-overflow"></div>
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}