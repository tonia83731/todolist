import express from "express";
const router = express.Router();

import home from "./modules/home.js";
import todos from "./modules/todos.js";
import users from "./modules/users.js";
import { authenticator } from "../middleware/auth.js";

router.use("/todos", authenticator, todos);
router.use("/users", users);
router.use("/", authenticator, home);

export default router;
