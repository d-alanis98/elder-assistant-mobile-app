import React from 'react';
//Components
import ScreenContainer from '../../../Shared/components/Screens/ScreenContainer';
import PrimaryUserScreen from './PrimaryUser/PrimaryUserScreen';
import PrimaryUserProtected from '../../../Shared/components/Screens/PrimaryUserProtected';
import SecondaryUserProtected from '../../../Shared/components/Screens/SecondaryUserProtected';
import SecondaryUserScreen from './SecondaryUser/SecondaryUserScreen';
import useWebSocketMessage from '../../../Shared/utils/WebSockets/hooks/useWebSocketMessage';
import useDeviceData from '../../../Shared/store/hooks/deviceData/useDeviceData';

const HomeScreen: React.FC = () => {
    /**
     * Hooks
     */
    const { updateLastDeviceData } = useDeviceData();
    //Web sockets message, to update the last device data record
    useWebSocketMessage((deviceData) => {
        updateLastDeviceData(deviceData);
    }, 'IoTDeviceData');
    return (
        <ScreenContainer
            title = 'Mi actividad'
        >
            <PrimaryUserProtected>
                <PrimaryUserScreen />
            </PrimaryUserProtected>
            <SecondaryUserProtected>
                <SecondaryUserScreen />
            </SecondaryUserProtected>
        </ScreenContainer>
    );
}

export default HomeScreen;