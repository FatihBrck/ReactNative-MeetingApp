import { FETCH, ERROR, QUIT, DELETED_USER, ADD_USER, ALL_USERS, GET_USER_DATA } from "./userTypes";

const initialState = {
    isLogin: false,
    errorCount: 0,
    DATA: null,
    users: [],
    userJWT: null,
    errorNumber: null,
};


const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH:
            return {
                ...state,
                userJWT: action.payload,
                errorNumber: null,
            };
        case GET_USER_DATA:
            return {
                ...state,
                DATA: action.payload,
                isLogin: true,
            };
        case ERROR:
            return {
                ...state,
                errorNumber: action.payload,
                errorCount: state.errorCount + 1,
            };
        case QUIT:
            return {
                isLogin: false,
                errorCount: 0,
                DATA: null,
                users: [],
                userJWT: null,
                errorNumber: null,
            };
        case ALL_USERS:
            return {
                ...state,
                users: action.payload

            };
        case DELETED_USER:
            return {
                isLogin: false,
                errorNumber: null,
                deletError: null,
                errorCount: 0,
                DATA: null,
                Users: [],
            };
        case ADD_USER:
            return {
                ...state,
            };

        default:
            return state;
    }
};


export default userReducer;