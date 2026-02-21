const express = require('express');
const router = express.Router();
const { createMeetingRoom,getMeetingRoom }
    = require('../controllers/meetingRoomController');


router.get('/', getMeetingRoom);
router.post('/', createMeetingRoom);


module.exports = router;