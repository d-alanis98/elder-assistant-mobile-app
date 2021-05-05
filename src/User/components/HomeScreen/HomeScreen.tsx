import React from 'react';
import { useFocusEffect } from '@react-navigation/core';
//Components
import ScreenContainer from '../../../Shared/components/Screens/ScreenContainer';
import PrimaryUserScreen from './PrimaryUser/PrimaryUserScreen';
import PrimaryUserProtected from '../../../Shared/components/Screens/PrimaryUserProtected';


const HomeScreen: React.FC = () => {
    /**
     * Hooks
     */
    //Focus effect (similar to useEffect(..., [])), executes the logic when the screen is focused
    useFocusEffect(() => {

    });

    return (
        <ScreenContainer>
            <PrimaryUserProtected>
                <PrimaryUserScreen />
            </PrimaryUserProtected>
        </ScreenContainer>
    );
}

export default HomeScreen;