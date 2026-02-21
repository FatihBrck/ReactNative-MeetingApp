import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';

const Desk = ({
    item,
    date,
    setShowPicker,
    _addDeskReservation,
    isThere, }) => {


    const ayAdi = date.toLocaleString('en-EN', { month: 'short' });
    const day = date.getDate()


    return (
        <View style={styles.container} >
            <View style={styles.innerContainer} >
                <Image source={require("../../../assets/ssss.png")} style={styles.image} />
                <Text style={styles.title} >{item.deskname}</Text>
                <View style={styles.addAndDateContainer} >
                    <TouchableOpacity
                        style={styles.dateTextContainer}
                        activeOpacity={0.7}
                        onPress={() => setShowPicker(true)}>
                        <Text style={styles.datetxt}>{day}</Text>
                        <Text style={styles.datetxt}>{ayAdi}</Text>
                    </TouchableOpacity>
                    <View style={styles.line} />
                    <TouchableOpacity disabled={isThere} activeOpacity={0.8} onPress={() => !isThere && _addDeskReservation()} >
                        {isThere ?
                            (
                                <Ionicons name='close-circle' size={35} color={'#9d5959ff'} />

                            ) : (
                                <Ionicons name='add-circle' size={35} color={'#98c496ff'} />
                            )}

                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

export default Desk

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#CAD6FF',
    },
    innerContainer: {
        width: 130,
        height: 200,
        alignItems: 'center',
        justifyContent: 'space-evenly'

    },
    image: {
        width: 80,
        height: 80,
        marginHorizontal: 20,
        borderRadius: 45,
        borderWidth: 2,
        marginTop: 5,
        borderColor: '#CAD6FF',
    },
    title: {
        fontSize: 14,
        color: '#2260ff',
        fontWeight: 'bold',
    },
    datetxt: {
        fontSize: 14,
        color: '#2260ff',
        fontWeight: '500',
    },
    addAndDateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '90%'
    },
    line: {
        width: 1,
        backgroundColor: '#888',
        height: '90%',
        alignSelf: 'center',
        backgroundColor: '#CAD6FF',
    },
    dateTextContainer: {
        alignItems: 'center'
    }
})