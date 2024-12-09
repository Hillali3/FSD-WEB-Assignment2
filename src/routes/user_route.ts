import { Router } from "express";

const router = Router();
const UserController = require("../controllers/user");
const authenticate = require("../middlewares/authMiddleware");

router.post("/", authenticate, (req, res) => {
  UserController.createUser(req, res);
});
router.get("/", authenticate, (req, res) => {
  UserController.getUsers(req, res);
});
router.get("/id/:id", authenticate, (req, res) => {
  UserController.getUserById(req, res);
});
router.get("/username/:username", authenticate, (req, res) => {
  UserController.getUserByUsername(req, res);
});
router.put("/:id", authenticate, (req, res) => {
  UserController.updateUser(req, res);
});
router.delete("/:id", authenticate, (req, res) => {
  UserController.deleteUser(req, res);
});

export default router;
