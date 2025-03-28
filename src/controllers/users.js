
module.exports = {
  get: async (req, res)=>{
    const User = global.models.user
    const users = await User.find({})
    res.status(200).json(users)
  },

  post: async(req, res)=>{
    const User = global.models.user
    const user = new User(req.body)
    await user.save()
    res.json(user)
  }
}