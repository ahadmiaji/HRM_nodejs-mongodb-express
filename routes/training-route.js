const express = require('express');
const { getTrainings, createTraining, getTrainingById } = require('../controllers/training-controller');

const router = express.Router();


router.get('/', getTrainings);
router.post('/', createTraining);
router.get('/:id', getTrainingById);

module.exports = router;
