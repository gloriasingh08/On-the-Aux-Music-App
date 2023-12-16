import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./routes/index.js";
import session from 'express-session';
import connectStore from 'connect-mongo';
import {SESS_LIFETIME,SESS_SECRET,SESS_NAME} from './config/config.js';



mongoose.connect('mongodb+srv://admin:admin@cluster0.tybff.mongodb.net/on-the-aux', {
    autoIndex: true,
}).then(() => {
    console.log('Connected to MongoDB');
});


const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
//app to use session middleware
app.use(session({
    name:SESS_NAME,
    secret:SESS_SECRET,
    saveUninitialized:false, //this is according to the law which require permission before setting a cookie
    resave:false, //this prevents un-necessary resaves if the session was not modified
    //defining cookie params
    cookie:{
        sameSite:true,
        maxAge:parseInt(SESS_LIFETIME)

    }
}));
routes(app);

// const token=

export default app;