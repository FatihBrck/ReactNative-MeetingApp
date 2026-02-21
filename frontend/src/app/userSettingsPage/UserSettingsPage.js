import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import { useSelector } from 'react-redux'


const UserSettingsPage = ({ exit, }) => {

      const userName = useSelector(state => state.user.DATA.userName) || 0

    return (
        <SafeAreaView style={styles.container} >
            <Image source={require("../../../assets/zzzz.png")}  style={styles.image} />
            <Text style={styles.title} >{userName}</Text>
            <View style={styles.buttonLine}>
                <TouchableOpacity style={styles.registerButton} onPress={exit} >
                    <Text style={styles.singUpTxt}>Update</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonLine}>
                <TouchableOpacity style={styles.registerButton} onPress={exit} >
                    <Text style={styles.singUpTxt}>Delete</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonLine}>
                <TouchableOpacity style={styles.registerButton} onPress={exit} >
                    <Text style={styles.singUpTxt}>Exit</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default UserSettingsPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    image:{
        width:250,
        height:250,
        borderRadius:150,
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
    buttonLine: {
        width: 260,
        height: 65,
        borderRadius: 35,
        borderWidth: 3,
        marginVertical: 10,
        borderColor: '#2260FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    title:{
        fontSize:23,
        fontWeight:'500',
        marginBottom:20,
        marginTop:10,
    }
})