import React, {useEffect, useState} from 'react';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {addFile, uploaderState, handleSubmission} from './uploaderSlice';
import {useDropzone, DropzoneProps} from 'react-dropzone';
import image from "../../../image.png";


interface dropZoneProps extends DropzoneProps {
    files?: File[];
    onDrop?: (acceptedFiles: File[]) => void;
}

export function Uploader(props: dropZoneProps) {
    const uploads = useAppSelector(uploaderState);
    const dispatch = useAppDispatch();
    const onDrop = (acceptedFiles: File[]) => {
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
            <img className={'select-files-image'} src={image}/>
        </div>
    </>)
}
