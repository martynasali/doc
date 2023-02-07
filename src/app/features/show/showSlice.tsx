import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type { RootState } from '../../store';

interface Type {
    id?: number;
    show?:boolean;
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
    }
});

export const {showEntry, toggleEntry} = showSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const show = (state: RootState) => state.show;

export default showSlice.reducer;