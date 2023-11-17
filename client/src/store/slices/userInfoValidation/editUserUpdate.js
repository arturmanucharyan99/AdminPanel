import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const editUserUpdate = createAsyncThunk(
    'userValidation/editUserUpdate',
    async function (data,{ rejectWithValue }) {
        try {

            await axios.patch('http://localhost:8000/upadate-user', data);
            // return
        } catch (error) {
            return rejectWithValue(error.response.data);
        }   

    }
)