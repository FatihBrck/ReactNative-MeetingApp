const express = require('express');
const autMiddleware = require('../middleware/autMiddleware');
const router = express.Router();
const { createMeetingUser, getMeetingUser, autMeetingUser, userData, userQuit,
    refreshAccessToken
} = require('../controllers/meetingUserController');


router.get('/', autMiddleware, getMeetingUser);
router.get('/getData', autMiddleware, userData);
router.post('/newUser', createMeetingUser);
router.post('/login', autMeetingUser);
router.post('/refresh', refreshAccessToken);
router.delete('/quit', autMiddleware, userData);



//router.put('/:id', updateUser);
//router.delete('/:id', deleteUser);

module.exports = router;