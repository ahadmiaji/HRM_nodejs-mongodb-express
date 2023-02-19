const express = require("express");
const { addDesignationInfo, getAllDesignation, getDesignationInfo, updatedesignationInfo } = require("../controllers/designation-controller");

const designationRouter = express.Router();

designationRouter.get("/", getAllDesignation);
designationRouter.post("/create", addDesignationInfo);
designationRouter.get("/:id", getDesignationInfo);
designationRouter.put("/update", updatedesignationInfo);


module.exports = designationRouter;