import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'



const LogInPage = ({ email, setEmail, password, setPassword, logIn }) => {

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex:1,}}>
            <View style={styles.container}>
                <Text style={styles.title}>LOG IN</Text>
                <View style={{ marginTop: 190 }}>
                    <TextInput
                        style={styles.inputUserName}
                        placeholder={'UserName :'}
                        value={String}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={styles.inputUserName}
                        placeholder={'Password :'}
                        value={String}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />
                </View>
                <TouchableOpacity style={styles.registerButton} onPress={logIn} >
                    <Text style={styles.singUpTxt}>Log In</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LogInPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    title: {
        marginVertical: 50,
        color: '#2260FF',
        fontSize: 26,
        fontWeight: 'bold'
    },
    inputUserName: {
        width: 300,
        height: 50,
        marginVertical: 10,
        borderBottomWidth: 2,
        borderRadius: 15,
        borderColor: '#a8a8a8ff',
    },
    registerButton: {
        width: 207,
        height: 45,
        backgroundColor: '#2260FF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        marginTop: 20,
    },
    inputTxt: {
        fontSize: 18,
        fontWeight: '414',
        color: '#000000'
    },
    singUpTxt: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 16,
    },
})