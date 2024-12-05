import { Router } from 'express';

const router = Router();
const commentsController = require("../controllers/comment");

// Route to create a new comment
router.post('/', commentsController.createComment);

// Route to get comments for a specific post
router.get('/:postId', commentsController.getComments);

export default router;
