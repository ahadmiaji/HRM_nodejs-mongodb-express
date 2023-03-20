const express = require('express');
const { createAllowance, getAllowance, getAllowanceById, updateAllowance, DeleteAllowanceById } = require('../controllers/allowance-controller');
const { userMiddleware, isAdmin } = require('../middlewares/user-middleware');


const router = express.Router();


router.get('/', getAllowance );
router.post('/create', createAllowance );
router.put('/update',userMiddleware,isAdmin, updateAllowance);
router.get('/:id', userMiddleware ,isAdmin , getAllowanceById);
router.delete('/:id',userMiddleware , isAdmin,DeleteAllowanceById);

module.exports = router;