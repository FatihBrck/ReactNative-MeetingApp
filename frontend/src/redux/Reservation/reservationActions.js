import {
    RESERVATİON_ERROR, USER_RESERVATION, RESERVATİON_ADD,
    ADD_RESERVATION_SUCCESS, ALL_RESERVATION, USER_RESERVATİON_UPDATE, DELETE_RESERVATION,
    ALL_RESERVATION_BY_USERS, CHECK_RESERVATION, USER_AUDİENCE_RESERVATION, DELETE_RESERVATİON_AUDİENCE,
} from "./reservationTypes";
import api from "../../api/axios";
import ByRoomName from "../normalz/allReservationNormalz";
import upsertReservationMap from "../normalz/normal"
import { Alert } from "react-native";
import ByUserName from "../normalz/allReservationByUsersNormal";


export const allReservation = (data) => {
    return async (dispatch) => {
        try {
            const a = await api.post('http://192.168.2.40:3000/mp/reservation/allReservation', data);
            const reservationMap = a.data.reduce(
                (map, item) => ByRoomName(map, item),
                {}
            );

            const reservationsArray = Object.entries(reservationMap).map(
                ([roomName, { hours, audience }]) => ({ roomName, hours, audience })
            );

            dispatch({
                type: ALL_RESERVATION,
                payload: reservationsArray,
            })


        } catch (error) {
            console.log(error + "1")
            const status = error.response.status;
            dispatch({
                type: RESERVATİON_ERROR,
                payload: status,
            })
        }
    };
};

export const allReservationByUsers = (data) => {
    return async (dispatch) => {
        try {
            const a = await api.post('http://192.168.2.40:3000/mp/reservation/allReservation/user', data);

            const reservationMap = a.data.reduce(
                (map, item) => ByUserName(map, item),
                {}
            );

            const reservationsArray = Object.entries(reservationMap).map(
                ([userName, { hours, audience }]) => ({
                    userName,
                    hours,
                    audience
                })
            );

            dispatch({
                type: ALL_RESERVATION_BY_USERS,
                payload: reservationsArray,
            })


        } catch (error) {
            console.log(error + "2")
            const status = error.response.status;
            dispatch({
                type: RESERVATİON_ERROR,
                payload: status,
            })
        }
    };
};

export const yenitad = () => {
    return async (dispatch) => {
        try {
            const a = await api.get('http://192.168.2.40:3000/mp/reservation/slim');
            let reservationMap = {};
            a.data.forEach(item => {
                reservationMap = upsertReservationMap(reservationMap, item);
            });
            dispatch({
                type: ADD_RESERVATION_SUCCESS,
                payload: reservationMap,
            })


        } catch (error) {
            console.log(error + "3")
            const status = error.response.status;
            dispatch({
                type: RESERVATİON_ERROR,
                payload: status,
            })
        }
    };
};

export const userReservations = () => {
    return async (dispatch) => {
        try {
            const a = await api.get('http://192.168.2.40:3000/mp/reservation/user');
            dispatch({
                type: USER_RESERVATION,
                payload: a.data,
            })

        } catch (error) {
            console.log(error + "4.1")
            const status = error.response.status;
            dispatch({
                type: RESERVATİON_ERROR,
                payload: status,
            })
        }
    };
};

export const userReservationsForAudience = () => {
    return async (dispatch) => {
        try {
            const a = await api.get('http://192.168.2.40:3000/mp/reservation/audience');

            dispatch({
                type: USER_AUDİENCE_RESERVATION,
                payload: a.data,
            })

        } catch (error) {
            console.log(error + "4.2")
            const status = error.response.status;
            dispatch({
                type: RESERVATİON_ERROR,
                payload: status,
            })
        }
    };
};

export const reservationAdd = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await api.post('http://192.168.2.40:3000/mp/reservation/new/', data);
            const items = Array.isArray(res.data) ? res.data : [res.data];

            const currentMap = getState().reservation.new || {};

            let mergedMap = { ...currentMap };
            items.forEach(item => {
                mergedMap = upsertReservationMap(mergedMap, item);
            });

            dispatch({
                type: RESERVATİON_ADD,
                payload: mergedMap,
            });

            if (res.status === 201) Alert.alert('CREATED!');
        } catch (error) {
            console.log(error + "5")
            dispatch({
                type: RESERVATİON_ERROR,
                payload: error.message
            });
        }
    };
};

export const changeAudience = (data) => {
    return async (dispatch, getState) => {
        try {

            let a = await api.put('http://192.168.2.40:3000/mp/reservation/' + data.id, { audience: data.audience });



            const oldReservationData = getState().reservation.userReservation;
            const newReservationData = oldReservationData.map(item => item._id == data.id ?
                {
                    ...item,
                    audience: data.audience,
                } : item)

            dispatch({
                type: USER_RESERVATİON_UPDATE,
                payload: newReservationData,
            })

            if (a.status === 200) {
                Alert.alert('CHANGED!')
            }
        } catch (error) {
            console.log(error.message + "6")
            dispatch({
                type: RESERVATİON_ERROR,
                payload: error.message,
            })
        }
    }
}

export const deleteAudience = (data) => {
    return async (dispatch, getState) => {
        try {

            let a = await api.put('http://192.168.2.40:3000/mp/reservation/deleteAudience/' + data, {});
            const oldReservationData = getState().reservation.userReservationAudience;
            const newReservationData = oldReservationData.filter(item => item._id !== data)

            dispatch({
                type: DELETE_RESERVATİON_AUDİENCE,
                payload: newReservationData,
            })

            if (a.status === 200) {
                Alert.alert('CHANGED!')
            }
        } catch (error) {
            console.log(error.message + "1.6")
            dispatch({
                type: RESERVATİON_ERROR,
                payload: error.message,
            })
        }
    }
}


export const deletedReservation = (id) => {
    return async (dispatch, getState) => {
        try {

            let a = await api.delete('http://192.168.2.40:3000/mp/reservation/' + id);
            const b = getState().reservation.userReservation
            const updatedReservations = b.filter(
                item => item._id !== id
            );
            dispatch({
                type: DELETE_RESERVATION,
                payload: updatedReservations,
            })

            if (a.status === 200) {
                Alert.alert('DELETED!')
            }

        } catch (error) {
            console.log(error + "7")
            dispatch({
                type: RESERVATİON_ERROR,
                payload: error.message,
            })
        }
    }
}

export const checkReservation = (data) => {
    return async (dispatch) => {
        try {

            const a = await api.post('http://192.168.2.40:3000/mp/reservation/check', data);
            api.post('http://192.168.2.40:3000/mp/notification/push',
                {
                    _id: data.id, title: data.title, body: data.body, metadata: {}
                })
            dispatch({
                type: CHECK_RESERVATION,
                payload: a.data,
            })

            return a.data;

        } catch (error) {
            console.log(error + "8")
            const status = error.response.status;
            dispatch({
                type: RESERVATİON_ERROR,
                payload: status,
            })
        }
    };
};



