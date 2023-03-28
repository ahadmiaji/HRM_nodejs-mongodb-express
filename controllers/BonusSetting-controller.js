const BonusSetting = require ("../models/BonusSetting-model");

const createBonusSetting = async(req,res)=>{
    try {
        req.body.createdBy = req.user._id;

        const bonussetting = await BonusSetting.create(req.body);

        return res.json({
            success : true,
            statusCode:201,
            message:"BonusSetting Created Successfully!",
            data: bonussetting
        })
    } catch (error) {
        console.log("error:", error);
    }
};

const getBonusSetting = async(req,res)=>{
    try {
        const bonussetting = await BonusSetting.find();
        res.json(bonussetting)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    };

const getBonusSettingById = async(req,res) =>{
    try {
        const bonussetting = await BonusSetting.findById(req.prams.id);
        
        if (!bonussetting){
            return res.status(404).json({ message: 'BonusSetting not found' });
        }

        res.json(bonussetting);
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
};

const deleteBonusSetting = async(req,res)=>{
    try {
        const bonussetting = await BonusSetting.findByIdAndDelete(req.params.id);

        if (!bonussetting) {
            return res.status(404).json({ message: 'BonusSetting not found' });
        }
       
        return res.json({
            success: true,
            statusCode: 201,
            message: "BonusSetting deleted successfully!",
            data: bonussetting
        });
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
};


const updateBonusSetting = async (req, res) => {

    try {
        const updateData = req.body;


        const bonussettingInfo = await BonusSetting.findById(updateData.id);

        if (!bonussettingInfo) {
            return res.status(404).json({ succes: false, statusCode: 404, message: 'BonusSetting not found' });
        }

        const bonussetting = new BonusSetting(bonussettingInfo);

        let isChanged = false;

        if (updateData.festival_name && bonussettingInfo.festival_name !== updateData.festival_name) {
            isChanged = true;
            bonussetting.festival_name = updateData.festival_name;
        }

        if (updateData.percentage_of_bonus && bonussettingInfo.percentage_of_bonus !== updateData.percentage_of_bonus) {
            isChanged = true;
            bonussetting.percentage_of_bonus = updateData.percentage_of_bonus;
        }

        if (updateData.bonus_type && bonussettingInfo.bonus_type !== updateData.bonus_type) {
            isChanged = true;
            bonussetting.bonus_type = updateData.bonus_type;
        }


        if (isChanged) {
            const updatedbonussettingInfo = await bonussetting.save();

            return res.json({
                success: true,
                statusCode: 200,
                message: "BonusSetting updated successfully!",
                details: updatedbonussettingInfo
            });
        }

        return res.json({
            success: true,
            statusCode: 200,
            message: "BonusSetting updated successfully!",
            details: bonussettingInfo
        });

    } catch (error) {
        throw error;
    }
};



module.exports ={
 createBonusSetting,
 getBonusSetting,
 getBonusSettingById,
 deleteBonusSetting,
 updateBonusSetting
}