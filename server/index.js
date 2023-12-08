import express from 'express';
import bodyparser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import {register} from "./controllers/auth.js";
import {createPost} from "./controllers/posts.js"
import { verifyToken } from './middleware/auth.js';
import { users,posts } from './data/index.js';
import User from './models/User.js';
import Post from './models/Posts.js';

const __filename=fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const  app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyparser.json({limit:"30mb",extended:true}));
app.use(bodyparser.urlencoded({limit:'30mb',extended:true}));
app.use(cors());
app.use("/assets",express.static(path.join(__dirname,'public/assets')));

// File Storage 
const storage = multer.diskStorage(

    {
    destination:function(req,file,cb){
        cb(null,"public/assets");
    },

filename:function(req,file,cb){
 cb(null,file.originalname);
}
    }
)

const upload=multer({storage});

//Routes with FILES
app.post("/auth/register",upload.single("picture"),register);
app.post("/posts",verifyToken,upload.single("picture"),createPost);

//Routes
app.use("/auth",authRoutes);
app.use("/users",userRoutes);
app.use("/posts",postRoutes);
//Mongoose setup
const PORT=process.env.PORT || 6001
mongoose.connect(process.env.MONGO_URL,{
    maxPoolSize: 50,
  wtimeoutMS: 2500,
  useNewUrlParser: true,
useUnifiedTopology:true,


}).then(()=>{
    app.listen(PORT,()=>console.log(`SERVER Port : ${PORT}`))
    //INser Records
    // User.insertMany(users);
    // Post.insertMany(posts)

}).catch((error)=>console.log(`error ${error} ddid not connect`));
   
