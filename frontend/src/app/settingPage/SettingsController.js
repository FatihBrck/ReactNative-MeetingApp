import { useDispatch } from "react-redux";
import SettingsPage from "./SettingsPage"
import { useCallback, useState } from 'react';
import { allReservation, allReservationByUsers } from "../../redux/Reservation/reservationActions";
import { allDeskReservationsForInfo } from "../../redux/DesksReservation/desksReservationActions";

export default function SettingsController() {

  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [showPicker2, setShowPicker2] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Meeting Rooms');

  const choices = ['Users', 'Meeting Rooms', 'Rentable Desks']

  const findDB = useCallback(
    () => {
      const dateData = { start: date, end: date2 }

      if (selectedCategory === 'Meeting Rooms') {
        dispatch(allReservation(dateData))
      } 
      else if (selectedCategory === 'Users') {
        dispatch(allReservationByUsers(dateData))
      }
      else{
        dispatch(allDeskReservationsForInfo(dateData))
      }

    },
    [dispatch, date, date2, selectedCategory]
  )


  const exit = useCallback(
    () => dispatch({ type: 'QUIT' }),
    [dispatch]
  )


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


  const onChange2 = (event, selectedDate) => {
    if (event.type === 'dismissed') {
      setShowPicker2(false);
      return;
    }
    setShowPicker2(false);
    if (selectedDate) {
      setDate2(selectedDate);
    }
  };

  return (
    <SettingsPage
      date={date}
      showPicker={showPicker}
      setShowPicker={setShowPicker}
      onChange={onChange}
      date2={date2}
      showPicker2={showPicker2}
      setShowPicker2={setShowPicker2}
      onChange2={onChange2}
      findDB={findDB}
      exit={exit}
      choices={choices}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory} />
  )
}