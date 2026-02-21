import { Alert } from "react-native";
import {
    ERROR, QUIT, DELETED_USER, CHANGE_USER, ADD_USER, ALL_USERS, GET_USER_DATA,
} from "./userTypes";
import api from "../../api/axios";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';



export const allUsers = () => {
    return async (dispatch) => {
        try {
            const a = await api.get('http://192.168.2.40:3000/mp/user');

            dispatch({
                type: ALL_USERS,
                payload: a.data,
            })


        } catch (error) {
            console.log(error + "16")
            const status = error.response.status;
            dispatch({
                type: ERROR,
                payload: status,
            })
        }
    };
}


export const fetchLogin = (data) => {
    return async (dispatch) => {
        try {
            const a = await axios.post('http://192.168.2.40:3000/mp/user/login', data);

            const AccessToken = a.data.token;
            const RefreshToken = a.data.refreshToken
            await SecureStore.setItemAsync('accessToken', AccessToken);
            await SecureStore.setItemAsync('refreshToken', RefreshToken);

            if (a.status === 200) {
                Alert.alert('LOGGED IN!')
            }
            return a.data;
        } catch (error) {
            console.log(error + "17")
            const status = error.response.status;
            dispatch({
                type: ERROR,
                payload: status,
            })
        }
    };
};

export const getUserData = () => {
    return async (dispatch) => {
        try {

            const pushToken = await SecureStore.getItemAsync('pushToken');
            const a = [
                api.get('http://192.168.2.40:3000/mp/user/getData'),
                api.post('http://192.168.2.40:3000/mp/notification', { token: pushToken })
            ]

            const responses = await Promise.all(a);

            dispatch({
                type: GET_USER_DATA,
                payload: responses[0].data,
            })
        } catch (error) {
            console.log(error + "18")
            const status = error.response.status;
            dispatch({
                type: ERROR,
                payload: status,
            })
        }
    };
};



export const deletedUser = () => {
    return async (dispatch) => {
        try {

            let a = await api.delete('http://192.168.2.40:3000/api/user/');

            dispatch({
                type: DELETED_USER,
            })

            if (a.status === 200) {
                Alert.alert('DELETED!')
            }
        } catch (error) {
            console.log(error + "19")
            dispatch({
                type: ERROR,
                payload: error.message,
            })
        }
    }
}

export const changeUser = (data) => {
    return async (dispatch) => {
        try {
            let a = await api.put('http://192.168.2.40:3000/mp/user', data);

            dispatch({
                type: CHANGE_USER,
            })

            if (a.status === 200) {
                Alert.alert('CHANGED!')
            }
        } catch (error) {
            console.log(error + "20")
            dispatch({
                type: ERROR,
                payload: error.message,
            })
        }
    }
}

export const addUser = (data) => {
    return async (dispatch) => {
        try {

            let a = await axios.post('http://192.168.2.40:3000/mp/user/newUser', data);
            dispatch({

                type: ADD_USER,
                payload: a.status,
            })

            if (a.status === 201) {
                Alert.alert('CREATED!')
            }

        } catch (error) {
            console.log(error + "21")
            dispatch({
                type: ERROR,
                payload: error.message,
            })
        }
    }
}

export const exit = () => {
    return async (dispatch) => {
        try {
            await api.get('http://192.168.2.40:3000/mp/user/quit');

            dispatch({
                type: QUIT,
            })
        } catch (error) {
            console.log(error + "22")
            const status = error.response.status;
            dispatch({
                type: ERROR,
                payload: status,
            })
        }
    };
}