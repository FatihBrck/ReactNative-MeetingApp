import {
    DESK_RESERVATİON_FETCH_ERROR, DESK_RESERVATİON_FETCH_SUCCESS, DESK_RESERVATİON_ADD, DESK_RESERVATİON_BY_USER_FETCH_SUCCESS,
    DESK_RESERVATİON_FETCH_FOR_INFO, DESK_RESERVATİON_DELETE, DESK_RESERVATİON_CHECK,

} from "./desksReservationTypes";
import api from "../../api/axios";


export const allDeskReservations = () => {
    return async (dispatch) => {
        try {
            const a = await api.get('http://192.168.2.40:3000/mp/deskreservation'
            );

            dispatch({
                type: DESK_RESERVATİON_FETCH_SUCCESS,
                payload: a.data,
            })


        } catch (error) {
            console.log(error + "9")
            const status = error.response.status;
            dispatch({
                type: DESK_RESERVATİON_FETCH_ERROR,
                payload: status,
            })
        }
    };
}

export const allDeskReservationsByUser = () => {
    return async (dispatch) => {
        try {
            const a = await api.post('http://192.168.2.40:3000/mp/deskreservation/forUser', {},);
            dispatch({
                type: DESK_RESERVATİON_BY_USER_FETCH_SUCCESS,
                payload: a.data,
            })
        } catch (error) {
            console.log(error + "10")
            const status = error.response.status;
            dispatch({
                type: DESK_RESERVATİON_FETCH_ERROR,
                payload: status,
            })
        }
    };
}

export const allDeskReservationsForInfo = (data) => {
    return async (dispatch) => {
        try {
            const res = await api.post('http://192.168.2.40:3000/mp/deskreservation/between', data);
            const counts = res.data.reduce((acc, { deskname }) => {
                acc[deskname] = (acc[deskname] || 0) + 1;
                return acc;
            }, {});
            const newData = Object.entries(counts).map(([name, count]) => ({ name, count }));

            dispatch({
                type: DESK_RESERVATİON_FETCH_FOR_INFO,
                payload: newData,
            })


        } catch (error) {
            console.log(error + "11")
            const status = error.response.status;
            dispatch({
                type: DESK_RESERVATİON_FETCH_ERROR,
                payload: status,
            })
        }
    };
}

export const addDeskReservation = (data) => {
    return async (dispatch) => {
        try {
            const res = await api.post('http://192.168.2.40:3000/mp/deskreservation',
                data
            );

            dispatch({
                type: DESK_RESERVATİON_ADD,
                payload: res.data,
            })


        } catch (error) {
            console.log(error + "12")
            const status = error.response.status;
            dispatch({
                type: DESK_RESERVATİON_FETCH_ERROR,
                payload: status,
            })
        }
    };
}

export const deletedDeskReservation = (id) => {
    return async (dispatch, getState) => {
        try {

            await api.delete('http://192.168.2.40:3000/mp/deskreservation/delete/' + id);
            const userReserv = getState().reservationdesks.reservationUser
            const deskReserv = getState().reservationdesks.reservationDesks

            const updatedReservationsMeetingPage = userReserv.filter(item => item._id !== id);
            const updatedReservationsRoomPage = deskReserv.filter(item => item._id !== id);

            dispatch({
                type: DESK_RESERVATİON_DELETE,
                payload: { updatedReservationsMeetingPage, updatedReservationsRoomPage },
            })

        } catch (error) {
            console.log(error + "13")
            dispatch({
                type: DESK_RESERVATİON_FETCH_ERROR,
                payload: error.message,
            })

        }
    }
}

export const checkDeskReservation = (data) => {
    return async (dispatch) => {
        try {

            const a = await api.post('http://192.168.2.40:3000/mp/deskreservation/check', data);

            return a.data;

        } catch (error) {
            console.log(error + "14")
            const status = error.response.status;
            dispatch({
                type: DESK_RESERVATİON_FETCH_ERROR,
                payload: status,
            })
        }
    };
};

export const oneDateOneDeskReservation = (data) => {
    return async (dispatch) => {
        try {
            const a = await api.post('http://192.168.2.40:3000/mp/deskreservation/onlyOne',data);

            return a.data;

        } catch (error) {
            console.log(error + "15")
            const status = error.response.status;
            dispatch({
                type: DESK_RESERVATİON_FETCH_ERROR,
                payload: status,
            })
        }
    };
};




