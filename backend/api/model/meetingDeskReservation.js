const mongoose = require('mongoose');

const MeetingDeskReservationSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    deskid: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },

});

module.exports = mongoose.model('MeetingDeskReservation', MeetingDeskReservationSchema);