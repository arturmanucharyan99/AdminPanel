import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const userDelete = createAsyncThunk(
    'users/userDelete',
    async function(userId){
        try {
            // console.log(userId);
            const response = await axios.delete(`http://127.0.0.1:8000/delete-user/${userId}`);

            return userId;
            
        } catch (error) {
            console.log(error);
        }
    }
);