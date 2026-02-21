import { StyleSheet, Text, View, FlatList, SafeAreaView, Platform, ActivityIndicator, TouchableOpacity } from 'react-native';
import RoomController from '../../comp/Room/RoomController';
import { useSelector } from 'react-redux';
import DeskController from '../../comp/Desk/DeskController';
import DateTimePicker from '@react-native-community/datetimepicker';




export default function RoomsPage({
  choices,
  selectedCategory,
  setSelectedCategory,
  date,
  showPicker,
  setShowPicker,
  onChange,
  selectedFloor,
  setSelectedFloor, }) {

  const roomData = useSelector(state => state.room.roomData)
  const roomLoading = useSelector(state => state.room.roomIsLoading)
  const reservationLoading = useSelector(state => state.reservation.reservationIsLoading)
  const userDATA = useSelector(state => state.user.DATA) || 0
  const reservationData = useSelector(state => state.reservation.new)
  const allDesks = useSelector(state => state.desk.desks)
  const allDesksReservation = useSelector(state => state.reservationdesks.reservationDesks)
  const floors = ['Floor 1', 'Floor 2', 'Floor 3']
  

  if (roomLoading || reservationLoading) {
    return <ActivityIndicator size="large" color="gray" style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.meetingsContainer}>
        {userDATA.role !== 'Worker' &&
          <>
            <View style={styles.choicesContainer}>
              <FlatList
                data={choices}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setSelectedCategory(item)}>
                    <Text style={[styles.choicesText, selectedCategory === item &&
                      { color: "#ffff", backgroundColor: '#2260FF' },]}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
            <View style={styles.line} />
          </>
        }
        {userDATA.role !== 'Worker' && selectedCategory === 'Meeting Rooms' ? (
          <>
            <Text style={styles.title}>- Booking Meeting Room -</Text>
            <View style={styles.list}>
              <FlatList
                data={roomData}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                  <RoomController
                    roomData={item}
                    reservationData={reservationData}
                    userid={userDATA._id}
                  />
                )}
              />
            </View>
          </>
        ) : (
          <>
            <View style={styles.choicesContainer}>
              <FlatList
                data={floors}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setSelectedFloor(item)}>
                    <Text style={[styles.choicesText, selectedFloor === item &&
                      { color: "#ffffff", backgroundColor: '#2260FF' },]}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
            <Text style={styles.title}>- Rentable Desk -</Text>
            <View style={[styles.listDesk, userDATA.role === 'Worker' && { height: 590 }]}>
              <FlatList
                data={allDesks.filter(a => a.floor === selectedFloor)}
                numColumns={2}
                keyExtractor={item => item._id}
                key={selectedCategory}
                columnWrapperStyle={{ justifyContent: 'space-evenly', alignItems: 'center' }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {

                  date.setHours(0, 0, 0, 0);
                  const editedDate = date.toISOString();
                  let filterData = allDesksReservation.filter(item => item.date === editedDate) || [];
                  filterData = filterData.map(reservation => reservation.deskid);
                  const isThere = filterData.includes(item._id)

                  return (<DeskController
                    item={item} date={date} setShowPicker={setShowPicker} userid={userDATA._id} isThere={isThere} />)
                }}
              />
              {showPicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                onChange={(event, selectedDate) => onChange(event, selectedDate, reservationData)}
                locale="tr-TR"
              />
            )}
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginVertical: (Platform.OS === 'ios' ? 0 : 30),
  },
  choicesContainer: {
    height: 50,
    width: 320,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'

  },
  meetingsContainer: {
    height: 700,
    width: 340,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderRadius: 25,
    borderColor: '#2260ff',
    borderWidth: 2,
  },
  title: {
    color: '#2260ff',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  list: {
    height: 585,
    width: '95%',
    alignItems: 'center',
  },
  listDesk: {
    height: 525,
    width: '95%',
    alignItems: 'center',
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
  },
  line: {
    height: 1,
    backgroundColor: '#888',
    marginHorizontal: 20,
    marginTop: 10,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#CAD6FF',
  },


});
