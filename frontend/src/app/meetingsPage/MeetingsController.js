import { useDispatch } from 'react-redux'
import MeetingsPage from './MeetingsPage'
import { useEffect, useState } from 'react'
import { allUsers } from '../../redux/User/userActions'
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { userReservations, userReservationsForAudience } from '../../redux/Reservation/reservationActions';
import { allDeskReservationsByUser } from '../../redux/DesksReservation/desksReservationActions';

const MeetingsController = ({ navigation }) => {

  const choices = ['Rentable Desk', 'Meeting Rooms']
  const [selectedCategory, setSelectedCategory] = useState('Meeting Rooms');


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allUsers())
  },[])

  useFocusEffect(
    useCallback(() => {
      dispatch(userReservations());
      dispatch(allDeskReservationsByUser())
      dispatch(userReservationsForAudience())
    }, [dispatch])
  );

  const updatePageNavigate = (item) => {
    navigation.navigate('AudiencePage', { item })
  }

  return (
    <MeetingsPage
      updatePageNavigate={updatePageNavigate}
      choices={choices}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory} />
  )
}

export default MeetingsController