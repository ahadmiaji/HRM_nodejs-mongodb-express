const express = require("express");
const { addUserInfo, getUserInfo, updateInfo, getAllUser, loginUserCtrl, handleRefreshToken, logout, updatePassword, forgetPasswordToken, resetPassword } = require("../controllers/users-controller");
const { userMiddleware, isAdmin } = require("../middlewares/user-middleware");


const userRouter = express.Router();

userRouter.get("/", getAllUser);
userRouter.get("/refresh", handleRefreshToken);
userRouter.get("/logout", logout);
userRouter.post("/forget-password-token", forgetPasswordToken);
userRouter.put("/reset-password/:token", resetPassword);

userRouter.post("/create", addUserInfo);
userRouter.post("/login", loginUserCtrl);
userRouter.put("/update", userMiddleware, updateInfo);
userRouter.put("/password", userMiddleware, updatePassword);

userRouter.get("/:id", userMiddleware, isAdmin, getUserInfo);


module.exports = userRouter;