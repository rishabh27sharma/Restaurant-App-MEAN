const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
    },
    mobile: {
        type: Number,
        required: [true, 'Please add an mobile'],
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
    },
})

userSchema.plugin(uniqueValidator, { message: 'Email already in use.' });

module.exports = mongoose.model('User', userSchema)