import { StyleSheet, Text, View, FlatList, Platform, SafeAreaView, TouchableOpacity } from 'react-native'
import CreatedRoomController from '../../comp/CreatedRoom/CreatedRoomController';
import { useSelector } from 'react-redux'
import DeskReservationController from '../../comp/DeskReservation/DeskReservationController';

const MeetingsPage = ({
  updatePageNavigate,
  choices,
  selectedCategory,
  setSelectedCategory }) => {

  const userReservations = useSelector(state => state.reservation.userReservation) || [];
  const userDeskReservations = useSelector(state => state.reservationdesks.reservationUser) || [];
  const userReservationsAudience = useSelector(state => state.reservation.userReservationAudience) || [];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.meetingsContainer}>
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
        <Text style={styles.meetingText}>{selectedCategory === 'Meeting Rooms' ? '-Your Meetings-' : '-Your Desks-'}</Text>
        <View style={styles.list}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={selectedCategory === 'Meeting Rooms' ? [...userReservations,...userReservationsAudience] : userDeskReservations}
            renderItem={({ item }) => {
              return (
                selectedCategory === 'Meeting Rooms' ?
                  (
                    <CreatedRoomController reservation={item} updatePageNavigate={updatePageNavigate} />
                  ) : (
                    <DeskReservationController reservation={item} />
                  )
              )
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default MeetingsPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginVertical: (Platform.OS === 'ios' ? 0 : 30)

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
  meetingText: {
    color: '#2260ff',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 5,
  },
  list: {
    marginTop: 5,
    height: 580,
    width: 300,
  },
  line: {
    height: 2,
    backgroundColor: '#888',
    marginHorizontal: 20,
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center'
  },
  usersText: {
    color: '#2260ff',
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 5,
  },
  usersButton: {
    width: 95,
    height: 30,
    backgroundColor: '#ffffff',
    borderColor: '#2260ff',
    borderWidth: 2,
    marginVertical: 3,
    marginHorizontal: 3,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  choicesContainer: {
    height: 50,
    width: 320,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'

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

})