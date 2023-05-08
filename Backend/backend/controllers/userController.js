const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require("../models/userModel")


// @desc Authenticate User
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    // Check for user email
    const user = await User.findOne({email})

    if(user && await bcrypt.compare(password, user.password)){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        }).status(200)
    }else{
        res.status(400)
        throw new Error('Invalid Credentials')
    }

    // res.json({ message: 'Login User' })
})

// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    // console.log(req.body)
    const { name, email, password, mobile } = req.body;

    if (!name || !email || !password || !mobile) {
        res.status(400)
        throw new Error('Please add all fields')
    }
    // check if user exists
    const userExits = await User.findOne({ email })

    if (userExits) {
        res.status(400)
        throw new Error('User already exists')
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        mobile
    })

    newUser.save();

    if(newUser){
        res.status(201).json({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            mobile: newUser.mobile,
            token: generateToken(newUser._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid User')
    }

    // res.json({ message: 'Register User' })
})

// @desc Get User data
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
    // res.json({ message: 'User data display' })
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: '30d' })
}


module.exports = {
    registerUser,
    loginUser,
    getMe
}