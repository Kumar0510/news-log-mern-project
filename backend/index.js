import express from "express";
const app = express();
import connectDB from './lib/connectDB.js'
import cors from "cors";
import userRouter from './routes/user.route.js'
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import webHookRouter from './routes/webhook.route.js'
import {clerkMiddleware} from '@clerk/express'
import dotenv from 'dotenv'

dotenv.config();
const corsOptions = {
  origin: '*',
};
app.use(cors(corsOptions));
app.use(clerkMiddleware())
app.use("/webhooks", webHookRouter);


app.use((error, req, res, next) => {
  res.status(error.status || 500);
  
  res.json({
    message: error.message || "Something went wrong!",
    status: error.status,
    stack: error.stack,
  });
});

app.get("/auth-state", (req, res) => {
const authState = req.auth;
 res.json(authState);
});


app.get("/protect", (req, res) => {   const {userId} = req.auth;
   if(!userId){
     return res.status(401).json("not authenticated")
   }
   res.status(200).json("content")
 });

app.use(express.json());
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use('/comments', commentRouter)
app.listen(3000, () => {
  connectDB();
  console.log("server running on 3000");
});

