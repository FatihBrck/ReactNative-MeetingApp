import {
    DESK_RESERVATİON_FETCH_ERROR, DESK_RESERVATİON_FETCH_SUCCESS, DESK_RESERVATİON_ADD, QUIT,
    DESK_RESERVATİON_BY_USER_FETCH_SUCCESS, DESK_RESERVATİON_FETCH_FOR_INFO, DESK_RESERVATİON_DELETE,
    DESK_RESERVATİON_CHECK
} from "./desksReservationTypes";


const initialState = {

    reservationDesks: [],
    reservationUser: [],
    reservationDesksCount: [],
    reservationDeskError: null,
    reservationDeskError: true,
}

const desksReservationReducer = (state = initialState, action) => {
    switch (action.type) {
        case DESK_RESERVATİON_FETCH_SUCCESS:
            return {
                ...state,
                reservationDesks: action.payload,
                reservationDeskError: false,
            };
        case DESK_RESERVATİON_BY_USER_FETCH_SUCCESS:
            return {
                ...state,
                reservationUser: action.payload,
            };
        case DESK_RESERVATİON_DELETE:
            return {
                ...state,
                reservationUser: action.payload.updatedReservationsMeetingPage,
                reservationDesks: action.payload.updatedReservationsRoomPage
            };
        case DESK_RESERVATİON_FETCH_FOR_INFO:
            return {
                ...state,
                reservationDesksCount: action.payload,
            };
        case DESK_RESERVATİON_ADD:
            return {
                ...state,
                reservationDesks: [...state.reservationDesks, action.payload],
                reservationDeskError: false,
            };
        case DESK_RESERVATİON_FETCH_ERROR:
            return {
                ...state,
                reservationDeskError: action.payload,
            };
        case QUIT:
            return {
                reservationDesks: [],
                reservationUser: [],
                reservationDesksCount: [],
                reservationDeskError: null,
                reservationDeskError: true,
            };
        default:
            return state;
    }

};


export default desksReservationReducer;