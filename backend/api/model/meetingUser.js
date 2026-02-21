const mongoose = require('mongoose');

const meetingUserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["Worker", "Team Leader", "Admin"],
        required: true,
    },
});

module.exports = mongoose.model('MeetingUser', meetingUserSchema);