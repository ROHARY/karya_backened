
module.exports = {
  get: async (req, res)=>{
    console.log('got it !')
    let results = await global.models.todo.find({})
    res.status(200).json({data: results})
  },

  show: async(req, res, next)=>{
    let data = req.body
    let result  = await global.models.todo.create({
        ...data
    })
    res.status(200).json({data: result})
  },

  create: async(req, res)=>{
    const User = global.models.user
    const user = new User(req.body)
    await user.save()
    res.json(user)
  },

  update: async(req, res, next)=>{
    try{
        let data = req.body
        const id = req.params.id
        const todo = await global.models.todo.findOne({_id: new mongoose.Types.ObjectId(id)})
        console.log(todo.title)
        if(!todo){
            res.status(404).send('Todo does not exist')
        }else{
            todo.title = data.title ?? todo.title
            todo.status = data.status ?? todo.status
            await todo.save()
        }
        res.json(todo)
    }catch(err){
        console.error('Something went wrong while updating...', err)
        res.status(422).send(err.message)
    }
  },

  delete: async(req, res, next)=>{
    try{
      const id = req.params.id
      const todo = await global.models.todo.findOne({_id: new mongoose.Types.ObjectId(id)})
      console.log(todo.title)
      if(!todo){
          res.status(404).send('Todo does not exist')
      }else{
          await global.models.todo.findOneAndDelete({_id: new mongoose.Types.ObjectId(id)})
          console.error('Deleted successfully')
          res.status(204).send('Deleted!!')
      }
  }catch(err){
      console.error('Something went wrong while deleting...', err)
      res.status(422).send('Could not delete.')
  }

  },
}