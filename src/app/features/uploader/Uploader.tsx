import React from 'react';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {addFile, uploaderState, uploadState, handleSubmission} from './uploaderSlice';
import {useDropzone, DropzoneProps} from 'react-dropzone';
import image from "../../../image.png";
import CircularProgress, {CircularProgressProps,} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


interface dropZoneProps extends DropzoneProps {
    files?: File[];
    onDrop?: (acceptedFiles: File[]) => void;
}

export function Uploader(props: dropZoneProps) {
    const dispatch = useAppDispatch();
    const uploads = useAppSelector(uploaderState);

    const onDrop = (acceptedFiles: File[]) => {
        dispatch(uploadState());
        dispatch(addFile(acceptedFiles))
        dispatch(handleSubmission([...acceptedFiles]))
    }

    const {
        getRootProps,
        getInputProps,
        isDragActive,
    } = useDropzone({onDrop: onDrop});


    return (<>
        <div className={'upload-files'} {...getRootProps()}>
            <h2>Select files</h2>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the files here!</p> :
                    <p>Drop files here or click&nbsp;<a>browse</a></p>
            }
            {(uploads.ui.uploadProgress == 0) ? '' :
                <Progress value={uploads.ui.uploadProgress ? uploads.ui.uploadProgress : 0}/>
            }
            <img className={'select-files-image'} src={image}/>
        </div>
    </>)
}

function Progress(
    props: CircularProgressProps & { value: number },
) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex', marginTop:2, }}>
            <CircularProgress  color="secondary" variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}

