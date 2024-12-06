import { Router } from "express";

const router = Router();
const UserController = require("../controllers/user");

router.post("/", (req, res) => {
  UserController.createUser(req, res);
});
router.get("/", (req, res) => {
  UserController.getUsers(req, res);
});
router.get("/id/:id", (req, res) => {
  UserController.getUserById(req, res);
});
router.get("/username/:username", (req, res) => {
  UserController.getUserByUsername(req, res);
});
router.put("/:id", (req, res) => {
  UserController.updateUser(req, res);
});
router.delete("/:id", (req, res) => {
  UserController.deleteUser(req, res);
});

export default router;
