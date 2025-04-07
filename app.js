const express = require("express");
const userRouter = require('./routes/userRoutes');
const viewRouter= require("./routes/AdminviewRoutes")
const path = require("path");


const app = express();
app.use(express.json())
app.use('/api/v1/users', userRouter)
app.use('/', viewRouter)

app.use(express.static(path.join(__dirname, 'View','Admin')))



module.exports = app