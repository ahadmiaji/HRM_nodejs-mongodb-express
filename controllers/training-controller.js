const Training = require('../models/training-model');


const createTraining = async (req, res) => {

    try {
        const trainings = await Training.create(req.body);
        // console.log("trainings :", trainings);
        
        return res.json({ 
            success: true,
            statusCode: 201,
            message: "Training created successfully!",
            data: trainings
        });

    } catch (error) {
        console.log("error: ", error);
    }
};


const getTrainings = async (req, res) => {
    try {
        const trainings = await Training.find();
        res.json(trainings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getTrainingById = async (req, res) => {
    try {
        const training = await Training.findById(req.params.id);
        if (!training) {
            return res.status(404).json({ message: 'Training not found' });
        }
        res.json(training);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteTrainingById = async (req, res) => {
    try {
        const training = await Training.findByIdAndDelete(req.params.id);
        if (!training) {
            return res.status(404).json({ message: 'Training not found' });
        }
        res.json(training);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
module.exports ={createTraining , getTrainings, getTrainingById, deleteTrainingById}
