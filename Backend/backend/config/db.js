const mongoose = require('mongoose')

mongoose.set('strictQuery', false);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/restaurentDB')

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    }
    catch (err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB;