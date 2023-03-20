const express = require("express");
const { addDesignationInfo, getAllDesignation, getDesignationInfo, updatedesignationInfo } = require("../controllers/designation-controller");
const { userMiddleware, isAdmin } = require("../middlewares/user-middleware");

const designationRouter = express.Router();

designationRouter.get("/", getAllDesignation);
designationRouter.post("/create",userMiddleware,isAdmin, addDesignationInfo);
designationRouter.get("/:id",userMiddleware,isAdmin, getDesignationInfo);
designationRouter.put("/update",userMiddleware,isAdmin, updatedesignationInfo);


module.exports = designationRouter;