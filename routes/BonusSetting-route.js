const express = require("express");
const { getBonusSetting, createBonusSetting, updateBonusSetting, getBonusSettingById, deleteBonusSetting } = require("../controllers/BonusSetting-controller");

const router =express.Router();

router.get('/', getBonusSetting);
router.post('/create', createBonusSetting);
router.put("/update", updateBonusSetting);
router.get("/:id", getBonusSettingById);
router.delete("/delete/:id", deleteBonusSetting);



module.exports = router;