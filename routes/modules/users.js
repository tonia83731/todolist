import express from "express";
import User from "../../models/user.js";
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", (req, res) => {});
router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  User.findOne({ email }).then((user) => {
    if (user) {
      console.log("User already exists!");
      res.render("register", {
        name,
        email,
        password,
        confirmPassword,
      });
    } else {
      // method 1
      return User.create({ name, email, password })
        .then(() => res.redirect("/"))
        .catch((error) => console.log(error));
      // method 2
      // const newUser = new User({
      //   name, email, password
      // })
      // newUser
      //   .save()
      //   .then(() => res.redirect('/'))
      //   .catch(error => console.log(error))
    }
  });
});

export default router;
