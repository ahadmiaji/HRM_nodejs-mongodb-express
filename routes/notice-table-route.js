const expres = require('express');
const { createNotiiceTable, getNoticeTable, getNoticeTableById, updateNoticeTable, deleteNoticeTable } = require('../controllers/notice-table-controller');


const router =expres.Router();

router.get("/", getNoticeTable);
router.post('/create', createNotiiceTable);
router.put("/update", updateNoticeTable);
router.get("/:id", getNoticeTableById);
router.delete("/:id", deleteNoticeTable);


module.exports = router;
