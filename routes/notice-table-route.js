const expres = require('express');
const { createNotiiceTable, getNoticeTable, getNoticeTableById, updateNoticeTable, deleteNoticeTable } = require('../controllers/notice-table-controller');
const { userMiddleware, isAdmin } = require('../middlewares/user-middleware');


const router = expres.Router();

router.get("/", getNoticeTable);
router.post('/create', userMiddleware, isAdmin, createNotiiceTable);
router.put("/update", updateNoticeTable);
router.get("/:id", userMiddleware, isAdmin, getNoticeTableById);
router.delete("/:id", userMiddleware, isAdmin, deleteNoticeTable);


module.exports = router;
