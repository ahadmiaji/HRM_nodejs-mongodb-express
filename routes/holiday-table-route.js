const express = require('express');
const { createHolidayTable, getholidaytable, getHolidayTableById, deleteHolidayTableById, updateHolidayTable } = require('../controllers/holiday-table-controller');
const { userMiddleware, isAdmin } = require('../middlewares/user-middleware');



const router = express.Router();


router.get('/', getholidaytable );
router.post('/create',userMiddleware,isAdmin, createHolidayTable );
router.put('/update', updateHolidayTable);
router.get('/:id',userMiddleware,isAdmin, getHolidayTableById );
router.delete('/:id',userMiddleware,isAdmin, deleteHolidayTableById );

module.exports = router;