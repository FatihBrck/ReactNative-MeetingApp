const meetingDesk = require('../model/meetingDesk');

// rezervasyonları getir
const getMeetingDesk = async (req, res) => {
    try {
        const users = await meetingDesk.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Sunucu hatası' });
    }
};


// Yeni reservasyon oluştur
const createMeetingDesk = async (req, res) => {
    try {
        const user = await meetingDesk.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Sunucu hatası' });
    }
};

module.exports = {
    getMeetingDesk,
    createMeetingDesk,
};