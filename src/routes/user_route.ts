import { Router } from 'express';

const router = Router();
const UserController = require("../controllers/user");

router.post("/", (req, res) => {
    UserController.createUser(req, res);
});
router.get("/", (req, res) => {
    UserController.getUsers(req, res);
});

export default router;
