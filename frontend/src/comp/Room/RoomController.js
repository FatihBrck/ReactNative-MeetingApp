import { useState } from 'react';
import Room from './Room'
import { useDispatch } from 'react-redux';
import { checkReservation, reservationAdd, yenitad } from '../../redux/Reservation/reservationActions';
import { Alert } from 'react-native';

const RoomController = ({ roomData, userid, reservationData }) => {

    const dispatch = useDispatch();

    const clocks = ['9.00', '9.30', '10.00', '10.30', '11.00', '11.30', '12.00', '12.30', '13.00', '13.30', '14.00', '14.30', '15.00', '15.30', '16.00', '16.30'];

    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [isVisible, setVisibility] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);


    const addReservation = (id) => {
        const newReservation = {
            userid: id,
            roomid: roomData._id,
            date: date,
            hours: selectedTimes,
            audience: []
        }
        dispatch(reservationAdd(newReservation))
        setStartTime('');
        setEndTime('');
        setSelectedTimes([]);
    }


    const toggleVisibility = () => {

        setVisibility(!isVisible);

    }

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

    const handleClockPress = async (time) => {

        if (!startTime || (startTime && endTime)) {
            setStartTime(time);
            setEndTime('');
            setSelectedTimes([time]);
            checking(time, []);
            return;
        } else if (time === startTime) {
            setStartTime('');
            setSelectedTimes([]);
            return;
        }

        setEndTime(time);
        const startIndex = clocks.indexOf(startTime);
        const endIndex = clocks.indexOf(time);
        const [min, max] = [startIndex, endIndex].sort((a, b) => a - b);
        const range = clocks.slice(min, max + 1);

        const formattedDate = date.toLocaleDateString('tr-TR');
        const roomReservations = reservationData[roomData._id] || {};
        const timesForDate = roomReservations[formattedDate] || [];
        const isThere = range.some(hour => timesForDate.includes(hour));
        if (isThere) {
            Alert.alert('Bu saat aralığında rezerve edilmiş bir saat var.');
            setStartTime('');
            setEndTime('');
            setSelectedTimes([]);
        } else {
            setSelectedTimes(range);
            checking(time, range);
        }
    };

    const checking = async (time, range) => {

        let controlData = {
            roomid: roomData._id,
            start: date,
            end: date,
            hour: time
        };
        let reservationThunk;

        if (range.length > 1) {
            controlData = {
                roomid: roomData._id,
                start: date,
                end: date,
                hour: range
            };
            reservationThunk = await dispatch(checkReservation(controlData))
        } else {
            reservationThunk = await dispatch(checkReservation(controlData))
        }

        if (reservationThunk?.length) {
            Alert.alert("Booked by " + "'" + reservationThunk[0].userName + "'")
            setSelectedTimes([]);
            await dispatch(yenitad())
            return;
        }
    }


    return (
        <Room
            roomData={roomData}
            clocks={clocks}
            startTime={startTime}
            selectedTimes={selectedTimes}
            isVisible={isVisible}
            date={date}
            showPicker={showPicker}
            setShowPicker={setShowPicker}
            toggleVisibility={toggleVisibility}
            onChange={onChange}
            handleClockPress={handleClockPress}
            addReservation={addReservation}
            userid={userid}
            reservationData={reservationData}
        />
    )
}

export default RoomController