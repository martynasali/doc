import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PreviewIcon from "@mui/icons-material/Preview";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { BlankPage } from './SelectFilesBlock'

export default function ScrollDialog({children}: {children: JSX.Element|JSX.Element[]}) {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

    const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef<HTMLElement>(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <>
            <PreviewIcon onClick={handleClickOpen('paper')} sx={{fontSize: 15, color: 'rgb(100, 115, 128)'}}/>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                sx={{ '& .MuiPaper-root': { borderRadius: '36px', width: 1 },'& .MuiDialogContent-root':{border:'none'}}}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">
                    {children}
                </DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        {/*{[...new Array(50)].map(()=><BlankPage />)}*/}
                        <div className="scrollbar" id="style-10">
                            <div className="force-overflow"></div>
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    );
}