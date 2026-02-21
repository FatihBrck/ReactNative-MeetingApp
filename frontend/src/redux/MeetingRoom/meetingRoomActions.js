import { ROOM_FETCH,ROOM_ERROR } from "./meetingRoomTypes";
import axios from "axios";

export const roomFetch = () => {
    return async (dispatch) => {
        try {
            const a = await axios.get('http://192.168.2.40:3000/mp/room');
            dispatch({
                type: ROOM_FETCH,
                payload: a.data,
            })

        } catch (err) {
            console.log(err)
            const status = err.response.status;
            dispatch({
                type: ROOM_ERROR,
                payload: status,
            })
        }
    };
};