const todosRouter = require('./todo')
const express = require('express')
const router = express.Router()

router.use('/todos', todosRouter)

module.exports = router