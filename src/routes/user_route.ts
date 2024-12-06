import { Router } from 'express';

const router = Router();
const UserController = require("../controllers/user");

router.post('/', UserController.createUser);
router.get('/', UserController.getUsers);

export default router;
