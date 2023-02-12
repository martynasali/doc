import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../../store';
import {FileWithPath} from 'react-dropzone';


export interface FileType {
    id: number;
    path: string;
    name: string;
    status: 'ok' | 'idle' | 'loading' | 'failed';
    type: string;
    openPage: boolean;
};


export const initialState: FileType[] = []

export const uploaderSlice = createSlice({

    name: 'uploader',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        addFile: (state, action) => {

        },
        deleteAll: () => {
            return []
        },
    }, extraReducers: (builder) => {
        builder
            .addCase(handleSubmission.pending, (state: FileType[]) => {

            })
            .addCase(handleSubmission.fulfilled, (state: FileType[], action) => {
                let id = Math.max(...state.map(s => s.id))
                id = id == -Infinity ? 0 : id + 1;
                let name = action.payload[1][0].name.split('.')[0]
                state.push({
                    type: action.payload[2],
                    id: id,
                    name: name,
                    path: action.payload[0].fileUrl,
                    status: 'ok',
                    openPage: false,
                })
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
    async (selectedFile: FileWithPath[]) => {
        let ext = fileExtension(selectedFile[0])
        if (!ext) {
            throw new Error("File type is not supported");
        }
        const formData = new FormData();
        formData.append('File', selectedFile[0]);
        const response = await fetch(
            'https://api.upload.io/v2/accounts/12a1xxQ/uploads/form_data',
            {
                method: 'POST',
                body: formData,
                headers: new Headers({'Authorization': 'Bearer public_12a1xxQCS3oNdGZacNSUy1igmHNE'})
            }
        )
            .then((response) => {
                return response.json()
            })
            .then((result) => {
                console.log('Success:', result.files[0].fileUrl);
                return [result.files[0], selectedFile, ext]
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        return response
    })


export const {addFile, deleteAll} = uploaderSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const uploaderState = (state: RootState) => state.uploader;

export default uploaderSlice.reducer;