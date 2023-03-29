const express = require('express');
const { getAnnualDays, createAnnualDays, updateAnnualDays, getAnnualDaysById, deleteAnnualDays } = require('../controllers/annualdays-controller');

const { userMiddleware, isAdmin } = require('../middlewares/user-middleware');


const router = express.Router();


router.get('/', getAnnualDays );
router.post('/create',userMiddleware,isAdmin, createAnnualDays );
router.put('/update', userMiddleware, isAdmin, updateAnnualDays);
router.get('/:id', userMiddleware, isAdmin, getAnnualDaysById);
router.delete('/:id', userMiddleware, isAdmin, deleteAnnualDays);

module.exports = router;