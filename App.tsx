import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
//Components
import Header from './src/Shared/components/Header/Header';
import Screens from './Screens';
//Store
import store from './src/Shared/store/store';
import { useAppSelector } from './src/Shared/store/hooks';
//Theme
import { ThemeProvider } from 'styled-components/native';
//Styles
import styles from './App.styles';
import AxiosRequest from './src/Shared/infrastructure/Requests/AxiosRequest';

const App: React.FC = () => {
    //HOOKS
    //Custom hooks
    //State selector
    const { token, loggedIn } = useAppSelector(state => state.user);
    //Effects
    /**
     * On mount, we want to register our services
     */
    useEffect(() => {
        //We set the axios custom requets instance
        AxiosRequest.token = token;
        AxiosRequest.loggedIn = loggedIn;
        AxiosRequest.setInstance();
        
    }, [token, loggedIn]);
    //Custom hooks
    //Store, to get the redux state
    const { theme: themeToApply } = useAppSelector(state => state.theme);
    //Render
    return (
        <ThemeProvider
            theme = { themeToApply }
        >
            <View 
                style = { styles.container }
            >    
                <Header />
                <Screens />
            </View>
        </ThemeProvider>
    );
}

//We wrap the app in the state provider
const AppWithStateProvider = () => <Provider store = { store }><App /></Provider>; 
//We wrap the app in the navigation provider
const AppWithNavigationProvider = () => (
    <NavigationContainer>
        <AppWithStateProvider />
    </NavigationContainer>
);
export default AppWithNavigationProvider;


