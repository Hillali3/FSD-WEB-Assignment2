import { Router } from 'express';

const router = Router();
const CommentController = require("../controllers/comment");

router.post("/", (req, res) => {
    CommentController.createComment(req, res);
});
router.get("/", (req, res) => {
    CommentController.getComments(req, res);
});
// router.get('/:id', CommentController.getCommentById);
// router.put('/:id', CommentController.updateComment);
// router.delete('/:id', CommentController.deleteComment);

export default router;
