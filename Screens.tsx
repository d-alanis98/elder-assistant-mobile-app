import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
//Components
import Login from './src/UserAuthentication/components/Login/Login';
import Register from './src/UserAuthentication/components/Register/Register';
import Navigation from './src/Shared/components/Navigation/components/Navigation';
import HomeScreen from './src/User/components/HomeScreen/HomeScreen';
import ChatScreen from './src/Chat/components/ChatScreen/ChatScreen';
import SettingsScreen from './src/User/components/SettingsScreen/SettingsScreen';
import IoTDeviceScreen from './src/IoTDevice/components/IoTDeviceScreen/IoTDeviceScreen';
//Hooks
import { useAppSelector } from './src/Shared/store/hooks';



const { Screen, Navigator } = createBottomTabNavigator();

const Screens: React.FC = () => {

    const {
        user: { loggedIn }, 
        theme: { theme } 
    } = useAppSelector(state => state);

    return (
        <Navigator 
            tabBar = { (props) => <Navigation navigation = { props.navigation }/> }
            tabBarOptions = {{ style: styles.navigationContainer }}
            initialRouteName = { loggedIn ? 'Home' : 'Login' }
            sceneContainerStyle = {{
                backgroundColor: theme.backgroundColor
            }}
        >
            {
                loggedIn
                    ? <>
                        <Screen 
                            name = 'Home'
                            component = { HomeScreen }
                        />
                        <Screen 
                            name = 'Settings'
                            component = { SettingsScreen }
                        />
                        <Screen 
                            name = 'Chat'
                            component = { ChatScreen }
                        />
                        <Screen 
                            name = 'Devices'
                            component = { IoTDeviceScreen }
                        />
                    </>
                    : <>
                        <Screen 
                            name = 'Login'
                            component = { Login }
                        />
                        <Screen 
                            name = 'Register'
                            component = { Register }
                        />
                    </>
            }
        </Navigator>
    );
}

export default Screens;


//Styles
const styles = StyleSheet.create({
    navigationContainer: {
        padding: 0,
        margin: 0,
    }
})