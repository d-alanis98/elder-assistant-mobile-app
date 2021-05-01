import React from 'react';
import { useFocusEffect } from '@react-navigation/core';
//Components
import ScreenContainer from '../../../Shared/components/Screens/ScreenContainer';



const HomeScreen: React.FC = () => {
    /**
     * Hooks
     */
    //Focus effect (similar to useEffect(..., [])), executes the logic when the screen is focused
    useFocusEffect(() => {

    });

    return (
        <ScreenContainer
            title = 'Inicio'
        >
            
        </ScreenContainer>
    );
}

export default HomeScreen;