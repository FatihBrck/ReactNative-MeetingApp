const express = require('express');
const router = express.Router();
const roleMiddleware = require('../middleware/roleMiddleware');
const autMiddleware = require('../middleware/autMiddleware');

const {
    getMeetingDeskReservation, createMeetingDeskReservation, getAllReservationsByUser, getAllDeskReservations,
    deleteMeetingDeskReservation, callBackUserNameForDeskReservation, oneDayOneDesk,
}
    = require('../controllers/meetingDeskReservationController');


router.get('/', autMiddleware, getMeetingDeskReservation);
router.post('/', autMiddleware, createMeetingDeskReservation);
router.post('/forUser', autMiddleware, getAllReservationsByUser);
router.post('/between', autMiddleware, roleMiddleware('Admin'), getAllDeskReservations);
router.post('/check', autMiddleware, callBackUserNameForDeskReservation);
router.post('/onlyOne', autMiddleware, oneDayOneDesk);
router.delete('/delete/:id', autMiddleware, deleteMeetingDeskReservation);

module.exports = router;