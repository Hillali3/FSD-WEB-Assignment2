import { Router } from 'express';

const router = Router();
const postController = require("../controllers/post");

router.post('/', postController.createPost);
router.get('/', postController .getPosts);
router.get("/:id", postController.getPostById);
router.put("/:id", postController.updatePost);

export default router;
