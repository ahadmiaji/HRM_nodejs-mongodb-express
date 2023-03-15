const User = require("../models/users-model");
const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshToken"); //before use make sure you required refreshtoken.
const jwt = require("jsonwebtoken");
const { getDepartmentInfoByFilterQuery } = require("./department-controller");
const validateMongoDbId = require("../utils/validateMongodbId");
const sendEmail = require("./emailController");
const { successResponseHandler } = require("../helpers/success-response-handler");
const { userInfo } = require("os");

//get all User info by filter query

const getUserInfoByFilterQuery = async (id) => {
    try {
        return await User.findById(id);
    } catch (error) {
        throw error
    }
};

//get a User info by filter query

const getUserListByFilterQuery = async () => {
    try {
        return await User.find();
    } catch (error) {
        throw error
    }
};

//createUser
const addUserInfo = asyncHandler(async (req, res) => {
    try {

        const input = req.body;

        const departmentInfo = await getDepartmentInfoByFilterQuery(input.departmentId);

        if (!departmentInfo) {
            let customError = new Error("Invalid department info!");
            customError.statusCode = 404;
            throw customError;
        }

        input.designationName = departmentInfo.name;

        const user = await User.create(input);

        return res.json({
            success: true,
            statusCode: 201,
            message: "User created successfully!",
            data: user
        });
    } catch (error) {
        console.log("error: ", error);
    }
});


//login user
const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email });

    if (findUser && (await findUser.isPasswordMatched(password))) {
        const refreshToken = await generateRefreshToken(findUser?._id);

        const updateuser = await User.findByIdAndUpdate(findUser.id,
            {
                refreshToken: refreshToken,
            },
            { new: true }
        );
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });

        const userInfo =({
            _id: findUser?._id,
            name: findUser?.name,
            // lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: await generateToken(findUser?._id),
        });

        await successResponseHandler(res, 200,"User login Successfully", "userDetails" , userInfo);
        // res.json(findUser); //when it use it will show you password hash
    } else {
        throw new Error("Invalid Credentials");
    }
});

const handleRefreshToken = asyncHandler(async (req, res) => {
    try {
        const cookie = req.cookies;

        if (!cookie?.refreshToken) {
            let customError = new Error("Refresh token not found!");
            customError.statusCode = 404;
            throw customError;
        }

        const refreshToken = cookie.refreshToken;

        const userInfo = await User.findOne({ refreshToken });

        if (!userInfo) {
            let customError = new Error("User not found!");
            customError.statusCode = 404;
            throw customError;
        }
    
        // let accessToken;

        await jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {

            if (err || userInfo.id !== decoded.id) {
                let customError = new Error("There is something wrong with Refresh Token");
                customError.statusCode = 404;
                throw customError;
            }
            else {
                const accessToken = generateToken(userInfo?._id);

                return res.json({
                    success: true,
                    statusCode: 201,
                    accessToken: accessToken
                });
            }
        });



    } catch (error) {
        throw error;
    }
});

//logout

// const logout = asyncHandler(async (req, res) => {

//     try {
//         const cookie = req.cookies;

//         if (!cookie?.refreshToken) {
//             let customError = new Error("No Refresh Token in Cookies!");
//             customError.statusCode = 404;
//             throw customError;
//         }

//         const refreshToken = cookie.refreshToken;

//         const user = await User.findOne({ refreshToken });

//         if (!user) {
//             let customError = new Error("RefreshToken not found!");
//             customError.statusCode = 404;
//             throw customError;
//         }

//         if (!user) {
//             res.clearCookie("refreshToken", {
//                 httpOnly: true,
//                 secure: true,
//             });
//             return res.sendStatus(204);  //forbidden
//         }

//         await User.findOneAndUpdate(refreshToken, {
//             refreshToken: " ",
//         });
//         res.clearCookie("refreshToken", {
//             httpOnly: true,
//             secure: true,
//         });
//         res.sendStatus(204); //forbidden
//     } catch (error) {
//         throw error;
//     }
// });
const logout = asyncHandler(async (req, res) => {
    try {
        const cookie = req.cookies;

        if (!cookie?.refreshToken) {
            let customError = new Error("No refresh token in cookies");
            customError.statusCode = 404;
            throw customError;
        }

        const refreshToken = cookie.refreshToken;

        const userInfo = await User.findOne({ refreshToken });

        if (!userInfo) {

            res.clearCookie("refreshToken", { httpOnly: true, secure: true });

            return await successResponseHandler(res, 204, "Access Forbidden", null, null);
        }

        await User.findOneAndUpdate(refreshToken, { refreshToken: "" });
        res.clearCookie("refreshToken", { httpOnly: true, secure: true });

        return await successResponseHandler(res, 204, "Logout successfully!", null, null);

    } catch (error) {
        throw error;
    }
});


const updatePassword = asyncHandler(async (req, res) => {
  
    try {
        const { _id } = req.user;
        
        // const { password } = req.body;

        await validateMongoDbId(_id);

        const user = await User.findById(_id);
        

        if (!user) {
            let customError = new Error("No user found!");
            customError.statusCode = 404;
            throw customError;
        }

        if (req.body && req.body.password) {
            user.password = req.body.password;
            const updatePassword = await user.save();
        }

        return await successResponseHandler(res, 200, "User password changed successfully!");
    } catch (error) {
        throw new Error(error);
    }

});



const forgetPasswordToken = asyncHandler(async (req, res) => {
    const { email } = req.body;
    console.log("email :", email);
    const user = await User.findOne({ email });
    console.log("user :", user);
    if (!user) throw new Error("User not Found with this email");
    try {
        // console.log("token", "token");
        const token = await user.createPasswordResetToken();
        await user.save();

        const resetURL = `Hi, Please Follow this link to reset Your Password. This Link is valid till 10 minutes from now . <a href='http://localhost:5005/api/v1/users/reset-password/${token}'>Click here</a>`;

        const data = {
            to: email,
            text: " Hey User",
            subject: "Forgot Password Link",
            htm: resetURL,

        };
        await sendEmail(data);
        res.json(token);
    } catch (error) {
        throw new Error(error);
    }

});


//token called from usermodel. 
const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) throw new Error("Token Expired, Please try again later");
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json(user);
});




const getAllUser = asyncHandler(async (req, res) => {
    try {
        const user = await getUserListByFilterQuery();

        if (!user) {
            let customError = new Error("Invalid user info!");
            customError.statusCode = 404;
            throw customError;
        }

        return res.json({
            success: true,
            statusCode: 200,
            message: "User fetch successfully!",
            data: user
        });

    } catch (error) {
        console.log("Error: ", error);
    }
});

const getUserInfo = async (req, res) => {

    const { _id } = req.user;
    validateMongoDbId(_id);

    try {

        const userInfo = await getUserInfoByFilterQuery(req.params.id);

        if (!userInfo) {
            let customError = new Error("Invalid user info!");
            customError.statusCode = 404;
            throw customError;
        }

        return res.json({
            success: true,
            statusCode: 200,
            message: "User info fetch successfully!",
            details: userInfo
        });

    } catch (error) {
        console.log("Error: ", error);
    }
};


const updateInfo = async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const updateData = req.body;

        const userInfo = await getUserInfoByFilterQuery(updateData.id);

        if (!userInfo) {
            let customError = new Error("Invalid userInfo!");
            customError.statusCode = 404;
            throw customError;
        }

        const user = new User(userInfo);

        let isChanged = false;

        if (updateData.name && userInfo.name !== updateData.name) {
            isChanged = true;
            user.name = updateData.name;
        }

        if (updateData.email && userInfo.email !== updateData.email) {
            isChanged = true;
            user.email = updateData.email;
        }

        if (updateData.phone && userInfo.phone !== updateData.phone) {
            isChanged = true;
            user.phone = updateData.phone;
        }

        if (updateData.departmentId && userInfo.departmentId.toString() !== updateData.departmentId.toString()) {

            const departmentInfo = getDepartmentInfoByFilterQuery(updateData.departmentId);

            if (!departmentInfo) {
                let customError = new Error("Invalid department info!");
                customError.statusCode = 404;
                throw customError;
            }

            isChanged = true;
            user.departmentId = departmentInfo._id;
            user.departmentName = departmentInfo.name;
        }

        if (updateData.designationId && userInfo.designationId.toString() !== updateData.designationId.toString()) {

            const designationInfo = getDesignationInfoByFilterQuery(updateData.designationId);

            if (!designationInfo) {
                let customError = new Error("Invalid designation info!");
                customError.statusCode = 404;
                throw customError;
            }

            isChanged = true;
            user.designationId = designationInfo._id;
            user.designationName = designationInfo.name;

        }

        if (isChanged) {
            const updateuserInfo = await user.save();

            return res.json({
                success: true,
                statusCode: 200,
                message: "User updated successfully!",
                details: updateuserInfo
            });
        }

        return res.json({
            success: true,
            statusCode: 200,
            message: "User updated successfully!",
            details: userInfo
        });

    } catch (error) {
        throw error;
    }
};

module.exports = { addUserInfo, loginUserCtrl, handleRefreshToken, logout, updatePassword, forgetPasswordToken, resetPassword, getAllUser, getUserInfo, updateInfo };