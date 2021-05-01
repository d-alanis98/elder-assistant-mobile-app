import React, { useState } from 'react';
import { View } from 'react-native';
//Components
import DevicesList from '../DevicesList/DevicesList';
import ScreenContainer from '../../../Shared/components/Screens/ScreenContainer';
//Styled components
import { LinkDeviceButton } from '../DevicesList/DevicesList.styles';


const IoTDeviceScreen: React.FC = () => {
    const [showLinkModal, setShowLinkModal] = useState(false);

    return (
        <ScreenContainer
            title = 'Dispositivos'
        >
            <IoTScreenContainer>
                <LinkDeviceButton 
                    icon = 'qrcode'
                    onPress = { () => setShowLinkModal(true) }
                    buttonText = 'Vincular dispositivo'
                />
                <DevicesList />

            </IoTScreenContainer>
        </ScreenContainer>
    );
}
export default IoTDeviceScreen;

//Internal components
const IoTScreenContainer: React.FC = ({ children }) => (
    <View
        style={{  height: '100%' }}
    >
        { children }
    </View>
); 