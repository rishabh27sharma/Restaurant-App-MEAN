const jwt =  require('jsonwebtoken')
const asyncHandler =  require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler( async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]
            // console.log(token)

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // get user from token
            req.user = await User.findById(decoded.id).select('-password')

            // console.log(req.user)

            next()
        } catch (error) {
            // console.log(error)
            res.status(401).json({ message: "Not Authorized" })
            // throw new Error('Not Authorized')
        }
    }

    if(!token){
        res.status(401).json({ message: "No token provided" })
        // throw new Error('Not Authorized, No Token')
    }
})

module.exports = { protect }