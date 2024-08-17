const jwt = require("jsonwebtoken");
const User = require('../models/user.models')
const {ErrorHandler} = require("../middleware/error");

exports.isAuthenticates = async (req, res, next) => {
try{
const {token} = req.cookies
console.log(token)
if(!token) return next(new ErrorHandler("Please login first", 401))
const decoded = jwt.verify(token, process.env.JWT_SECRET)
const user = await User.findById(decoded.id)
if(!user) return next(new ErrorHandler("User not found", 404))
req.user = user
console.log(req.user)
next()
}catch(eror){
return next(eror)
}

}