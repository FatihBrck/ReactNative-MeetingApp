const express = require('express');
const router = express.Router();
const { saveToken, pushToken } = require("../controllers/meetingNotificationController")
const roleMiddleware = require('../middleware/roleMiddleware');
const autMiddleware = require('../middleware/autMiddleware');

router.post('/', autMiddleware, saveToken);
router.post('/push', pushToken);


module.exports = router;