import express from "express";
const router = express.Router();

import Todo from "../../models/todo.js";

router.get("/", (req, res) => {
  const userId = req.user._id;
  Todo.find({ userId })
    .lean()
    .sort({ _id: "asc" })
    .then((todos) => res.render("index", { todos }))
    .catch((error) => console.error(error));
});

export default router;
