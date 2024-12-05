import { Request, Response } from 'express';
import Post from '../models/post';

// Create a new post
export const createPost = async (req: Request, res: Response) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  try {
    const newPost = new Post({ title, content });
    await newPost.save();
    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating post', error });
  }
};

// Get all posts
export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching posts', error });
  }
};