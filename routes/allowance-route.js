const express = require('express');
const { createAllowance, getAllowance, getAllowanceById, updateAllowance, DeleteAllowanceById } = require('../controllers/allowance-controller');


const router = express.Router();


router.get('/', getAllowance );
router.post('/create', createAllowance );
router.put('/update', updateAllowance);
router.get('/:id', getAllowanceById );
router.delete('/:id', DeleteAllowanceById);

module.exports = router;