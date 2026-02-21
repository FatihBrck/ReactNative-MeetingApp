import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSelector } from 'react-redux';

export default function CreatedRoom({ reservation, deleteReservation, updatePageNavigate, delAudience }) {


    const dt = new Date(reservation.date);
    const dateKey = dt.toLocaleDateString('en-EN', { day: '2-digit', month: 'short', year: 'numeric' });
    const userName = useSelector(state => state.user.DATA.userName);


    return (
        <TouchableOpacity onPress={() => updatePageNavigate(reservation)} >
            <View style={styles.container}>
                <Image source={require('../../../assets/aaaa.png')} style={styles.image} />
                <View style={styles.buttonContainer} >
                    <Text style={styles.title} >User: {reservation.userName}</Text>
                    <Text style={styles.title} >{reservation.roomName}</Text>
                    <Text style={styles.title} >{dateKey}</Text>
                    <Text style={styles.title} >{reservation.hours.length > 1 ? reservation.hours[0] + '-' + reservation.hours[reservation.hours.length - 1] : reservation.hours[0]}</Text>
                    <Text style={styles.title} >Audience: {reservation.audience.length}</Text>
                </View>
                <TouchableOpacity onPress={reservation.userName === userName ? deleteReservation : delAudience} >
                    <Ionicons name='trash' size={26} color={reservation.userName === userName ? '#f70c0cff' : '#e6ad29ff'} style={{ left: -4, }} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        width: 300,
        height: 131,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#CAD6FF',
    },
    title: {
        color: '#2260ff',
        fontSize: 16,
        fontWeight: '500',
    },
    image: {
        width: 80,
        height: 80,
        marginHorizontal: 20,
        borderRadius: 45,
        borderWidth: 2,
        borderColor: '#CAD6FF',
    },
    buttonContainer: {

        height: 100,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#ffffff',
        width: 120,
        height: 30,
        borderWidth: 2,
        borderColor: '#2260ff',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttonTxt: {
        color: '#2260ff',
        fontSize: 20,
    },

});
