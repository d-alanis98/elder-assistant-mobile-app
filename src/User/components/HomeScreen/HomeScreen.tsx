import React from 'react';
import { View, Text } from 'react-native';
//Components
import ScreenContainer from '../../../Shared/components/Screens/ScreenContainer';



const HomeScreen: React.FC = () => {

    return (
        <ScreenContainer>
            <View
                style={{paddingBottom: '5rem'}}
            >
            {
                Array.from(new Array(70)).map((_, index) => (
                    <Text key={index}>{index}. Hi</Text>
                ))
            }
            </View>
            
        </ScreenContainer>
    );
}

export default HomeScreen;