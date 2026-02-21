import { StyleSheet, Text, View, Image } from 'react-native';



export default function InfoRentableDesk({ reservation }) {

    const dt = new Date(reservation.date);
    const dateKey = dt.toLocaleDateString('en-EN', { day: '2-digit', month: 'short', year: 'numeric' });

    return (
        <View>
            <View style={styles.container}>
                <Image source={require('../../../assets/aaaa.png')} style={styles.image} />
                <View style={styles.buttonContainer} >
                    <Text style={styles.title} >{reservation.name}</Text>
                    <Text style={styles.title} >Rent Day: {reservation.count}</Text>
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
