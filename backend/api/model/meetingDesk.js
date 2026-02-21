const mongoose = require('mongoose');

const MeetingDeskSchema = new mongoose.Schema({
    
    deskname: {
        type: String,
        required: true
    },
    floor: {
        type: String,
        required: true
    },

});

module.exports = mongoose.model('MeetingDesk', MeetingDeskSchema);