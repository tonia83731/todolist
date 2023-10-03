import express from "express";
const router = express.Router()

import home from './modules/home.js'
import todos from './modules/todos.js'

router.use('/', home)
router.use('/todos', todos)

export default router