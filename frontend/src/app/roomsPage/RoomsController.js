import { useEffect, useState } from "react";
import RoomsPage from "./RoomsPage"
import { useDispatch } from "react-redux";
import { roomFetch } from "../../redux/MeetingRoom/meetingRoomActions";
import { userReservations, yenitad } from "../../redux/Reservation/reservationActions";
import { allDesks, } from "../../redux/RentableDesk/rentableDeskActions";
import { allDeskReservations } from "../../redux/DesksReservation/desksReservationActions";

const RoomsController = () => {
  const dispatch = useDispatch();

  const choices = ['Rentable Desk', 'Meeting Rooms']
  const [selectedCategory, setSelectedCategory] = useState('Meeting Rooms');
  const [selectedFloor, setSelectedFloor] = useState('Floor 1');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  
  useEffect(() => {
    dispatch(roomFetch())
    dispatch(yenitad())
    dispatch(userReservations())
    dispatch(allDesks())
    dispatch(allDeskReservations())
  },[])



  const onChange = (event, selectedDate) => {
    if (event.type === 'dismissed') {
      setShowPicker(false);
      return;
    }
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);

    }
  };



  return (
    <RoomsPage
      choices={choices} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
      date={date} showPicker={showPicker} setShowPicker={setShowPicker} onChange={onChange}
      selectedFloor={selectedFloor} setSelectedFloor={setSelectedFloor}
    />
  )
}

export default RoomsController
