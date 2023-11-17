import { createSlice } from "@reduxjs/toolkit";
import { userPost } from "./userPost";
import { editUserUpdate } from "./editUserUpdate";



export const userInfoValidationSlice = createSlice({
    name: 'userValidation',
    initialState: {
        loading: false,
        errorValidation: null,
    },
    reducers:{
        userPostError: (state, { payload }) => {
            return {
                ...state,
                errorValidation: null
            }
        },
        userUpdateError: (state, { payload }) => {
            return {
                ...state,
                errorValidation: {
                    ...payload
                }
            }
        }
    },
    extraReducers: {
        ///userPost
        [userPost.pending]: (state, { payload }) => {
            return {
                ...state,
                loading: true,
            }
        },
        [userPost.fulfilled]: (state, { payload }) => {

        },
        [userPost.rejected]: (state, { payload }) => {
            // console.log(payload);
            return {
                ...state,
                errorValidation: {
                    ...payload
                }
            }
        },

        [editUserUpdate.rejected]: (state, { payload }) => {
            return {
                ...state,
                errorValidation: {
                    ...payload
                }
            }
        }
    }
});


export const userValidationSelect = state => state.userValidation;

export const userValidationReducer = userInfoValidationSlice.reducer;

export const {userPostError,userUpdateError} = userInfoValidationSlice.actions;