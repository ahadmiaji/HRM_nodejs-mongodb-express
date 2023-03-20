const express = require("express");

const { addInfo, getAll, updateInfo } = require("../controllers/leave-type-controller");
const { userMiddleware, isAdmin } = require("../middlewares/user-middleware");

const leaveTypeRouter = express.Router();

leaveTypeRouter.get('/',userMiddleware,isAdmin, getAll);
leaveTypeRouter.post('/create', addInfo);
leaveTypeRouter.put('/update',userMiddleware,isAdmin, updateInfo);

module.exports = leaveTypeRouter;