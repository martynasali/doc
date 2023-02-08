import React, {FunctionComponent} from "react";
import {HeaderDataType} from "../../App";
import Header from "./Header";
import {FormControlLabel, Paper, Radio, RadioGroup, Select} from "@mui/material";
import image from "../../image.png";
import MenuItem from "@mui/material/MenuItem";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Stack from "@mui/material/Stack";
import SelectFilesBlock from "./SelectFilesBlock";
import {uploaderState, deleteAll} from '../features/uploader/uploaderSlice';
import {show, showEntry} from '../features/show/showSlice';
import {useAppDispatch, useAppSelector} from "../hooks";


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


const FileBlock = ({nameOfFile}: { nameOfFile: {name:string, id:number} }) => {
    const show = useAppSelector(showEntry);
    const dispatch = useAppDispatch();
    return (
        <div onClick={() => dispatch(showEntry(nameOfFile.id))} className={'file-block-row'}>
            <div className={'file-block'}>
                {nameOfFile.name}
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
                <FileBlock nameOfFile={{name:'martynas', id:1}}/>
                {uploads.map(u =>
                    <FileBlock nameOfFile={{name:u.name, id:u.id}}/>
                )}
                <p onClick={() => dispatch(deleteAll())} className={'clear-all'}>Clear all</p>
            </>
        </CardBlock>

    )
}

function TypeOfDocument() {
    const [selectedValue, setSelectedValue] = React.useState('pdf');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };
    return (
        <CardBlock>
            <>
                <p>Type of document</p>
                <div className={'select-radio-block'}>
                    <div className={'radio-buttons'}>
                        <Radio
                            checked={selectedValue === 'pdf'}
                            onChange={handleChange}
                            value="pdf"
                            color="secondary"
                            name="radio-buttons"
                            inputProps={{'aria-label': 'A'}}
                        />
                        <Radio
                            checked={selectedValue === 'other'}
                            onChange={handleChange}
                            value="other"
                            color="secondary"
                            name="radio-buttons"
                            inputProps={{'aria-label': 'B'}}
                        />
                    </div>

                    <div className={'select-elements'}>
                        <Select
                            disabled={selectedValue !== 'pdf' ? true : false}
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
                            disabled={selectedValue !== 'other' ? true : false}
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
                            <MenuItem value={"epub"}>epub</MenuItem>
                            <MenuItem value={"doc"}>doc</MenuItem>
                            <MenuItem value={"jpg"}>jpg</MenuItem>
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