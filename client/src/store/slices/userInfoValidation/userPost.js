import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const userPost = createAsyncThunk(
    'userValidation/userPost',
    async function(info, { rejectWithValue }) {
        try {
            const response = await axios.post('http://127.0.0.1:8000/add-user', info);

            
            return response.data; 
        } catch (error) {
            
            return rejectWithValue(error.response.data);
        }
    }
);
