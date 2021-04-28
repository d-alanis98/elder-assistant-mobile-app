import React from 'react';
import { View, Text } from 'react-native';
//Components
import ScreenContainer from '../../../Shared/components/Screens/ScreenContainer';



const HomeScreen: React.FC = () => {

    return (
        <ScreenContainer>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Text>Home</Text>
            </View>
            
        </ScreenContainer>
    );
}

export default HomeScreen;