import express from "express";
const router = express.Router();

import passport from "passport";

router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email', 'public_profile']
}))

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    failureFlash: false,
  })
);

export default router;