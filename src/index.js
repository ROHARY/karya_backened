require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser');
const cors         = require('cors')
const routes = require('./routes')
const db = require('./db')
const app = express()
const PORT = process.env.PORT
const corsOptions = {
    origin: '*', // Replace with the origin you want to allow
  };

app.use(cors(corsOptions));
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
// app.use('/',(req, res)=> res.send('hey'))
app.use('/',routes)

db.connect().then((conn)=>{
    console.log('db successfully connected !!!')
    global.models = require('./db/models')
    app.listen(PORT, ()=>{
        console.log(`App Listening on port ${PORT}`)
    })
}).catch((err)=>{
    console.log('Something went worng while starting the server', err)
})

process.on("exit", code => {
    if (process.exit_message)
      console.log("Recieved `exit_message`...", process.exit_message);
    console.log(`Exiting process with code ${code} at ${Date()}`);
});
