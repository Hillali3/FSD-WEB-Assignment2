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

// // Get post by id
// const getPostById = async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ error: "Invalid id" });
//   }

//   try {
//     const post = await Posts.findById(id);
//     if (!post) {
//       return res.status(404).json({ message: "Post is not found" });
//     }
//     res.status(200).json(post);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching post", error });
//   }
// };


// //update post by id
// const updatePost = async (req, res) => {
//   const id = req.params.id;
//   const { title, content, sender } = req.body;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ error: "Invalid id" });
//   }
  
//   try {
//     const updatedPost = await Posts.findByIdAndUpdate(
//       id,
//       { title, content, sender },
//       { new: true }
//     );
//     if (!updatedPost) {
//       return res.status(404).json({ message: "Post not found" });
//     }
//     res.status(200).json(updatedPost);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating post", error });
//   }
// };
