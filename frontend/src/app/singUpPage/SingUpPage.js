import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native'


const SingUpPage = ({
    mail, setMail, username, setUsername, password, setPassword, singUp, choices,
    selectedCategory, setSelectedCategory }) => {


    return (
        <View style={styles.container}>
            <Text style={styles.title}>SING UP</Text>
            <View style={{ marginTop: 190 }}>
                <TextInput
                    style={styles.inputUserName}
                    placeholder={'  Username :'}
                    value={username}
                    fontSize={18}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.inputUserName}
                    placeholder={'  Mail :'}
                    value={mail}
                    fontSize={18}
                    onChangeText={setMail}
                />
                <TextInput
                    style={styles.inputUserName}
                    placeholder={'  Password :'}
                    value={password}
                    fontSize={18}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
                <View style={styles.choicesContainer}>
                    <FlatList
                        data={choices}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity activeOpacity={0.8} onPress={() => setSelectedCategory(item)}>
                                <View style={{ flexDirection: 'row', alignItems:'center', marginHorizontal:10, }}>
                                    <Text style={styles.choicesText} >{item}</Text>
                                    <View style={[styles.select, selectedCategory === item &&
                                        { backgroundColor: '#3c9651ff' },]} />
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={singUp}>
                <Text style={styles.singUpTxt}>Sing Up!</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SingUpPage

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
    inputContainer: {
        marginVertical: 50,
        alignItems: 'center'
    },
    inputUserName: {
        width: 300,
        height: 50,
        marginVertical:10,
        borderBottomWidth: 2,
        borderRadius: 15,
        borderColor: '#a8a8a8ff',
    },
    inputText: {
        fontSize: 18,
        fontWeight: '414',
        color: '#000000',
        marginTop: 15,

    },
    button: {
        width: 207,
        height: 45,
        backgroundColor: '#2260FF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        marginTop: 20,
    },
    singUpTxt: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 18,
    },
    choicesContainer: {
        height: 50,
        width: 320,
        marginTop: 10,
        alignItems:'center',
        justifyContent:'center',
    },
    choicesText: {
        fontWeight: '400',
        backgroundColor: '#fff',
        fontSize: 18,
        color: '#000000',
        textAlign: 'center',

    },
    select: {
        height: 18,
        width: 18,
        borderRadius: 15,
        borderWidth: 1,
        marginLeft:5,
    },
})