import passport from "passport";
import User from "../models/user.js";
import localstrategy from 'passport-local'
const LocalStrategy = localstrategy.Strategy

export default (app) => {
  // 初始化passport模組
  app.use(passport.initialize())
  app.use(passport.session())

  // 設定本地登入策略
  passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
    User.findOne({email})
      .then(user => {
        if(!user){
          return done(null, false, {message: 'That email is not registered!'})
        }
        if(user.password !== password) {
          return done(null, false, {message: 'Email or Password incorrect!'})
        }
        return done(null, user)
      })
      .catch(error => done(error, false))
  }))
  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(error => done(error, null))
  })
}