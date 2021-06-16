import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
//Components
import Screens from './Screens';
import StatusBar from './src/Shared/components/StatusBar/StatusBar';
//Store
import store from './src/Shared/store/store';
import { useAppDispatch, useAppSelector } from './src/Shared/store/hooks';
//Event handlers
import OnUpdatedAuthToken from './src/UserAuthentication/domain/event-handlers/OnUpdatedAuthToken';
//Error handlers
import RequestErrorHandler from './src/Shared/infrastructure/Errors/RequestErrorHandler';
//Theme
import { ThemeProvider } from 'styled-components/native';
//Services
import AxiosRequest from './src/Shared/infrastructure/Requests/AxiosRequest';
//Styles
import styles from './App.styles';
import usePushNotifications from './src/Shared/hooks/usePushNotifications';
import configuration from './configuration';
import useRegisterServices from './src/Shared/hooks/useRegisterServices';

const App: React.FC = () => {
    //HOOKS
    //Custom hooks
    //State selector
    const { token, loggedIn, refreshToken } = useAppSelector(state => state.user);
    //Actions dispatcher
    const dispatch = useAppDispatch();
    //Effects
    /**
     * On mount, we want to register our services
     */
    useEffect(() => {
        //We set some properties
        AxiosRequest.token = token;
        AxiosRequest.loggedIn = loggedIn;
        AxiosRequest.baseURL = configuration.SERVER_URL;
        AxiosRequest.refreshToken = refreshToken;
        AxiosRequest.onRequestError = new RequestErrorHandler(dispatch).handle;
        AxiosRequest.onNewAuthToken = new OnUpdatedAuthToken(dispatch).handle;
        //We set the axios instance (to set the interceptors)
        AxiosRequest.setInstance();
        
    }, [token, loggedIn, refreshToken]);
    //Custom hooks
    usePushNotifications();
    useRegisterServices();
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
                <StatusBar 
                    theme = { themeToApply }
                />
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


