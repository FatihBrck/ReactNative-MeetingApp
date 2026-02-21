import { DESK_FETCH_ERROR, DESK_FETCH_SUCCESS } from "./rentableDeskTypes";
import axios from "axios";

export const allDesks = () => {
    return async (dispatch) => {
        try {
            const a = await axios.get('http://192.168.2.40:3000/mp/desk');

            dispatch({
                type: DESK_FETCH_SUCCESS,
                payload: a.data,
            })


        } catch (err) {
            console.log(err)
            const status = err.response.status;
            dispatch({
                type: DESK_FETCH_ERROR,
                payload: status,
            })
        }
    };
}

