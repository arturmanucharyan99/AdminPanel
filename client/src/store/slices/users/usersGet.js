import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const usersGet = createAsyncThunk(
    'users/usersGet',
    async function () {
        try {
            const { data } = await axios.get('http://localhost:8000/');

            return data;
        } catch (error) {
            return error.response.data;
            // return rejectWithValue(error);
        }
    }
)