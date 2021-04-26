import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
//Components
import Navigation from './src/Shared/components/Navigation/components/Navigation';
import HomeScreen from './src/User/components/HomeScreen/HomeScreen';
import SettingsScreen from './src/User/components/Settings/SettingsScreen';
import { useAppSelector } from './src/Shared/store/hooks';
import Login from './src/UserAuthentication/components/Login/Login';

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
            initialRouteName = { loggedIn ? 'Home' : 'LogIn' }
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
                    </>
                    : <Screen 
                        name = 'LogIn'
                        component = { Login }
                    />
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