import { Dimensions } from 'react-native';
//Dimensions
export const { width: screenWidth, height: screenHeight } = Dimensions.get('window');


//Styles
const styles = {
    container: {
        margin: 0,
        flex: 1,
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