const express = require('express')
const router = express.Router();
const todo_controller = require('../controllers/todo')

router.get('/',todo_controller.get)

router.post('/',todo_controller.create)

router.patch('/:id',todo_controller.update)

router.delete('/:id',todo_controller.delete)

module.exports = router;