import { Request, Response } from 'express';
import Comment from '../models/comment';

// Create a new comment
export const createComment = async (req: Request, res: Response) => {
  const { postId, text } = req.body;

  if (!postId || !text) {
    return res.status(400).json({ message: 'Post ID and text are required' });
  }

  try {
    const newComment = new Comment({ postId, text });
    await newComment.save();
    return res.status(201).json(newComment);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating comment', error });
  }
};

// Get comments for a specific post
export const getComments = async (req: Request, res: Response) => {
  const postId = req.params.postId;

  try {
    const comments = await Comment.find({ postId });
    if (comments.length === 0) {
      return res.status(404).json({ message: 'No comments found for this post' });
    }
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching comments', error });
  }
};