const express = require('express')
const router = express.Router();

router.get('/', async (req, res, next)=>{
    console.log('got it !')
    let results = await global.models.todo.find({})
    res.send({data: results})
})

router.post('/', async (req, res, next)=>{
    let data = req.body
    let result  = await global.models.todo.create({
        ...data
    })
    res.json({data: result})
})

module.exports = router;