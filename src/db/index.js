const mongoose = require('mongoose')
const DB_NAME = process.env.DB_NAME || 'todos'
const MONGO_URL = (process.env.MONGO_URL) || `mongodb://127.0.0.1:27017/`

exports.connect = async function connect(){
  try{
    return await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, dbName: DB_NAME  })
  }catch(err){
    console.error('Error connecting to mongodb..', )
    return null
  }
}