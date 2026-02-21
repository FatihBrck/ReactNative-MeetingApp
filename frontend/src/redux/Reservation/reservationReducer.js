import {
    RESERVATİON_ERROR, USER_RESERVATION, RESERVATİON_ADD,
    ADD_RESERVATION_SUCCESS, ALL_RESERVATION, USER_RESERVATİON_UPDATE, DELETE_RESERVATION,
    QUIT, ALL_RESERVATION_BY_USERS, CHECK_RESERVATION, DESK_RESERVATION_SUCCESS, USER_AUDİENCE_RESERVATION,
    DELETE_RESERVATİON_AUDİENCE,

} from "./reservationTypes";

const initialState = {
    allReservation: [],
    userReservationAudience: [],
    allReservationByUsers: [],
    userReservation: [],
    new: {},
    desks: [],
    reservatedName: [],
    reservationError: null,
    reservationIsLoading: true,
}

const reservationReducer = (state = initialState, action) => {
    switch (action.type) {

        case RESERVATİON_ERROR:
            return {
                ...state,
                reservationError: action.payload,
            };
        case ALL_RESERVATION:
            return {
                ...state,
                allReservation: action.payload,
                allReservationByUsers: [],

            };
        case ALL_RESERVATION_BY_USERS:
            return {
                ...state,
                allReservationByUsers: action.payload,
                allReservation: [],
            };
        case RESERVATİON_ADD:
            return {
                ...state,
                new: action.payload,
                reservatedName: [],
            };
        case ADD_RESERVATION_SUCCESS:
            return {
                ...state,
                new: action.payload,
                reservatedName: [],
                reservationIsLoading: false,
            };
        case USER_RESERVATION:
            return {
                ...state,
                userReservation: action.payload,
            };
        case USER_AUDİENCE_RESERVATION:
            return {
                ...state,
                userReservationAudience: action.payload,
            };
        case DELETE_RESERVATİON_AUDİENCE:
            return {
                ...state,
                userReservationAudience: action.payload,
            };
        case USER_RESERVATİON_UPDATE:
            return {
                ...state,
                userReservation: action.payload,
            };
        case DELETE_RESERVATION:
            return {
                ...state,
                userReservation: action.payload,
            };
        case CHECK_RESERVATION:
            return {
                ...state,
                reservatedName: action.payload,
            };
        case DESK_RESERVATION_SUCCESS:
            return {
                ...state,
                desks: action.payload,
            };
        case QUIT:
            return {
                allReservation: [],
                userReservationAudience: [],
                allReservationByUsers: [],
                userReservation: [],
                new: {},
                desks: [],
                reservatedName: [],
                reservationError: null,
                reservationIsLoading: true,
            };
        default:
            return state;
    }

};


export default reservationReducer;