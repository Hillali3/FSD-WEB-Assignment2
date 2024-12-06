import { Router } from 'express';

const router = Router();
const postController = require("../controllers/post");

router.post("/", (req, res) => {
  postController.createPost(req, res);
});
router.get("/", (req, res) => {
    postController.getPosts(req, res);
});
router.get("/", (req, res) => {
    postController.getPostById(req, res);
});
router.get("/", (req, res) => {
    postController.getPostByUserId(req, res);
});
router.put("/", (req, res) => {
    postController.updatePost(req, res);
});
router.delete("/", (req, res) => {
    postController.deletePost(req, res);
});

export default router;
