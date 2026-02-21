import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Platform } from 'react-native';
import Collapsible from 'react-native-collapsible';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { use } from 'react';

export default function Room({
  roomData,
  clocks,
  selectedTimes,
  isVisible,
  date,
  showPicker,
  setShowPicker,
  toggleVisibility,
  onChange,
  handleClockPress,
  startTime,
  addReservation,
  userid,
  reservationData,
}) {

  return (
    <View style={styles.aa}>
      <View style={styles.container}>
        <Image source={require('../../../assets/aaaa.png')} style={styles.image} />
        <View style={styles.buttonContainer}>
          <Text style={styles.title}>{roomData.name}</Text>
          <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={toggleVisibility}>
            <Text style={styles.buttonTxt}>Select</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Collapsible collapsed={!isVisible}>
        <View style={styles.collapsibleContainer}>
          <View style={styles.calendar}>
            <TouchableOpacity activeOpacity={0.8} style={styles.Icon} onPress={() => setShowPicker(true)}>
              <Ionicons name='calendar' size={20} color={'#fff'} />
            </TouchableOpacity>
            <Text>Date: {date ? date.toLocaleDateString('tr-TR') : 'No date selected'}</Text>
          </View>

          <View style={styles.line} />

          <FlatList
            data={clocks}
            keyExtractor={(item) => item}
            numColumns={4}
            renderItem={({ item }) => {
              const formattedDate = date.toLocaleDateString('tr-TR');
              const roomReservations = reservationData[roomData._id] || {};
              const timesForDate = roomReservations[formattedDate] || [];
              const isReserved = timesForDate.includes(item);
              const isSelected = selectedTimes.includes(item);

              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => !isReserved && handleClockPress(item)}
                  disabled={isReserved}
                >
                  <Text
                    style={[
                      styles.clockItem,
                      isSelected && { backgroundColor: '#2260ff', color: '#fff' },
                      isReserved && { backgroundColor: '#d3d3d3', color: '#888' }, // stil: rezerve edilmiş saat
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />


          <View style={styles.line} />

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button} disabled={startTime === ''}
            onPress={() => addReservation(userid)}>
            <Text style={styles.buttonTxt}>Booking</Text>
          </TouchableOpacity>
        </View>
      </Collapsible>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
          onChange={(event, selectedDate) => onChange(event, selectedDate)}
          locale="tr-TR"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderWidth:1,
    borderColor:'#CAD6FF',
    width: 300,
    height: 131,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5
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
    borderWidth:2,
    borderColor:'#CAD6FF',
  },
  buttonContainer: {

    height: 100,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#ffffff',
    borderWidth:2,
    borderColor:'#2260ff',
    width: 150,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',

  },
  buttonTxt: {
    color: '#2260ff',
    fontSize: 20,
  },
  collapsibleContainer: {
    width: 300,
    height: 300,
    borderRadius: 20,
    backgroundColor: '#c5c0f8',
    alignItems: 'center'
  },
  calendar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,

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
    marginHorizontal: 5,
  },
  line: {
    height: 1,
    backgroundColor: '#888',
    marginHorizontal: 20,
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center'
  },
  clockItem: {
    width: 55,
    height: 25,
    backgroundColor: '#ffffffff',
    borderRadius: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginVertical: 5,
    marginHorizontal: 5,
  },
});
