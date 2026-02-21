import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import userReducer from './User/UserReducer';
import roomReducer from './MeetingRoom/meetingRoomReducer';
import reservationReducer from './Reservation/reservationReducer';
import rentableDeskReducer from './RentableDesk/rentableDeskReducer';
import desksReservationReducer from './DesksReservation/desksReservationReducer';



const rootReducer = combineReducers({
  user: userReducer,
  room: roomReducer,
  reservation: reservationReducer,
  desk: rentableDeskReducer,
  reservationdesks: desksReservationReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
