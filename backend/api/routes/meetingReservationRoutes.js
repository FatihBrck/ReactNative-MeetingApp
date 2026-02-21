const express = require('express');
const router = express.Router();
const autMiddleware = require('../middleware/autMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { createMeetingReservation, updateMeetingReservation,
    deleteMeetingReservation, getUserReservations, slim, getAllReservations,
    getAllReservationsByUser, callBackUserName, getUserReservationsForAudience,
    deleteAudience
} = require('../controllers/meetingReservationController');


router.get('/slim', autMiddleware, slim);
router.get('/audience', autMiddleware, getUserReservationsForAudience);
router.get('/user', autMiddleware, roleMiddleware('Admin', 'Team Leader'), getUserReservations);
router.post('/allReservation', autMiddleware, roleMiddleware('Admin'), getAllReservations);
router.post('/allReservation/user', autMiddleware, roleMiddleware('Admin', 'Team Leader'), getAllReservationsByUser);
router.post('/check', autMiddleware, callBackUserName);
router.post('/new', autMiddleware, roleMiddleware('Admin', 'Team Leader'), createMeetingReservation);
router.put('/deleteAudience/:id', autMiddleware, deleteAudience);
router.put('/:id', autMiddleware, roleMiddleware('Admin', 'Team Leader'), updateMeetingReservation);
router.delete('/:id', autMiddleware, roleMiddleware('Admin', 'Team Leader'), deleteMeetingReservation);



module.exports = router;