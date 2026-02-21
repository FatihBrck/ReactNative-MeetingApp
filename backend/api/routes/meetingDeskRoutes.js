const express = require('express');
const router = express.Router();
const { getMeetingDesk, createMeetingDesk }
    = require('../controllers/meetingDeskController');


router.get('/', getMeetingDesk);
router.post('/', createMeetingDesk);

module.exports = router;