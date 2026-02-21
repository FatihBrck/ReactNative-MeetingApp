const mongoose = require('mongoose');

const meetingReservationSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
    },
    roomid: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    hours: {
        type: [String],
        require: true,
    },
    audience: {
        type: [String],
        require: true,
    }

});

module.exports = mongoose.model('MeetingReservation', meetingReservationSchema);