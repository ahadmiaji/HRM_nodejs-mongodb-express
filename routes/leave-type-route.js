const express = require("express");

const { addInfo, getAll, updateInfo } = require("../controllers/leave-type-controller");

const leaveTypeRouter = express.Router();

leaveTypeRouter.get('/', getAll);
leaveTypeRouter.post('/create', addInfo);
leaveTypeRouter.put('/update', updateInfo);

module.exports = leaveTypeRouter;