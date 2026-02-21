import { View } from "react-native";
import { useSelector } from "react-redux";
import Ionicons from '@expo/vector-icons/Ionicons';


import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import MeetingsController from "./app/meetingsPage/MeetingsController";
import RoomsController from "./app/roomsPage/RoomsController";
import OpeningController from "./app/openingPage/OpeningController";
import LogInController from "./app/logInPage/LogInController";
import SingUpController from "./app/singUpPage/SingUpController";
import SettingsController from "./app/settingPage/SettingsController";
import AudiencePage from "./app/audiencePage/AudienceController";
import UserSettingsController from "./app/userSettingsPage/UserSettingsController";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



function AppStack() {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='OpeningController' component={OpeningController} />
      <Stack.Screen name='LogInController' component={LogInController} />
      <Stack.Screen name='SingUpController' component={SingUpController} />
    </Stack.Navigator>
  )

}

function MeetingsStack() {
  // update meetings yani audience ekleme sayfası geelecekk
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='MeetingsController' component={MeetingsController} />
      <Stack.Screen name='AudiencePage' component={AudiencePage} />
    </Stack.Navigator>
  )

}

function MainTabNavigator() {

  const role = useSelector(state => state.user.DATA.role);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === 'RoomsController') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'MeetingsStack') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'SettingsController') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'UserSettingsController') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return (
            <View
              style={{
                height: 50,
                width: 50,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Ionicons name={iconName} size={26} color={color} />
            </View>
          );
        },
        tabBarActiveTintColor: '#f8eee5ff',
        tabBarInactiveTintColor: 'white',
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#2260FF',
          height: 70,
          borderRadius: 40,
          position: 'absolute',
          marginHorizontal: 20,
          marginBottom: 20,
          justifyContent: 'center',
          alignItems: 'center',
        },
      })}
    >
      <Tab.Screen name="RoomsController" component={RoomsController} />
      <Tab.Screen name="MeetingsStack" component={MeetingsStack} />
      <Tab.Screen name="UserSettingsController" component={UserSettingsController} />
      {role === 'Admin' &&
        <Tab.Screen name="SettingsController" component={SettingsController} />}

    </Tab.Navigator>
  );
}


export default function RootNavigation() {

  const isLogin = useSelector(state => state.user.isLogin);

  return (
    <NavigationContainer>
      {isLogin ? <MainTabNavigator /> : <AppStack />}
    </NavigationContainer>
  );
}

