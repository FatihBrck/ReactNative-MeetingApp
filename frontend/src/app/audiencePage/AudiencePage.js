import { StyleSheet, Text, View, FlatList, Platform, SafeAreaView, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux';


const UpdateReservationPage = ({ item, selectedCategories, toggleCategory, updateAudience }) => {

  
  const userdata = useSelector(state => state.user.DATA)
  const allUsers = useSelector(state => state.user.users)
  const allUsr = allUsers.filter((a)=> a.userName !== item.userName)
  const dt = new Date(item.date);
  const dateKey = dt.toLocaleDateString('tr-TR').split('T')[0];
  const isOwner = userdata.userName === item.userName ? false : true;

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.meetingsContainer}>
        <Text style={[styles.title, { marginTop: 20, }]} >{item.roomName}</Text>
        <Text style={styles.title} >{dateKey}</Text>
        <Text style={styles.title} >{item.hours.length > 1 ? item.hours[0] + '-' + item.hours[item.hours.length - 1] : item.hours[0]}</Text>
        <View style={styles.line} />
        <Text style={styles.usersText}>-Users- </Text>
        <View style={styles.list}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={allUsr}
            numColumns={3}
            renderItem={({ item }) => (
              <TouchableOpacity
                disabled={isOwner}
                onPress={() => toggleCategory(item._id)}
                style={[
                  styles.usersButton,
                  selectedCategories.includes(item._id) && {
                    backgroundColor: '#2260ff',
                  },
                ]}
              >
                <Text style={{ color: selectedCategories.includes(item._id) ? '#fff' : '#000' }}>
                  {item.userName}
                </Text>
              </TouchableOpacity>

            )}
          />
        </View>

        {userdata.userName === item.userName &&
          <>
            <View style={styles.line} />
            <TouchableOpacity style={styles.usersButton} onPress={updateAudience} >
              <Text style={styles.usersText}>Save</Text>
            </TouchableOpacity>
          </>
        }

      </View>



    </SafeAreaView>
  )
}

export default UpdateReservationPage

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
    borderWidth: 4,

  },
  title: {
    color: '#2260ff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  meetingText: {
    color: '#2260ff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  list: {
    height: 460,
    width: 300,
  },
  line: {
    height: 2,
    backgroundColor: '#eaeaeaff',
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
    height: 40,
    backgroundColor: '#ffffff',
    borderColor: '#2260ff',
    borderWidth: 2,
    marginVertical: 3,
    marginHorizontal: 3,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

})