import { StyleSheet, Dimensions } from 'react-native';
//External dimensions
import { NAVIGATION_BAR_HEIGHT } from './src/Shared/components/Navigation/components/Navigation.styles';

//Dimensions
export const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

//Styles
const styles = {
    container: {
        margin: 0,
        height: screenHeight,
    },
    scrollContainer: {
        height: screenHeight - NAVIGATION_BAR_HEIGHT ,
        padding: 9,
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
    }
};

export default styles;