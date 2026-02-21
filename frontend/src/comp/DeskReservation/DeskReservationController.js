import { useDispatch } from "react-redux"
import DeskReservation from "./DeskReservation"
import { useCallback } from "react"
import { deletedDeskReservation } from "../../redux/DesksReservation/desksReservationActions"



const DeskReservationController = ({ reservation }) => {

  const dispatch = useDispatch()

  const _deleteDeskReservation = useCallback(async () => {

   await dispatch(deletedDeskReservation(reservation._id));

  }, [dispatch, reservation._id]);


  return (
    <DeskReservation reservation={reservation} deleteReservation={_deleteDeskReservation} />
  )
}

export default DeskReservationController