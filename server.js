const express=require('express')
const User = require('./models/user')
const userroute=require("./routes/user")
require('./config/connect')

const app =express()
app.use(express.json())
app.use('/user',userroute)


app.listen(3000 , ()=>{
    console.log("server work");
})