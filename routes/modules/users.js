import express from "express";
import User from "../../models/user.js";
import passport from "passport";
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login");
});
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    failureFlash: false,
    // failureFlash: `</br> 這裡可以放共通的 failure message`,
  })
);
router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const errors = []
  if(!name || !email || !password || !confirmPassword){
    errors.push({ message: "所有欄位都是必填。" });
  }
  if(password !== confirmPassword) {
    errors.push({ message: "密碼與確認密碼不相符！" });
  }
  if(errors.length){
    return res.render('register', {
      errors,
      name,
      email, 
      password,
      confirmPassword
    })
  }
  User.findOne({ email }).then((user) => {
    if (user) {
      // console.log("User already exists!");
      errors.push({ message: "這個 Email 已經註冊過了。" });
      return res.render("register", {
        errors,
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
router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if(err) return next(err)
    req.flash("success_msg", "你已經成功登出。");
    res.redirect("/users/login");
  })
})

export default router;
