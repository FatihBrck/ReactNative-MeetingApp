import { DESK_FETCH_ERROR, DESK_FETCH_SUCCESS, QUIT } from "./rentableDeskTypes";

const initialState = {

    desks: [],
    reservationError: null,
    deskReservationIsLoading: true,
}

const rentableDeskReducer = (state = initialState, action) => {
    switch (action.type) {
        case DESK_FETCH_SUCCESS:
            return {
                ...state,
                desks: action.payload,
            };
        case DESK_FETCH_ERROR:
            return {
                ...state,
                reservationError: action.payload,
            };
        case QUIT:
            return {
                desks: [],
                reservationError: null,
                deskReservationIsLoading: true,
            };
        default:
            return state;
    }

};


export default rentableDeskReducer;