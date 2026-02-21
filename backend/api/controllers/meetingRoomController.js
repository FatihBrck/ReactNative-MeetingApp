const meetingRoom = require('../model/meetingRoom');

// rezervasyonları getir
const getMeetingRoom = async (req, res) => {
    try {
        const users = await meetingRoom.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Sunucu hatası' });
    }
};


// Yeni reservasyon oluştur
const createMeetingRoom = async (req, res) => {
    try {
        const user = await meetingRoom.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Sunucu hatası' });
    }
};

module.exports = {
    getMeetingRoom,
    createMeetingRoom,
};