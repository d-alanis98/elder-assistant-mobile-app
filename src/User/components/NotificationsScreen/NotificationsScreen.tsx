import React from 'react';
import { View } from 'react-native';
//Components
import ScreenContainer from '../../../Shared/components/Screens/ScreenContainer';



const NotificationsScreen: React.FC = () => {
    /**
     * Hooks
     */
    return (
        <ScreenContainer
            title = 'Notificaciones'
            animated
        >
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >

            </View>

        </ScreenContainer>
    );
}

export default NotificationsScreen;