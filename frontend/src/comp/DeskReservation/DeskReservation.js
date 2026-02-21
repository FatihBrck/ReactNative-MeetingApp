import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function DeskReservation({ reservation, deleteReservation }) {


    const dt = new Date(reservation.date);
    const dateKey = dt.toLocaleDateString('en-EN', { day: '2-digit', month: 'short', year: 'numeric' });


    return (
        <View>
            <View style={styles.container}>
                <Image source={require('../../../assets/ssss.png')} style={styles.image} />
                <View style={styles.buttonContainer} >
                    <Text style={styles.title} >{reservation.floor}</Text>
                    <Text style={styles.title} >{reservation.deskname}</Text>
                    <Text style={styles.title} >{dateKey}</Text>

                </View>
                <TouchableOpacity onPress={deleteReservation} TouchableOpacity={0.7} >
                    <Ionicons name='trash' size={26} color={'#f70c0cff'} style={{ left: -4, }} />
                </TouchableOpacity>
            </View>
        </View>
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
        fontWeight:'500',
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
