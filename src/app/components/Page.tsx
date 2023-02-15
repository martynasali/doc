import React from "react";
import {HeaderDataType} from "../../App";
import Header from "./Header";
import {Radio, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Stack from "@mui/material/Stack";
import SelectFilesBlock from "./SelectFilesBlock";
import {uploaderState, deleteAll, showEntry, setFileType,} from '../features/uploader/uploaderSlice';
import {useAppDispatch, useAppSelector} from "../hooks";
import AlertDialog from "./Alert";

export default function Page(HeaderData: HeaderDataType) {

    return (
        <div className="MainPageContainer">
            <Header {...HeaderData}/>
            <div className={'MainBlock'}>
                <Card>
                    <>
                        <div className={'left-colum'}>
                            <TypeOfDocument/>
                            <ListOfUploads/>
                        </div>
                        <div className={'right-colum'}>
                            <SelectFilesBlock/>
                        </div>
                    </>
                </Card>
            </div>
        </div>
    );
}


const FileBlock = ({nameOfFile}: { nameOfFile: { name: string, id: number, fileType: string } }) => {
    const show = useAppSelector(uploaderState);
    const dispatch = useAppDispatch();
    return (
        <div onClick={() => dispatch(showEntry({id: nameOfFile.id, fileType: nameOfFile.fileType}))}
             className={'file-block-row'}>
            <div className={'file-block'}>
                <span>{nameOfFile.name}.{nameOfFile.fileType}</span>
                <div className={'file-icons'}>
                    <Stack direction="row" spacing={1}>
                        <EditOutlinedIcon sx={{color: 'rgb(109, 123, 135)'}}/>
                        <DeleteOutlineOutlinedIcon sx={{color: 'rgb(109, 123, 135)'}}/>
                    </Stack>
                </div>
            </div>
            <p>Main</p>
        </div>
    )
}

function ListOfUploads() {
    const uploads = useAppSelector(uploaderState);
    const dispatch = useAppDispatch();
    return (
        <CardBlock>
            <>
                <p>List of uploads</p>
                {uploads.files.map(u =>
                    <FileBlock key={'fb' + u.id} nameOfFile={{name: u.name, id: u.id, fileType: u.type}}/>
                )}
                <AlertDialog/>
            </>
        </CardBlock>

    )
}

function TypeOfDocument() {
    const showState = useAppSelector(uploaderState);
    const dispatch = useAppDispatch();
    return (
        <CardBlock>
            <>
                <p>Type of document</p>
                <div className={'select-radio-block'}>
                    <div className={'radio-buttons'}>
                        <Radio
                            checked={showState.ui.fileType === 'pdf'}
                            onChange={() => dispatch(setFileType('pdf'))}
                            value="pdf"
                            color="secondary"
                            name="radio-buttons"
                            inputProps={{'aria-label': 'A'}}
                        />
                        <Radio
                            checked={showState.ui.fileType === 'other'}
                            onChange={() => dispatch(setFileType('other'))}
                            value="other"
                            color="secondary"
                            name="radio-buttons"
                            inputProps={{'aria-label': 'B'}}
                        />
                    </div>

                    <div className={'select-elements'}>
                        <Select
                            disabled={showState.ui.fileType !== 'pdf' ? true : false}
                            variant="outlined"
                            sx={{
                                boxShadow: '3px 3px 6px 0px rgba(194,194,194,1)',
                                width: 1,
                                height: 30,
                                borderRadius: 2,
                                marginTop: 1,
                                border: "1px solid darkgrey",
                                color: "#000",
                                "& .MuiSvgIcon-root": {
                                    color: "white",
                                },
                            }}
                            value={'PDF'}
                        >
                            <MenuItem value={'PDF'}>PDF</MenuItem>
                        </Select>

                        <Select
                            disabled={showState.ui.fileType !== 'other' ? true : false}
                            variant="outlined"
                            sx={{
                                boxShadow: '3px 3px 6px 0px rgba(194,194,194,1)',
                                width: 1,
                                height: 30,
                                borderRadius: 2,
                                marginTop: 1,
                                border: "1px solid darkgrey",
                                color: "#000",
                                "& .MuiSvgIcon-root": {
                                    color: "white",
                                }, '&:focus': {
                                    backgroundColor: 'yellow'
                                }
                            }}
                            value={'Other formats'}
                        >
                            <MenuItem value={'Other formats'}>Other formats</MenuItem>
                        </Select>
                    </div>
                </div>
            </>
        </CardBlock>
    )
}

function CardBlock({children}: { children: JSX.Element }) {
    return (
        <div className={'card-block'}>
            {children}
        </div>
    )
}

function Card({children}: { children: JSX.Element }) {
    return (
        <div className={'Card'}>
            <>{children}</>
        </div>
    )
}