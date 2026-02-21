const mongoose = require('mongoose');

const meetingNotificationTokenSchema = new mongoose.Schema({

    userid: {
        type: String,
        required: true
    },
    token: {
        type: [String],
        required: true,
    },
});

module.exports = mongoose.model('MeetingNotificationTokenSchema', meetingNotificationTokenSchema);