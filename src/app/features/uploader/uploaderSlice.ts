import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../../store';

export interface FileType {
    id: number;
    path: string;
    name: string;
    status: 'ok' | 'idle' | 'loading' | 'failed';
    type: string | boolean;
    openPage: boolean;
};


export const initialState: FileType[] = []

function validate(fname: string) {
    var re = /(\.jpg|\.jpeg|\.bmp|\.gif|\.png|\.pdf|)$/i;
    if (!re.exec(fname)) {
        return false
    } else {
        let re = /(?:\.([^.]+))?$/;
        return String(re.exec(fname))
    }
}

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
            .addCase(handleSubmission.pending, (state) => {

            })
            .addCase(handleSubmission.fulfilled, (state: FileType[], action) => {
                let id = Math.max(...state.map(s => s.id))
                id = id == -Infinity ? 0 : id + 1;
                let name = action.payload[1][0].name.split('.')[0]
                state.push({
                    type: action.payload[1][0].type,
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

export const handleSubmission: any = createAsyncThunk(
    'uploader/handleSubmission',
    async (selectedFile: File[]) => {
        // if(!validate(String(selectedFile[0].path))){
        //     return false
        // }
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
                return [result.files[0], selectedFile]
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