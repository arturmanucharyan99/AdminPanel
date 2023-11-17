import dotenv from "dotenv";

dotenv.config();


export const apiPort = process.env.PORT;

export const dbURL = process.env.CONNECT_URL;
