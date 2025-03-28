const express = require('express')
const router = express.Router()


router.post('/sign-in', async (req, res, next)=>{
  const { email, password } = req.body
  const user = await global.models.user.findOne({email, password})
  if(user){
    res.cookie('token', user._id.toString())
    return res.status(201).json({success: true, details: user.toJSON()})
  }
  res.status(401).json({error: "No user found"})
})

router.get('/sign-in', async (req, res, next)=>{
  res.render('signin_page')
})

router.post('/sign-up', async(req, res, next)=>{
  try{
    const { email, password, firstName, lastName } = req.body
    let user = await global.models.user.findOne({email, password})
    if(user?._id){
      return res.status(409).json({error: 'User with email already exists.'})
    }
    user = await global.models.user.insertOne({email, password, firstName, lastName})
    res.cookie('token', user._id)
    res.status(201).json(user)
  }catch(err){
    next(err)
  }
})

module.exports = router