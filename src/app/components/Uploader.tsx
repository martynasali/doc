import React, {useEffect, useState} from 'react';
import {useDropzone, DropzoneProps, FileWithPath} from 'react-dropzone';
import image from "../../image.png";


interface dropZoneProps extends DropzoneProps {
    files?: File[];
    onDrop?: (acceptedFiles: File[]) => void;
}

export function Uploader(props: dropZoneProps) {
    const [files, setFiles] = useState<File[]>([]);

    const onDrop = (acceptedFiles: File[]) => {
        setFiles(
            acceptedFiles.map(
                file => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })
            )
        );
    }

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({onDrop: onDrop});

    useEffect(
        () => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            files.forEach((file: any) => URL.revokeObjectURL(file.preview));
        },
        [files]
    );

    return (<>
        <div className={'upload-files'} {...getRootProps()}>
            <h2>Select files</h2>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the files here</p> :
                    <p>Drop files here or click&nbsp;<a>browse</a></p>
            }
            <img className={'select-files-image'} src={image}/>
        </div>
    </>)

}