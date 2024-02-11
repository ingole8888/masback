const express = require('express');
const connection = require('./connetion');
const cors = require('cors');
const playerRouter = require('./route/playerRoute');

const app = express();
const authController = require('./route/userRoute');
const { verify } = require('./middleware/Verify');
app.use(express.json());
app.use(cors());

app.use('/user', authController);
app.use('/', verify, playerRouter);

app.get('/',(req,res)=>{
    res.send("hello world")
})

app.listen(8080,()=>{
    connection()
    console.log('port is running on 8080')
})
