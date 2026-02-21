const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const meetingReservation = require('../model/meetingReservation');






const slim = async (req, res) => {
    try {
        const slimData = await meetingReservation.find({}, { _id: 0, roomid: 1, date: 1, hours: 1 });

        res.json(slimData);
    } catch (err) {
        res.status(500).json({ message: 'Sunucu hatası' });
    }
};




// kullanıcının kurduğu meetingler varsa onları getirir
const getUserReservations = async (req, res) => {
    try {
       
        const _id = req.user._id.toString();

        const reservations = await meetingReservation.aggregate([
            { $match: { userid: _id } },
            { $addFields: { roomObjId: { $toObjectId: "$roomid" } } },
            { $addFields: { userObjId: { $toObjectId: "$userid" } } },
            {
                $lookup: {
                    from: "meetingrooms",
                    localField: "roomObjId",
                    foreignField: "_id",
                    as: "roomInfo"
                }
            },
            {
                $lookup: {
                    from: "meetingusers",
                    localField: "userObjId",
                    foreignField: "_id",
                    as: "userInfo"
                }
            },
            { $unwind: { path: "$roomInfo", preserveNullAndEmptyArrays: false } },
            { $unwind: { path: "$userInfo", preserveNullAndEmptyArrays: false } },
            {
                $project: {
                    _id: 1,
                    date: 1,
                    hours: 1,
                    audience: 1,
                    roomName: "$roomInfo.name",
                    userName: "$userInfo.userName"
                }
            }
        ]);

        return res.json(reservations);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Sunucu hatasii' });
    }
};

const getUserReservationsForAudience = async (req, res) => {
    try {
        const _id = req.user._id.toString()
        const reservations = await meetingReservation.aggregate([
            {
                $match: {
                    audience: {$in: [_id]},
                }
            },
            { $addFields: { roomObjId: { $toObjectId: "$roomid" } } },
            { $addFields: { userObjId: { $toObjectId: "$userid" } } },
            {
                $lookup: {
                    from: "meetingrooms",
                    localField: "roomObjId",
                    foreignField: "_id",
                    as: "roomInfo"
                }
            },
            {
                $lookup: {
                    from: "meetingusers",
                    localField: "userObjId",
                    foreignField: "_id",
                    as: "userInfo"
                }
            },
            { $unwind: { path: "$roomInfo", preserveNullAndEmptyArrays: false } },
            { $unwind: { path: "$userInfo", preserveNullAndEmptyArrays: false } },
            {
                $project: {
                    _id: 1,
                    date: 1,
                    hours: 1,
                    audience: 1,
                    roomName: "$roomInfo.name",
                    userName: "$userInfo.userName"
                }
            }
        ]);

        return res.status(200).json(reservations);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Sunucu hatasii' });
    }
};


const getAllReservations = async (req, res) => {
    try {

        const { start, end } = req.body;

        const startDate = new Date(start);
        const endDateRaw = new Date(end);

        startDate.setHours(0, 0, 0, 0);
        endDateRaw.setHours(23, 59, 59, 999);

        const reservations = await meetingReservation.aggregate([
            {
                $match: {
                    date: {
                        $gte: startDate,
                        $lte: endDateRaw,
                    }
                }
            },
            { $addFields: { roomObjId: { $toObjectId: "$roomid" } } },
            {
                $lookup: {
                    from: "meetingrooms",
                    localField: "roomObjId",
                    foreignField: "_id",
                    as: "roomInfo"
                }
            },
            { $unwind: { path: "$roomInfo", preserveNullAndEmptyArrays: false } },
            {
                $project: {
                    _id: 0,
                    date: 1,
                    hours: 1,
                    audience: 1,
                    roomName: "$roomInfo.name"
                }
            }
        ]);


        return res.json(reservations);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Sunucu hatasii' });
    }
};



const getAllReservationsByUser = async (req, res) => {
    try {

        const { start, end } = req.body;

        const startDate = new Date(start);
        const endDateRaw = new Date(end);

        startDate.setHours(0, 0, 0, 0);
        endDateRaw.setHours(23, 59, 59, 999);

        if (startDate > endDateRaw) {
            return res.status(400).json({
                message: 'Başlangıç tarihi, bitiş tarihinden büyük olamaz.'
            });
        }

        const reservations = await meetingReservation.aggregate([
            {
                $match: {
                    date: {
                        $gte: startDate,
                        $lte: endDateRaw,
                    }
                }
            },
            { $addFields: { userObjId: { $toObjectId: "$userid" } } },
            {
                $lookup: {
                    from: "meetingusers",
                    localField: "userObjId",
                    foreignField: "_id",
                    as: "userInfo"
                }
            },
            { $unwind: { path: "$userInfo", preserveNullAndEmptyArrays: false } },
            {
                $project: {
                    _id: 0,
                    date: 1,
                    hours: 1,
                    audience: 1,
                    userName: "$userInfo.userName"
                }
            }
        ]);


        return res.json(reservations);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Sunucu hatasii' });
    }
};


const callBackUserName = async (req, res) => {
    try {

        const { roomid, start, end, hour } = req.body;

        const startDate = new Date(start);
        const endDateRaw = new Date(end);

        startDate.setHours(0, 0, 0, 0);
        endDateRaw.setHours(23, 59, 59, 999);

        const hoursToCheck = Array.isArray(hour) ? hour : [hour];

        const reservations = await meetingReservation.aggregate([
            {
                $match: {
                    roomid: roomid,
                    date: {
                        $gte: startDate,
                        $lte: endDateRaw,
                    },
                    hours: { $in: hoursToCheck },
                }
            },
            { $addFields: { userObjId: { $toObjectId: "$userid" } } },
            {
                $lookup: {
                    from: "meetingusers",
                    localField: "userObjId",
                    foreignField: "_id",
                    as: "userInfo"
                }
            },
            { $unwind: { path: "$userInfo", preserveNullAndEmptyArrays: false } },
            {
                $project: {
                    _id: 0,
                    userName: "$userInfo.userName"
                }
            }
        ]);


        return res.json(reservations);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Sunucu hatasii' });
    }
};

const deleteAudience = async (req, res) => {
    try {
        const { id } = req.params;
        const userid = req.user._id.toString();

        const a = await meetingReservation.findByIdAndUpdate(
            id,
            { $pull: { audience: userid } },
            { new: true }
        )   
        return res.status(200).json(a)

    } catch (error) {
        return res.status(500).json({ message: 'Sunucu hatasii' });
    }
}



const createMeetingReservation = async (req, res) => {
    try {
        const reservation = await meetingReservation.create(req.body);
        res.status(201).json(reservation);
    } catch (err) {
        res.status(500).json({ message: 'Sunucu hatası' });
    }
};

const updateMeetingReservation = async (req, res) => {
    try {
        const {id} = req.params;
        const reservation = await meetingReservation.findByIdAndUpdate(id, req.body, { new: true });
        if (!reservation) return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        res.json(reservation);
    } catch (err) {
        res.status(500).json({ message: 'Sunucu hatası' });
    }
};

const deleteMeetingReservation = async (req, res) => {
    try {
        const {id} = req.params;
        const reservation = await meetingReservation.findByIdAndDelete(id);
        if (!reservation) return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        res.json({ message: 'Kullanıcı silindi' });
    } catch (err) {
        res.status(500).json({ message: 'Sunucu hatası' });
    }
};

module.exports = {
    createMeetingReservation,
    updateMeetingReservation,
    deleteMeetingReservation,
    getUserReservations,
    slim,
    getAllReservations,
    getAllReservationsByUser,
    callBackUserName,
    getUserReservationsForAudience,
    deleteAudience,
};