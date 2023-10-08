import express from "express";
const router = express.Router()

import home from './modules/home.js'
import todos from './modules/todos.js'
import users from './modules/users.js'

router.use('/', home)
router.use('/todos', todos)
router.use('/users', users)

export default router