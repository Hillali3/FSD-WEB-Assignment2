import { Router } from 'express';

const router = Router();
const postsController = require("../controllers/post");

// Route to create a new post
router.post('/', postsController.createPost);

// Route to get all posts
router.get('/', postsController .getPosts);

export default router;
