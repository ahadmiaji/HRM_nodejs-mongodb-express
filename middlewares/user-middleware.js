const User = require("../models/users-model")
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const userMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    if (req?.headers?.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(" ")[1];
        try {
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                
                const user = await User.findById(decoded?.id);
                req.user = user;
                next();
            }
        } catch (error) {
            throw new Error("Not Authorize token expired, Please Login Again");
        }
    } else {    
        throw new Error("There is no token attached to header");
    }
});

const isAdmin = asyncHandler(async (req, res, next) => {
    // const {email} = res.user;
    // console.log(req.user); timestamps: 1.31hr/min
    const { email } = req.user;
    const adminUser = await User.findOne({ email });
    if (adminUser.role !== "admin") {
        throw new Error("You are not Admin");
    } else
        next();

})
module.exports = { userMiddleware, isAdmin };
