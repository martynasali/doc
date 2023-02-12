import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type { RootState } from '../../store';

export interface Type {
    id?: number;
    show?:boolean;
    openPage?:boolean;
    openDocument?:boolean;
    uploadFiles?:boolean;
    fileType?: 'pdf' | 'other';
};


const initialState:Type = {fileType: 'pdf'}

export const showSlice = createSlice({
    name: 'show',
    initialState,
    reducers: {
        toggleEntry:(state) =>{
            state.show = state.show ? false : true;
            return state
        },
        showEntry: (state, action) => {
            state = {...state, id:action.payload.id, show:true, fileType: action.payload.fileType === 'pdf' ? 'pdf' : 'other' }
            return state
        },
        showPage: (state, action) => {
            state = {...state, id:action.payload === undefined ? 1 : action.payload , show:false, openPage:true}
            return state
        },
        closePage: (state, action) => {
            state = {...state, id:action.payload, show:false, openPage:false}
            return state
        },
        setAfterUpload: (state) => {
            state = {...state, show: true}
            return state
        },
        setFileType: (state, action) =>{
            state = {...state, fileType:action.payload, openDocument: true}
            return state
        }
    }

});

export const {showEntry, toggleEntry, showPage, closePage, setAfterUpload, setFileType} = showSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const show = (state: RootState) => state.show;

export default showSlice.reducer;