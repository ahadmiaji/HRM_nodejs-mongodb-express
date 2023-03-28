const express = require("express");
const { getBonusSetting, createBonusSetting, updateBonusSetting, getBonusSettingById, deleteBonusSetting } = require("../controllers/BonusSetting-controller");
const { userMiddleware, isAdmin } = require("../middlewares/user-middleware");

const router =express.Router();

router.get('/', getBonusSetting);
router.post('/create',userMiddleware,isAdmin, createBonusSetting);
router.put("/update", updateBonusSetting);
router.get("/:id", getBonusSettingById);
router.delete("/delete/:id", deleteBonusSetting);



module.exports = router;