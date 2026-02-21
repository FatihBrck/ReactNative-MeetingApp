import { SafeAreaView, StyleSheet, Text, View, Platform, TouchableOpacity, FlatList } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import InfoMeetingRooms from '../../comp/info/InfoMeetingRooms';
import { useSelector } from 'react-redux';
import InfoUsers from '../../comp/info/InfoUsers';
import InfoRentableDesk from '../../comp/info/InfoRentableDesk';

const SettingsPage = ({
    date,
    showPicker,
    setShowPicker,
    onChange,
    date2,
    showPicker2,
    setShowPicker2,
    onChange2,
    findDB,
    exit,
    choices,
    selectedCategory,
    setSelectedCategory, }) => {

    const AllreservationData = useSelector(state => state.reservation.allReservation)
    const AllreservationByUsersData = useSelector(state => state.reservation.allReservationByUsers)
    const AllDeskReservationData = useSelector(state => state.reservationdesks.reservationDesksCount)
 
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.meetingsContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
                    <View style={styles.callenderContainer}>
                        <View style={styles.calender}>
                            <TouchableOpacity style={styles.Icon} onPress={() => setShowPicker(true)}>
                                <Ionicons name='calendar' size={20} color={'#fff'} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 12 }} >Start: {date.toLocaleDateString('tr-TR')}</Text>
                        </View>
                        <View style={styles.calender}>
                            <TouchableOpacity style={styles.Icon} onPress={() => setShowPicker2(true)}>
                                <Ionicons name='calendar' size={20} color={'#fff'} />
                            </TouchableOpacity>


                            <Text style={{ fontSize: 12 }} >End: {date2.toLocaleDateString('tr-TR')}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.IconSearch} onPress={findDB}>
                        <Ionicons name='search' size={40} color={'#fff'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.line} />
                <View style={{ height: 50, width: 310 }}>
                    <FlatList
                        data={choices}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => setSelectedCategory(item)}>
                                <Text style={[styles.choicesText, selectedCategory === item &&
                                    { color: "#ffff", backgroundColor: '#2260FF' },]}>{item}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <View style={styles.line} />
                <Text style={styles.meetingText}>-Meetings-</Text>
                <View style={styles.list}>
                    <FlatList
                        data={
                            selectedCategory === 'Meeting Rooms'
                                ?
                                AllreservationData
                                : selectedCategory === 'Users'
                                    ?
                                    AllreservationByUsersData
                                    :
                                    AllDeskReservationData}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                selectedCategory === 'Meeting Rooms' ?
                                    <InfoMeetingRooms reservation={item} />
                                    : selectedCategory === 'Users' ?
                                        <InfoUsers reservation={item} />
                                        : <InfoRentableDesk reservation={item} />)
                        }}
                    />
                </View>
            </View>
            {showPicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                    onChange={onChange}
                    locale="tr-TR"
                />
            )}
            {showPicker2 && (
                <DateTimePicker
                    value={date2}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                    onChange={onChange2}
                    locale="tr-TR"
                />
            )}

        </SafeAreaView>
    )
}

export default SettingsPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    calender: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    meetingsContainer: {
        marginTop: (Platform.OS === 'ios' ? 0 : 30),
        height: 700,
        width: 340,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        borderRadius: 25,
        borderColor: '#2260ff',
        borderWidth: 2,
    },
    meetingText: {
        color: '#2260ff',
        fontWeight: 'bold',
        fontSize: 18,
        alignSelf: 'center',
    },
    callenderContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,

    },
    list: {
        alignItems: 'center',
        marginTop: 5,
        height: 498,
        width: 300,
    },
    IconSearch: {
        backgroundColor: '#2260ff',
        width: 55,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 33,
        borderWidth: 2,
        borderColor: '#ffffffff',
    },
    Icon: {
        backgroundColor: '#2260ff',
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#ffffffff',
        marginTop: 5,
        marginRight: 5,

    },
    registerButton: {
        width: 250,
        height: 55,
        backgroundColor: '#2260FF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,

    },
    singUpTxt: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 16,
    },
    line: {
        height: 2,
        backgroundColor: '#eaeaeaff',
        marginHorizontal: 20,
        marginVertical: 5,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#CAD6FF',
    },
    choicesText: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontWeight: '600',
        backgroundColor: '#fff',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#2260FF',
        fontSize: 18,
        color: '#2260FF',
        textAlign: 'center',
        marginHorizontal: 2,
        marginVertical: 6,
    }
})