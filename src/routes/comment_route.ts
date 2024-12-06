import { Router } from 'express';

const router = Router();
const CommentController = require("../controllers/comment");

router.post("/", (req, res) => {
    CommentController.createComment(req, res);
});
router.get("/", (req, res) => {
    CommentController.getCommentById(req, res);
});
router.get("/", (req, res) => {
    CommentController.getCommentsByPost(req, res);
});
router.put("/", (req, res) => {
    CommentController.updateComment(req, res);
});
router.delete("/", (req, res) => {
    CommentController.deleteComment(req, res);
});

export default router;
