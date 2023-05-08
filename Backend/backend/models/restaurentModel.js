const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const restaurentSchema = mongoose.Schema({
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'User'
    // },
    name: {
        type: String,
        required: [true, 'Please enter restaurent name']
    },
    email: {
        type: String,
        required: [true, 'Please enter valid email'],
        unique: true
    },
    mobile: {
        type: Number,
        required: [true, 'Please enter valid mobile number'],
        // unique: true
    },
    address: {
        type: String,
        required: [true, 'Please enter restuarent address']
    },
    services: {
        type: String,
        required: [true, 'Please enter services']
    }
})


restaurentSchema.plugin(uniqueValidator, { message: 'Email already in use.' });
module.exports = mongoose.model('Restuarent', restaurentSchema)