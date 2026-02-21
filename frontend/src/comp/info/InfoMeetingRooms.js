import { StyleSheet, Text, View, Image } from 'react-native';



export default function InfoMeetingRooms({ reservation }) {



    return (
        <View>
            <View style={styles.container}>
                <Image source={require('../../../assets/aaaa.png')} style={styles.image} />
                <View style={styles.buttonContainer} >
                    <Text style={styles.title} >{reservation.roomName}</Text>
                    <Text style={styles.title} >Hours: {(reservation.hours.length / 2)}</Text>
                    <Text style={styles.title} >Audience: {reservation.audience.length}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        width: 280,
        height: 130,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: 5,
        borderWidth: 2,
        borderColor: '#CAD6FF',
    },
    title: {
        color: '#2260ff',
        fontSize: 18,
        fontWeight: 'bold',
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
