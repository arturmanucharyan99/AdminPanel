import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";




export const editUserGet = createAsyncThunk(
    "editUser/editUserGet",
    async function (userId,{rejectWithValue}) {
        try {

            const { data } = await axios.post('http://localhost:8000/edit-user-get', {
                userId: userId
            });

            return data;
        } catch (error) {
            return error.response.data
        //    return rejectWithValue(error);
        }
    }
)