import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type { RootState } from '../../store';

export interface Type {
    id?: number;
    show?:boolean;
    openPage?:boolean;
    openDocument?:boolean;
    uploadFiles?:boolean;
};

const initialState:Type = {}

const obj = {}

export const showSlice = createSlice({
    name: 'show',
    initialState,
    reducers: {
        toggleEntry:(state) =>{
            state.show = state.show ? false : true;
            return state
        },
        showEntry: (state, action) => {
            state = {id:action.payload, show:true}
            return state
        },
        showPage: (state, action) => {
            state = {id:action.payload === undefined ? 1 : action.payload , show:false, openPage:true}
            return state
        },
        closePage: (state, action) => {
            state = {id:action.payload, show:false, openPage:false}
            return state
        },
        setAfterUpload: (state, action) => {
            state = {id:action.payload, show:false, openPage:false}
            return state
        },
    }
});

export const {showEntry, toggleEntry, showPage, closePage, setAfterUpload} = showSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const show = (state: RootState) => state.show;

export default showSlice.reducer;