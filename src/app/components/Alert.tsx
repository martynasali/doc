import * as React from 'react';
import Button from '@mui/material/Button';
import {useAppDispatch} from "../hooks";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import {deleteAll} from "../features/uploader/uploaderSlice";

export default function AlertDialog() {
    const dispatch = useAppDispatch();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleClear = () => {
        setOpen(false);
        dispatch(deleteAll())
    }

    return (
        <div>
            <p onClick={handleClickOpen} className={'clear-all'}>Clear all</p>
            <Dialog
                sx={{'& .MuiPaper-root': {borderRadius: '25px', padding:'12px'}}}
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"

            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete all files? You’ll have to
                        start uploading process from the very beginning.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="success" sx={{borderRadius: '10px'}} variant="outlined" onClick={handleClose}>Cancel</Button>
                    <Button color="success" sx={{borderRadius: '10px'}} variant="contained" onClick={handleClear}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}