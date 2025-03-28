const express = require('express')
const router = express.Router()
const users_controller   = require('../controllers/users')
const path = require('path')


//middlewares
router.use((req,res,next)=>{
  console.log('Middleware executed');
  next()
})
const m1 = (req,res,nxt)=>{console.log('m1');nxt()}
const m2 = (req,res,nxt)=>{console.log('m2');nxt()}


//routes
router.get('/',[m1,m2], users_controller.get)

router.get('/:id', (req, res)=>{
  res.json({id: req.params.id, name: 'Yogesh'})
})

router.post('/', users_controller.post)


module.exports = router