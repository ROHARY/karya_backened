require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser');
const cors         = require('cors')
const https        = require('https');
const fs           = require('fs');
const routes       = require('./routes')
const authenticate = require('./middlewares/auth')
const db = require('./db')
const app = express()
const PORT = process.env.PORT
const corsOptions = {
    origin: ['http://localhost:3334', 'https://localhost:3334'], // Replace with the origin you want to allow
    credentials: true
  };



// Read the certificates you generated
const options = {
    key: fs.readFileSync('./localhost-key.pem'),
    cert: fs.readFileSync('./localhost.pem'),
  };
app.use(authenticate)
app.use(cors(corsOptions));
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
// app.use('/',(req, res)=> res.send('hey'))
app.use('/',routes)
db.connect().then((conn)=>{
    console.log('db successfully connected !!!')
    global.models = require('./db/models')

    https.createServer(options, app).listen(PORT, () => {
        console.log(`Backend running on https://localhost:${PORT}`);
      });
    // app.listen(PORT, ()=>{
    //     console.log(`App Listening on port ${PORT}`)
    // })
}).catch((err)=>{
    console.log('Something went worng while starting the server', err)
})
app.use((err,req, res, next)=>{
    console.error('Something went wrong', err)
    res.status(500).send('Something went horribly wrong.')
})

process.on("exit", code => {
    if (process.exit_message)
      console.log("Recieved `exit_message`...", process.exit_message);
    console.log(`Exiting process with code ${code} at ${Date()}`);
});
