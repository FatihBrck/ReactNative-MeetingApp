const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const meetingDeskReservation = require('../model/meetingDeskReservation');


const getMeetingDeskReservation = async (req, res) => {
    try {
        const users = await meetingDeskReservation.find({}, { _id: 0, date: 1, deskid: 1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Sunucu hatası' });
    }
};

const createMeetingDeskReservation = async (req, res) => {
    try {
        const user = await meetingDeskReservation.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Sunucu hatası' });
    }
};

const getAllReservationsByUser = async (req, res) => {
    try {

        const _id = req.user._id.toString();

        const reservations = await meetingDeskReservation.aggregate([

            {
                $match: {
                    userid: _id,
                }
            },
            { $addFields: { deskObjId: { $toObjectId: "$deskid" } } },
            {
                $lookup: {
                    from: "meetingdesks",
                    localField: "deskObjId",
                    foreignField: "_id",
                    as: "deskInfo"
                }
            },
            { $unwind: { path: "$deskInfo", preserveNullAndEmptyArrays: false } },
            {
                $project: {
                    _id: 1,
                    date: 1,
                    deskname: "$deskInfo.deskname",
                    floor: "$deskInfo.floor"
                }
            }
        ]);


        return res.json(reservations);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Sunucu hatasii' });
    }
};

const getAllDeskReservations = async (req, res) => {
    try {

        const { start, end } = req.body;

        const startDate = new Date(start);
        const endDateRaw = new Date(end);

        startDate.setHours(0, 0, 0, 0);
        endDateRaw.setHours(23, 59, 59, 999);


        const reservations = await meetingDeskReservation.aggregate([
            {
                $match: {
                    date: { $gte: startDate, $lte: endDateRaw }
                }
            },
            { $addFields: { deskObjId: { $toObjectId: "$deskid" } } },
            {
                $lookup: {
                    from: "meetingdesks",
                    localField: "deskObjId",
                    foreignField: "_id",
                    as: "deskInfo"
                }
            },
            { $unwind: "$deskInfo" },
            {
                $project: {
                    _id: 0,
                    deskname: "$deskInfo.deskname",
                }
            }
        ]);

        return res.json(reservations);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Sunucu hatası' });
    }
};

const callBackUserNameForDeskReservation = async (req, res) => {
    try {

        const { deskid, date } = req.body;

        const formatDate = new Date(date);

        formatDate.setHours(0, 0, 0, 0);

        const reservations = await meetingDeskReservation.aggregate([
            {
                $match: {
                    deskid: deskid,
                    date: formatDate,

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

const oneDayOneDesk = async (req, res) => {
    try {

        const { date } = req.body;
        const _id = req.user._id.toString();

        const formatDate = new Date(date)
        formatDate.setHours(0, 0, 0, 0);

        const reservations = await meetingDeskReservation.aggregate([
            {
                $match: {
                    userid: _id,
                    date: formatDate,
                }
            },
            {
                $project: {
                    _id:0,
                    userid:1,
                }
            }
        ])

        const isThere =  reservations.some(r => r.userid === _id);

        return res.json(isThere)
    } catch (error) {
        res.status(500).json({ message: 'Sunucu hatası' });
    }
}

const deleteMeetingDeskReservation = async (req, res) => {
    try {
        const {id} = req.params;
        const reservation = await meetingDeskReservation.findByIdAndDelete(id);
        if (!reservation) return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        res.json({ message: 'Kullanıcı silindi' });
    } catch (err) {
        res.status(500).json({ message: 'Sunucu hatası' });
    }
};

module.exports = {
    getMeetingDeskReservation,
    createMeetingDeskReservation,
    getAllReservationsByUser,
    getAllDeskReservations,
    deleteMeetingDeskReservation,
    callBackUserNameForDeskReservation,
    oneDayOneDesk,
};