import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";
import { ObjectId } from 'mongodb';

export const getPostComments = async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId })
    .populate("user", "username img")
    .sort({ createdAt: -1 });
  res.json(comments);
};

export const addComment = async (req, res) => {
  const clerkUserId = req.body.userid;
  const postId = req.params.postId;
  const descr = req.body.desc
  console.log(req.headers)
  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const user = await User.findOne({clerkUserId});
  console.log(user);
  const newComment = new Comment({
    desc : descr,
    user: user._id,
    post: postId,
  });

  const savedComment = await newComment.save();
  console.log("saved" + savedComment)
  res.status(201).json(savedComment);
};


export const deleteComment = async (req, res) => {
  const clerkUserId = req.headers.userid;
  const id = req.params.id;

  console.log(req.body);

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const role = req.auth.sessionClaims?.metadata?.role || "user";
  if (role === "admin") {
    await Comment.findByIdAndDelete(req.params.id);
    console.log("comment deleted by admin");
    return res.status(200).json("Comment has been deleted");
  }

  const user = await User.findOne({ clerkUserId });
  const deletedComment = await Comment.findOneAndDelete({
    _id : id,
    user : user._id
  })
  if (!deletedComment) {
    return res.status(403).json("You can delete only your comment!");
  }
  res.status(200).json("Comment deleted");
};