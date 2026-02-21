import { useDispatch } from "react-redux"
import Desk from "./Desk"
import { addDeskReservation, allDeskReservations, checkDeskReservation, oneDateOneDeskReservation } from '../../redux/DesksReservation/desksReservationActions'
import { Alert } from "react-native"

const DeskController = ({ item, date, setShowPicker, userid, isThere }) => {

    const dispatch = useDispatch();

    const _addDeskReservation = async () => {
        date.setHours(0, 0, 0, 0);

        const data = { userid: userid, deskid: item._id, date: date };
        const checkData = { deskid: item._id, date: date }
        const checkUser = { userid: userid, date: date }

        const isThereReservation = await dispatch(oneDateOneDeskReservation(checkUser));
        if (isThereReservation) {
            Alert.alert("You can one reservation on this date.")
        } else {
            const checkDeskName = await dispatch(checkDeskReservation(checkData))

            if (checkDeskName?.length) {
                Alert.alert("Booked by " + "'" + checkDeskName[0].userName + "'")
                dispatch(allDeskReservations());
            }
            else {
                dispatch(addDeskReservation(data));
            }
        }


    }

    return (
        <Desk item={item} date={date} setShowPicker={setShowPicker} _addDeskReservation={_addDeskReservation} isThere={isThere} />
    )
}

export default DeskController