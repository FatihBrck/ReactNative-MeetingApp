import CreatedRoom from './CreatedRoom'
import { useDispatch } from 'react-redux';
import { deleteAudience, deletedReservation, yenitad } from '../../redux/Reservation/reservationActions';
import { useCallback } from 'react';


const CreatedRoomController = ({ reservation, updatePageNavigate }) => {

    const dispatch = useDispatch();

    const deleteReservation = useCallback(async () => {
        await dispatch(deletedReservation(reservation._id));
        await dispatch(yenitad());
    }, [dispatch, reservation._id]);

    const delAudience = useCallback(async () => {
        await dispatch(deleteAudience(reservation._id));
    }, [dispatch, reservation._id]);

    return (
        <CreatedRoom
            reservation={reservation} deleteReservation={deleteReservation} updatePageNavigate={updatePageNavigate}
            delAudience={delAudience}
        />
    )
}

export default CreatedRoomController