import React from 'react';
import { Provider } from 'react-redux';
import { Text, View, ScrollView } from 'react-native';
//Components
import Navigation from './src/Shared/components/Navigation/components/Navigation';
//Store
import store from './src/Shared/store/store';
import { useAppSelector } from './src/Shared/store/hooks';
//Theme
import { ThemeProvider } from 'styled-components/native';
//Styles
import styles from './App.styles';


const App: React.FC = () => {
    //HOOKS
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
                <ScrollView 
                    contentContainerStyle = { styles.scrollContainer }
                >
                    <Text style={styles.text}>Elder assistant App!</Text>
                </ScrollView>
                <Navigation />
            </View>
        </ThemeProvider>
    );
}

//We wrap the app in the state provider, to guarantee that the provider is the first component in the tree.
const AppWithStateProvider = () => <Provider store = { store }><App /></Provider>; 
export default AppWithStateProvider;


