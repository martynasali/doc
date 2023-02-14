import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PreviewIcon from "@mui/icons-material/Preview";
import {FileName, PreviewPage} from './SelectFilesBlock'
import {useAppDispatch, useAppSelector} from "../hooks";
import {uploaderState, State, File, showPage, closePage,} from "../features/uploader/uploaderSlice";

export default function ScrollDialog({children}: { children: JSX.Element | JSX.Element[] }) {
    const showState: State = useAppSelector(uploaderState);
    const show_it = useAppSelector(uploaderState);
    const dispatch = useAppDispatch();

    return (<>
        {showState.files.map((sh: File) => sh.id == show_it.ui.id ?
            <><PreviewIcon key={'pi' + sh.id} onClick={() => dispatch(showPage(sh.id))}
                           sx={{fontSize: 15, color: 'rgb(100, 115, 128)'}}/>
                <DialogBlock key={'db' + sh.id} {...sh}></DialogBlock></> : '')}
    </>)
}

function DialogBlock(sh: File, {children}: { children: JSX.Element | JSX.Element[] }) {
    const dispatch = useAppDispatch();
    const show_it = useAppSelector(uploaderState);
    return (
        <>
            <Dialog
                open={show_it.ui.openPage!}
                onClose={() => dispatch(closePage(show_it.ui.id))}
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