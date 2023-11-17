import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";




export const editUserGet = createAsyncThunk(
    "editUser/editUserGet",
    async function (userId, { rejectWithValue }) {

        const { data } = await axios.post('http://localhost:8000/edit-user-get', {
            userId: userId
        });

        return data;

    }
)