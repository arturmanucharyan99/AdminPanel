import { createSlice } from "@reduxjs/toolkit";
import { usersGet } from "./usersGet";
import { userDelete } from "./userDelete";





const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        loading: false,
        error: false,
        errorPost: null
    },
    reducers: {
        // userPostError: (state, { payload }) => {
        //     return {
        //         ...state,
        //         errorPost: null
        //     }
        // },
        // userUpdateError: (state, { payload }) => {
        //     return {
        //         ...state,
        //         errorPost: {
        //             ...payload
        //         }
        //     }
        // }
    },
    extraReducers: {

        ///userGet
        [usersGet.pending]: (state, { payload }) => {
            return {
                ...state,
                loading: true
            }
            // console.log('loadin');
        },
        [usersGet.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                users: [
                    ...payload
                ]
            };
        },
        [usersGet.rejected]: (state, { payload }) => {
            // console.log(payload);
            return {
                ...state,
                error: true
            }
        },




        ///userDelete
        [userDelete.pending]: (state, { payload }) => {
            return {
                ...state,
                loading: true,

            }
        },
        [userDelete.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                users: [
                    ...state.users.filter(el => el._id !== payload)
                ]
            }
        },
        [userDelete.rejected]: (state, { payload }) => {
            return {
                ...state,
                error: true
            }
        },


        
    }
});


export const selectUsers = state => state.users;

export const usersReducer = usersSlice.reducer;

// export const { userPostError } = usersSlice.actions;

