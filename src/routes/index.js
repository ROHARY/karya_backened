const todosRouter = require('./todo')
const usersRouter = require('./user')
const authRouter = require('./auth')
const express = require('express')
const router = express.Router()

router.use('/todos', todosRouter)
router.use('/user', usersRouter)
router.use('/auth', authRouter)

module.exports = router