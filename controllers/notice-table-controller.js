const NoticeTable = require("../models/notice-table-model");


const createNotiiceTable = async (req, res) => {
    try {
        const noticetable = await NoticeTable.create(req.body);

        return res.json({
            success: true,
            statusCode: 201,
            message: "NoticeTable created successfully!",
            data: noticetable
        })
    } catch (error) {
        console.log("error : ", error);
    }
};

const getNoticeTable = async (req, res) => {
    try {
        const noticetable = await NoticeTable.find();
        res.json(noticetable);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getNoticeTableById = async (req, res) => {
    try {
        const noticetable = await NoticeTable.findById(req.params.id);
        if (!noticetable) {
            return res.status(404).json({ message: 'Noticetable not found' });
        }
        res.json(noticetable);
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
};


const updateNoticeTable = async (req, res) => {

    try {
        const updateData = req.body;


        const noticetableInfo = await NoticeTable.findById(updateData.id);

        if (!noticetableInfo) {
            return res.status(404).json({ succes: false, statusCode: 404, message: 'NoticeTable not found' });
        }

        const noticetable = new NoticeTable(noticetableInfo);

        let isChanged = false;

        if (updateData.title && noticetableInfo.title !== updateData.title) {
            isChanged = true;
            noticetable.title = updateData.title;
        }


        if (updateData.description && noticetableInfo.description !== updateData.description) {
            isChanged = true;
            noticetable.description = updateData.description;
        }

        if (updateData.status && noticetableInfo.status !== updateData.status) {
            isChanged = true;
            noticetable.status = updateData.status;
        }

        if (isChanged) {
            const updatednoticeInfo = await noticetable.save();

            return res.json({
                success: true,
                statusCode: 200,
                message: "NoticeTable updated successfully!",
                details: updatednoticeInfo
            });
        }

        return res.json({
            success: true,
            statusCode: 200,
            message: "NoticeTable updated successfully!",
            details: noticetableInfo
        });

    } catch (error) {
        throw error;
    }
};

const deleteNoticeTable = async (req, res) => {
    try {
        const noticetable = await NoticeTable.findByIdAndDelete(req.params.id);
        if (!noticetable) {
            return res.status(404).json({ message: 'Noticetable not found' });
        }
        res.json(noticetable);
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createNotiiceTable,
    getNoticeTable,
    getNoticeTableById,
    updateNoticeTable,
    deleteNoticeTable
}