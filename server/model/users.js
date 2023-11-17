import moongose from "mongoose";


const Schema = moongose.Schema;


const userSchema = new Schema({
    firstName:{
        required:true,
        type:String
    },
    lastName:{
        required:true,
        type:String
    },
    userName:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    },

});

export default moongose.model("Users",userSchema);