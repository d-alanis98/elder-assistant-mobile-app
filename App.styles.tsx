import { Dimensions, StatusBar } from 'react-native';
import Constants from 'expo-constants'
//Dimensions
export const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
//Real height of the app content
const appRootHeight = screenHeight - (StatusBar.currentHeight || 24);

//Styles
const styles = {
    container: {
        margin: 0,
        height: appRootHeight,
        marginTop: Constants.statusBarHeight

    },
    scrollContainer: {
        flexGrow: 1,
        padding: 9,
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
    }
};

export default styles;