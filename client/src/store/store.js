import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/users/usersSlice";
import { editUserReducer } from "./slices/editUser/editUserSlice";
import { userValidationReducer } from "./slices/userInfoValidation/userInfoValidation";



const store = configureStore({
    reducer:{
        users:usersReducer,
        editUser:editUserReducer,
        userValidation:userValidationReducer

    }
});


export default store;