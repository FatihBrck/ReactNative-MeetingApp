import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'


const OpeningPage = ({login, singup}) => {
    
    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/logo.png')} style={styles.logo} />
            <TouchableOpacity style={styles.logInButton} onPress={login} >
                <Text style={styles.logInTxt}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signUpButton} onPress={singup} >
                <Text style={styles.singUpnTxt}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    )
}

export default OpeningPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 400,
        height: 400,
    },
    logInButton: {
        height: 58,
        width: 215,
        marginVertical: 10,
        backgroundColor: '#2260FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    signUpButton: {
        height: 58,
        width: 215,
        backgroundColor: '#CAD6FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    logInTxt: {
        color:'#ffffff',
        fontSize:22,
        fontWeight:'bold',
    },
    singUpnTxt: {
        color:'#2260FF',
        fontSize:22,
        fontWeight:'bold',
    },
})