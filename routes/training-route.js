const express = require('express');
const { getTrainings, createTraining, getTrainingById } = require('../controllers/training-controller');
const { userMiddleware, isAdmin } = require('../middlewares/user-middleware');

const router = express.Router();


router.get('/', getTrainings);
router.post('/', createTraining);
router.get('/:id',userMiddleware,isAdmin, getTrainingById);

module.exports = router;
