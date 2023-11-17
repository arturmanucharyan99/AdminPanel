import { createSlice } from "@reduxjs/toolkit";
import { editUserGet } from "./editUserGet";
import { editUserUpdate } from "../userInfoValidation/editUserUpdate";


export const editUserSlice = createSlice({
    name: 'editUser',
    initialState: {
        data: null,
        loading: false,
        error: false,
        errorUpdate:null
    },
    reducers: {
        changeInput(state, { payload }) {
            const { name, value } = payload;
            return {
                ...state,
                data:{
                    [name]: value
                }
            }
        },
        clearInput(state, { payload }) {
            return {
                ...state,
                data: null
            }
        },
        changeError:(state,{payload})=>{
            return{
                ...state,
                error:false
            }
        },
        changeLoading:(state,{payload})=>{
            return {
                ...state,
                loading:payload,
            }
        },

    },
    extraReducers: {
        [editUserGet.pending]: (state, { payload }) => {
            return {
                ...state,
                loading:true,
            }
        },
        [editUserGet.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading:false,
                data:{
                    ...payload
                }
                
            }
        },
        [editUserGet.rejected]:(state, { payload }) => {
            console.log(payload);
            return {
                ...state,
                error:true
            }
        },

        [editUserUpdate.rejected]:(state,{payload})=>{
            return {
                ...state,
                errorUpdate:{
                    ...payload
                }
            }
        },


        
    }
});


export const editUserReducer = editUserSlice.reducer;

export const editUserSelector = state => state.editUser;

export const { changeInput,changeLoading, clearInput,changeError } = editUserSlice.actions;