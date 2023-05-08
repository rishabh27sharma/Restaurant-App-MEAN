const express = require('express');
const colors = require('colors')
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000;
const cors= require("cors")

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }

const connectDB = require('./config/db')

connectDB()

const app = express();

app.use(cors(corsOptions)) // Use this after the variable declaration

app.use(express.json())
app.use(express.urlencoded({ extended: true }))  // body parser

app.use('/api/restaurants', require('./routes/getRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})