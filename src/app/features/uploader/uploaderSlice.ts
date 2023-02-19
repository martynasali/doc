import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../../store';
import {FileWithPath} from 'react-dropzone';
import axios from "axios";


export interface File {
    id: number;
    path: string;
    name: string;
    status: 'ok' | 'idle' | 'loading' | 'failed';
    type: string;
    openPage: boolean;
};

export interface State {
    ui:{
        id?: number;
        uploader?:boolean;
        preview?:boolean;
        openPage?:boolean;
        openDocument?:boolean;
        uploadFiles?:boolean;
        backdrop:boolean;
        fileType?: 'pdf' | 'other';
        uploadProgress?:number;
    },
    files:File[];
}

export const initialState: State = {ui:{fileType: 'pdf', uploader:true, preview:false, backdrop:false, uploadProgress:0}, files:[]};

export const uploaderSlice = createSlice({

    name: 'uploader',
    initialState,
    reducers: {
        uploadState: (state) => {
            state.ui = {...state.ui, backdrop:true}
            return state
        },
        addFile: (state, action) => {
            state.ui = {...state.ui, backdrop:true}
            return state
        },
        deleteAll: (state) => {
            return{ui:{...initialState.ui}, files:[]};
        },
        uploadProgress: (state, action) =>{
            state.ui = {...state.ui, uploadProgress:action.payload}
            return state
        },
        toggleUploader:(state) =>{
            state.ui.uploader = !state.ui.uploader;
            return state
        },
        togglePreview:(state)=>{
            state.ui.preview = !state.ui.preview;
            return state
        },
        showEntry: (state, action) => {
            state.ui = {...state.ui, id:action.payload.id, preview:true, backdrop:false, uploader:false, fileType: action.payload.fileType === 'pdf' ? 'pdf' : 'other' }
            return state
        },
        showPage: (state, action) => {
            state.ui = {...state.ui, backdrop:false, id:action.payload === undefined ? 1 : action.payload , uploader:false, openPage:true}
            return state
        },
        closePage: (state, action) => {
            state.ui = {...state.ui, id:action.payload, uploader:false, openPage:false}
            return state
        },
        setFileType: (state, action) =>{
            state.ui = {...state.ui, fileType:action.payload, openDocument: true}
            return state
        },
    }, extraReducers: (builder) => {
        builder
            .addCase(handleSubmission.pending, (state:State) => {
                state.ui = {...state.ui, backdrop:true}
                return state
            })
            .addCase(handleSubmission.fulfilled, (state: State, action) => {
                let id = Math.max(...state.files.map(s => s.id))
                id = id == -Infinity ? 0 : id + 1;
                let name = action.payload[1][0].name.split('.')[0]
                state.files.push({
                    type: action.payload[2],
                    id: id,
                    name: name,
                    path: action.payload[0].fileUrl,
                    status: 'ok',
                    openPage: false,
                })
                state.ui = {...state.ui, id:id, uploader:false, preview:true, backdrop:false, fileType: action.payload.fileType === 'pdf' ? 'pdf' : 'other', uploadProgress:0}
                return state
            })
            .addCase(handleSubmission.rejected, (state) => {
                console.log('rejected')
            });
    },
});

function fileExtension(filename: FileWithPath) {
    let supportedFiles = ["pdf", "png", "jpg", "jpeg", 'pdf', 'csv', 'doc'];
    let ext = (/[^./\\]*$/.exec(filename.path!) || [""])[0];
    ext = ext.toLowerCase();
    if (supportedFiles.includes(ext)) {
        return ext
    } else {
        return false
    }
};

export const handleSubmission: any = createAsyncThunk(
    'uploader/handleSubmission',
    async (selectedFile: FileWithPath[], {dispatch}) => {
        let ext = fileExtension(selectedFile[0])
        if (!ext) {
            throw new Error("File type is not supported");
        }
        const formData = new FormData();
        formData.append('File', selectedFile[0]);
        const headers = { 'Authorization': 'Bearer public_FW25b5LEKMHh69RHufwmzuANiaxe' };
        const config = {
            onUploadProgress: function(progressEvent:any) {
                let percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
                console.log(percentCompleted)
                dispatch(uploadProgress(percentCompleted));
            },
            headers:headers
        }
        const response = await axios.post('https://api.upload.io/v2/accounts/FW25b5L/uploads/form_data', formData, config)
            .then(response => {
                console.log('Success:', response.data.files[0].fileUrl);
                return [response.data.files[0], selectedFile, ext];
            })
            .catch(error => {
                console.error('Error:', error);
            });
        return response
    })


export const {addFile, deleteAll, toggleUploader, showEntry, showPage, closePage, togglePreview, uploadState, setFileType, uploadProgress} = uploaderSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const uploaderState = (state: RootState) => state.uploader;

export default uploaderSlice.reducer;
