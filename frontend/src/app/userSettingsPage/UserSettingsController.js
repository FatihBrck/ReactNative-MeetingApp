import UserSettingsPage from './UserSettingsPage'
import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import * as SecureStore from 'expo-secure-store';



const UserSettingsController = () => {

    const dispatch = useDispatch();

    const exit = useCallback(() => {
        
        SecureStore.deleteItemAsync('accessToken');
        SecureStore.deleteItemAsync('refreshToken');
        dispatch({ type: 'QUIT' });
    }, [dispatch]);

    return (
        <UserSettingsPage exit={exit} />
    )
}

export default UserSettingsController