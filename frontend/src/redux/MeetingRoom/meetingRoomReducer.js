import { ROOM_FETCH, ROOM_ERROR, QUIT } from './meetingRoomTypes'

const initialState = {
    roomData: [],
    roomError: null,
    roomIsLoading: true
}

const roomReducer = (state = initialState, action) => {
    switch (action.type) {
        case ROOM_FETCH:
            return {
                ...state,
                roomData: action.payload,
                roomError: null,
                roomIsLoading: false,
            };
        case ROOM_ERROR:
            return {
                ...state,
                roomError: action.payload,
            };
        case QUIT:
            return {
                roomData: [],
                roomError: null,
                roomIsLoading: true
            };

        default:
            return state;
    }
};


export default roomReducer;