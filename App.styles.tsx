import { StyleSheet, Dimensions } from 'react-native';
//External dimensions
import { NAVIGATION_BAR_HEIGHT } from './src/Shared/components/Navigation/components/Navigation.styles';

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    scrollContainer: {
        height: Dimensions.get('window').height - NAVIGATION_BAR_HEIGHT,
        padding: '0.5rem',
    },
    text: {
        fontSize: 20,
        textAlign: 'center'
    }
});

export default styles;