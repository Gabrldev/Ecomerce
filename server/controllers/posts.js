import Post from "../models/Post.js";
import User from "../models/User.js";
import { httpError } from "../utils/HttpError.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    httpError(res, err);
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (error) {
    httpError(res, error);
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (error) {
    httpError(res, error);
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes(userId);
    if (isLiked) {
      post.likes.delete(userId);
    }else{
      post.likes.set(userId, true);
    }
    const updatePost = await Post.findByIdAndUpdate(
      id,
      {likes: post.likes},
      {new: true}
    )
    res.status(200).json(updatePost);
  } catch (error) {
    httpError(res, error);
  }
};
