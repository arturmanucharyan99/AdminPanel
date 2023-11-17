import express from "express";
import router from "./router/users.js";
import  {apiPort,dbURL}  from "./config/index.js";
import moongose from "mongoose";
import bodyParser from "body-parser";
import cors from 'cors';

const app = express();

app.use(cors());
app.use(bodyParser.json())
app.use(express.json());
app.use(router);


moongose.connect(dbURL).then(()=>{

    app.listen(apiPort);
});

// app.listen(8000);